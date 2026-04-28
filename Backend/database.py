 import sqlite3
import hashlib
import os
import time

DB_NAME = 'tulas.db'

def hash_password(password):
    """Hashes a password using SHA-256 for secure storage."""
    return hashlib.sha256(password.encode()).hexdigest()

def init_db():
    # Attempt to remove the old database to ensure a clean slate
    if os.path.exists(DB_NAME):
        try:
            # We try multiple times in case the OS is slow to release the file lock
            os.remove(DB_NAME)
            print(f"Old database removed. Creating fresh '{DB_NAME}'...")
        except PermissionError:
            print("----------------------------------------------------------------")
            print("ERROR: DATABASE IS LOCKED!")
            print("Please STOP your 'app.py' script first, then run this again.")
            print("----------------------------------------------------------------")
            return

    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # 1. Create Users Table (Main Table for Active Users)
    # We ensure username is UNIQUE and COLLATE NOCASE for easier login
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_type TEXT NOT NULL,
        entity TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL COLLATE NOCASE,
        password TEXT NOT NULL,
        full_name TEXT,
        email TEXT,
        mobile TEXT,
        dob TEXT,
        gender TEXT,
        address TEXT,
        department TEXT,
        course TEXT,
        class_grade TEXT,
        section TEXT,
        security_q1 TEXT,
        security_a1 TEXT,
        security_q2 TEXT,
        security_a2 TEXT,
        profile_image BLOB,
        totp_secret TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # 2. Create Signup Requests Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS signup_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status TEXT DEFAULT 'Pending',
            view_count INTEGER DEFAULT 0,
            rejection_reason TEXT,
            user_type TEXT NOT NULL,
            entity TEXT NOT NULL,
            username TEXT NOT NULL COLLATE NOCASE,
            password TEXT NOT NULL,
            full_name TEXT,
            email TEXT,
            mobile TEXT,
            dob TEXT,
            gender TEXT,
            address TEXT,
            department TEXT,
            course TEXT,
            class_grade TEXT,
            section TEXT,
            security_q1 TEXT,
            security_a1 TEXT,
            security_q2 TEXT,
            security_a2 TEXT,
            profile_image BLOB,
            totp_secret TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # --- SEEDING ACCOUNTS ---
    
    # Define exact user types matching PORTAL_CONFIG in React
    # Roles: 'admin', 'student', 'faculty', 'department'
    # Tuple Format: (user_role, entity, username, password, full_name, email, department, course, class_grade (year), section (semester))
    seed_users = [
        # Admin
        ('admin', 'institute', 'Admin101', 'admin2023012039', 'System Admin', 'admin@tulas.edu.in', None, None, None, None),
        
        # HOD
        ('department', 'institute', 'CAHOD001', '2023012039', 'Dr. Priya Matta', 'priyamatta@tulas.edu.in', 'Department of Computer Application', 'BCA', None, None),
        
        # STUDENT (Updated with BCA, 3rd Year, 6th Semester)
        ('student', 'institute', '2023012039', '2023012039', 'Priyanshu Bisht', 'priyanshu.2023012039@tulas.edu.in', 'Department of Computer Application', 'BCA', '3rd', '6th'),
        
        # FACULTY
        ('faculty', 'institute', 'CAFAC101', '2023012039', 'Siddharth Sharma', 'siddharth@tulas.edu.in', 'Department of Computer Application', 'BCA', None, None)
    ]

    print("\nSeeding accounts into 'users' table...")
    for user_role, ent, uname, pwd, fname, mail, dept, crs, c_grade, sec in seed_users:
        try:
            cursor.execute('''
                INSERT INTO users (user_type, entity, username, password, full_name, email, department, course, class_grade, section)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (user_role, ent, uname, hash_password(pwd), fname, mail, dept, crs, c_grade, sec))
            print(f"SUCCESS: Created {user_role.upper()} -> ID: {uname} | Password: {pwd}")
        except sqlite3.IntegrityError:
            print(f"WARNING: {uname} already exists. Skipping.")

    conn.commit()
    conn.close()
    print(f"\nSUCCESS: Database '{DB_NAME}' initialized with all accounts.")

if __name__ == '__main__':
    init_db()  