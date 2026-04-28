import sys
import os
import sqlite3
import hashlib
import datetime
import jwt
import base64
import json
import random
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps

# --- OPTIONAL DEPENDENCIES SETUP ---
try:
    import pyotp
    PYOTP_AVAILABLE = True
except ImportError:
    print("CRITICAL: 'pyotp' library not found.")
    PYOTP_AVAILABLE = False

try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False

# Set your API Key here
GEMINI_API_KEY = 'AIzaSyAgoDMucq2JpOyGZBLAI2bLJRphIKieRns' 
if GENAI_AVAILABLE and GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app) 

app.config['SECRET_KEY'] = 'tulas_connect_secure_key_2026'
DB_NAME = 'tulas.db'

# In-memory storage for verified reset sessions
reset_tokens = {}

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Auth Decorator for Admin
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            actual_token = token.split(" ")[1] if " " in token else token
            data = jwt.decode(actual_token, app.config['SECRET_KEY'], algorithms=["HS256"])
            if data.get('role') != 'admin':
                return jsonify({"error": "Admin access required"}), 403
        except:
            return jsonify({"error": "Token is invalid"}), 401
        return f(*args, **kwargs)
    return decorated

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_type TEXT NOT NULL,
        entity TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        email TEXT,
        mobile TEXT,
        department TEXT,
        course TEXT,
        profile_image BLOB,
        totp_secret TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Security Lockout Upgrades (Safely ignore if columns already exist)
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN failed_attempts INTEGER DEFAULT 0")
    except sqlite3.OperationalError:
        pass 
        
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN lockout_until TEXT")
    except sqlite3.OperationalError:
        pass

    # Signup Requests Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS signup_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status TEXT DEFAULT 'Pending',
            view_count INTEGER DEFAULT 0,
            rejection_reason TEXT,
            user_type TEXT NOT NULL,
            entity TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT,
            email TEXT,
            mobile TEXT,
            department TEXT,
            course TEXT,
            profile_image BLOB,
            totp_secret TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- API ROUTES ---

@app.route('/api/forgot/verify-identity', methods=['POST'])
def forgot_verify_identity():
    data = request.get_json()
    id_num = data.get('idNumber')
    email = data.get('email')
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ? AND email = ?", (id_num, email)).fetchone()
    conn.close()
    if user:
        return jsonify({"success": True, "message": "Identity verified. Please provide Authenticator code."})
    return jsonify({"error": "Invalid User ID or Email. No account found."}), 404

@app.route('/api/forgot/verify-totp', methods=['POST'])
def forgot_verify_totp():
    if not PYOTP_AVAILABLE: return jsonify({"error": "pyotp missing"}), 500
    data = request.get_json()
    id_num = data.get('idNumber')
    totp_code = data.get('totpCode')
    
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ?", (id_num,)).fetchone()
    conn.close()
    
    if not user or not user['totp_secret']:
        return jsonify({"error": "User not found or Authenticator not configured for this account."}), 404
        
    totp = pyotp.TOTP(user['totp_secret'])
    if totp.verify(totp_code):
        reset_token = str(uuid.uuid4())
        reset_tokens[id_num] = reset_token
        return jsonify({"success": True, "resetToken": reset_token})
    return jsonify({"error": "Invalid Authenticator Code"}), 400

@app.route('/api/forgot/reset', methods=['POST'])
def forgot_reset():
    data = request.get_json()
    id_num = data.get('idNumber')
    new_password = data.get('newPassword')
    reset_token = data.get('resetToken')
    
    if reset_tokens.get(id_num) != reset_token:
        return jsonify({"error": "Invalid or expired reset token"}), 403
        
    hashed_pw = hash_password(new_password)
    conn = get_db_connection()
    conn.execute("UPDATE users SET password = ? WHERE username = ?", (hashed_pw, id_num))
    
    # Also unlock the account upon successful password reset
    conn.execute("UPDATE users SET failed_attempts = 0, lockout_until = NULL WHERE username = ?", (id_num,))
    
    conn.commit()
    conn.close()
    
    if id_num in reset_tokens:
        del reset_tokens[id_num]
        
    return jsonify({"success": True, "message": "Password reset successfully"})

@app.route('/api/generate-totp', methods=['POST'])
def generate_totp():
    if not PYOTP_AVAILABLE: return jsonify({"error": "pyotp missing"}), 500
    data = request.get_json()
    secret = pyotp.random_base32()
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=data.get('email', 'user@tulas.edu.in'), issuer_name="TulasConnect")
    return jsonify({"success": True, "secret": secret, "uri": uri})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.form
    file = request.files.get('profileImage')
    img_blob = file.read() if file else None
    
    # --- TOTP VERIFICATION LOGIC ---
    if PYOTP_AVAILABLE:
        totp_secret = data.get('totpSecret')
        totp_code = data.get('totpCode')
        
        if not totp_secret or not totp_code:
            return jsonify({"success": False, "error": "Missing Authenticator details"}), 400
            
        totp = pyotp.TOTP(totp_secret)
        if not totp.verify(totp_code):
            return jsonify({"success": False, "error": "Invalid Authenticator Code"}), 400
    
    conn = get_db_connection()
    if conn.execute("SELECT id FROM users WHERE username = ?", (data.get('idNumber'),)).fetchone():
        conn.close()
        return jsonify({"error": "User ID already exists in the system"}), 409

    conn.execute('''INSERT INTO signup_requests (
        user_type, entity, username, password, full_name, email, mobile, department, course, profile_image, totp_secret
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?)''', 
    (data.get('role'), data.get('entity'), data.get('idNumber'), hash_password(data.get('password')), 
     data.get('fullName'), data.get('email'), data.get('mobile'), data.get('department'), data.get('course'), img_blob, data.get('totpSecret')))
    
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Signup request submitted for Admin approval."})

@app.route('/api/setup-login-totp', methods=['POST'])
def setup_login_totp():
    if not PYOTP_AVAILABLE: 
        return jsonify({"error": "pyotp missing on server"}), 500
        
    data = request.get_json()
    username = data.get('username')
    totp_secret = data.get('totpSecret')
    totp_code = data.get('totpCode')
    
    if not totp_secret or not totp_code:
        return jsonify({"success": False, "error": "Missing Authenticator details"}), 400
        
    totp = pyotp.TOTP(totp_secret)
    if not totp.verify(totp_code):
        return jsonify({"success": False, "error": "Invalid Authenticator Code"}), 400
        
    conn = get_db_connection()
    conn.execute("UPDATE users SET totp_secret = ? WHERE username = ?", (totp_secret, username))
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "Authenticator linked successfully! Please log in."})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    entity = data.get('entity')
    
    hashed_pw = hash_password(password)
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND entity = ?', (username, entity)).fetchone()
    
    if not user:
        conn.close()
        return jsonify({"success": False, "error": "Invalid username or password"}), 401

    user_dict = dict(user)
    now = datetime.datetime.now(datetime.timezone.utc)
    failed_attempts = user_dict.get('failed_attempts') or 0
    lockout_until = user_dict.get('lockout_until')

    # --- 1. SECURITY LOCKOUT CHECK ---
    if lockout_until:
        try:
            lockout_time = datetime.datetime.fromisoformat(lockout_until)
            if now < lockout_time:
                conn.close()
                if failed_attempts >= 5:
                    return jsonify({"success": False, "error": "Account permanently locked due to multiple failed attempts. Please contact Admin."}), 403
                else:
                    minutes_left = int((lockout_time - now).total_seconds() / 60) + 1
                    return jsonify({"success": False, "error": f"Account temporarily locked. Please try again in {minutes_left} minute(s)."}), 403
        except Exception:
            pass # Ignore invalid timestamp parse errors

    # --- 2. PASSWORD VERIFICATION ---
    if user_dict['password'] == hashed_pw:
        # Success! Reset failed attempts back to 0
        conn.execute('UPDATE users SET failed_attempts = 0, lockout_until = NULL WHERE username = ?', (username,))
        conn.commit()
        
        totp_secret = user_dict.get('totp_secret')

        # Force TOTP Setup if missing
        if not totp_secret and user['user_type'] != 'admin' and PYOTP_AVAILABLE:
            secret = pyotp.random_base32()
            email_to_use = user['email'] if user['email'] else f"{username}@tulas.edu.in"
            uri = pyotp.totp.TOTP(secret).provisioning_uri(name=email_to_use, issuer_name="TulasConnect")
            conn.close()
            return jsonify({
                "success": True, 
                "requires_totp_setup": True,
                "username": username,
                "entity": entity,
                "secret": secret,
                "uri": uri
            })

        # Trigger TOTP 2FA if configured
        if totp_secret and PYOTP_AVAILABLE:
            conn.close()
            return jsonify({
                "success": True, 
                "requires_totp": True,
                "username": username,
                "entity": entity
            })
            
        # Fallback directly to token issue if no TOTP secret is found (Admins)
        token = jwt.encode({
            'user': username, 
            'role': user['user_type'], 
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        img_str = None
        if user['profile_image']:
            img_str = f"data:image/jpeg;base64,{base64.b64encode(user['profile_image']).decode()}"
        
        conn.close()
        return jsonify({
            "success": True, 
            "token": token,
            "user": {
                "name": user['full_name'], 
                "role": user['user_type'], 
                "profileImage": img_str, 
                "username": user['username'], 
                "entity": entity, 
                "department": user['department'], 
                "course": user['course']
            }
        })
    else:
        # Failure! Increment strikes and lock account if limits reached
        new_attempts = failed_attempts + 1
        new_lockout = None
        error_msg = "Invalid username or password"

        # Protect admins from being locked out
        if user['user_type'] != 'admin':
            if new_attempts == 3:
                new_lockout = (now + datetime.timedelta(minutes=10)).isoformat()
                error_msg = "3 failed attempts. Account locked for 10 minutes."
            elif new_attempts == 4:
                error_msg = "Invalid password. 1 attempt remaining before permanent lock."
            elif new_attempts >= 5:
                # 10 years = effectively permanent lock
                new_lockout = (now + datetime.timedelta(days=3650)).isoformat() 
                error_msg = "Account permanently locked due to too many failed attempts. Contact Admin."

            conn.execute('UPDATE users SET failed_attempts = ?, lockout_until = ? WHERE username = ?', (new_attempts, new_lockout, username))
            conn.commit()

        conn.close()
        return jsonify({"success": False, "error": error_msg}), 401


# --- Verify Login TOTP endpoint ---
@app.route('/api/verify-login-totp', methods=['POST'])
def verify_login_totp():
    if not PYOTP_AVAILABLE: 
        return jsonify({"error": "pyotp missing on server"}), 500
        
    data = request.get_json()
    username = data.get('username')
    entity = data.get('entity')
    totp_code = data.get('totpCode')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND entity = ?', (username, entity)).fetchone()
    conn.close()
    
    # Safely extract variables
    user_dict = dict(user) if user else {}
    totp_secret = user_dict.get('totp_secret')
    
    if not user or not totp_secret:
        return jsonify({"success": False, "error": "Invalid user or TOTP not configured"}), 401
        
    totp = pyotp.TOTP(totp_secret)
    if not totp.verify(totp_code):
        return jsonify({"success": False, "error": "Invalid Authenticator Code"}), 401
        
    # Code is valid, issue JWT
    token = jwt.encode({
        'user': username, 
        'role': user['user_type'], 
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    img_str = None
    if user['profile_image']:
        img_str = f"data:image/jpeg;base64,{base64.b64encode(user['profile_image']).decode()}"
    
    return jsonify({
        "success": True, 
        "token": token,
        "user": {
            "name": user['full_name'], 
            "role": user['user_type'], 
            "profileImage": img_str, 
            "username": user['username'], 
            "entity": entity, 
            "department": user['department'], 
            "course": user['course']
        }
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    msg = data.get('message')
    
    if not GENAI_AVAILABLE or not GEMINI_API_KEY:
        return jsonify({"success": True, "reply": "AI Assistant is offline. Please configure your API key."})
        
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(f"You are the Tula's Connect AI assistant. Answer briefly: {msg}")
        return jsonify({"success": True, "reply": response.text})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/api/check-status', methods=['POST'])
def check_status():
    data = request.get_json()
    id_num = data.get('idNumber')
    conn = get_db_connection()
    req = conn.execute("SELECT * FROM signup_requests WHERE username = ? ORDER BY created_at DESC LIMIT 1", (id_num,)).fetchone()
    
    if not req:
        conn.close()
        return jsonify({"success": False, "message": "No application found for this ID."}), 404
    
    status = req['status']
    message = f"Your application is currently: {status}"
    
    if status == 'Approved':
        message = "Your account is active! You can now log in."
    elif status == 'Rejected':
        message = f"Application Rejected. Reason: {req['rejection_reason'] or 'Not provided'}"

    conn.close()
    return jsonify({"success": True, "status": status, "message": message})

@app.route('/api/admin/requests', methods=['GET'])
@admin_required
def get_requests():
    conn = get_db_connection()
    rows = conn.execute("SELECT id, user_type, username, full_name, email, department FROM signup_requests WHERE status = 'Pending'").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/admin/verify-request', methods=['POST'])
@admin_required
def verify_req():
    data = request.get_json()
    rid = data.get('requestId')
    action = data.get('action')
    
    conn = get_db_connection()
    req = conn.execute("SELECT * FROM signup_requests WHERE id = ?", (rid,)).fetchone()
    
    if not req:
        conn.close()
        return jsonify({"error": "Request not found"}), 404

    if action == 'Approve':
        conn.execute('''INSERT INTO users (user_type, entity, username, password, full_name, email, mobile, department, course, profile_image, totp_secret)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?)''', 
                     (req['user_type'], req['entity'], req['username'], req['password'], req['full_name'], req['email'], req['mobile'], req['department'], req['course'], req['profile_image'], req['totp_secret']))
        conn.execute("UPDATE signup_requests SET status = 'Approved' WHERE id = ?", (rid,))
    else:
        conn.execute("UPDATE signup_requests SET status = 'Rejected', rejection_reason = ? WHERE id = ?", (data.get('reason', 'Denied by Admin'), rid))
    
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"User {action}d successfully"})

# --- NEW LOCKED ACCOUNTS MANAGEMENT ROUTES ---

@app.route('/api/admin/locked-users', methods=['GET'])
@admin_required
def get_locked_users():
    conn = get_db_connection()
    # Fetch any user with 3 or more failed attempts
    users = conn.execute("SELECT username, user_type, failed_attempts FROM users WHERE failed_attempts >= 3").fetchall()
    conn.close()
    
    return jsonify({
        "success": True, 
        "users": [{"username": u['username'], "role": u['user_type'], "failed_attempts": u['failed_attempts']} for u in users]
    })

@app.route('/api/admin/unlock-user', methods=['POST'])
@admin_required
def unlock_user():
    data = request.get_json()
    username = data.get('username')
    
    conn = get_db_connection()
    conn.execute("UPDATE users SET failed_attempts = 0, lockout_until = NULL WHERE username = ?", (username,))
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "Account unlocked successfully"})

if __name__ == '__main__':
    print("--- Tula's Connect Backend Starting (With Security Lockout) on Port 5000 ---")
    app.run(debug=True, port=5000)