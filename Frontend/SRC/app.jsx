import React, { useState, useEffect } from 'react';

// ============================================================================
// LOTTIE INTEGRATION GUIDE:
// 1. Put your Lottie files (failed.lottie, Success.lottie) in your public folder!
//    Example: project-root/public/failed.lottie
// ============================================================================

import {
  User, Lock, ArrowRight, ArrowLeft, Building2, School, RefreshCw, ShieldCheck,
  Mail, Phone, MapPin, Calendar, Users, Briefcase, BookOpen, ChevronDown,
  Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2, Info, LayoutDashboard,
  FileText, CreditCard, Bell, Settings, GraduationCap, CalendarCheck,
  BarChart3, LogOut, Menu, X, MessageSquare, ClipboardList, TrendingUp, Upload, Smartphone,
  UserCheck, UserPlus, MessageCircle, Clock, Check, XCircle, UserX, Plus,
  Edit2, Download, AlertTriangle, Paperclip, Send, Search, CheckSquare, Megaphone,
  Activity, Database, Sliders, Shield, Trash2, Save, MoreVertical, FileBarChart, Key
} from 'lucide-react';

// --- Configuration & Data ---

const API_BASE_URL = 'http://localhost:5000';

const PORTAL_CONFIG = {
  institute: {
    signupRoles: [
      { id: 'student', label: 'Student' },
      { id: 'faculty', label: 'Faculty' }
    ],
    loginRoles: [
      { id: 'student', label: 'Student' },
      { id: 'faculty', label: 'Faculty' },
      { id: 'department', label: 'Dept. (HOD)' },
      { id: 'admin', label: 'Admin' }
    ]
  },
  school: {
    signupRoles: [
      { id: 'student', label: 'Student' },
      { id: 'teacher', label: 'Teacher' }
    ],
    loginRoles: [
      { id: 'student', label: 'Student' },
      { id: 'teacher', label: 'Teacher' },
      { id: 'principal', label: 'Principal' },
      { id: 'admin', label: 'Admin' }
    ]
  }
};

const THEMES = {
  institute: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    secondary: 'bg-slate-800',
    accent: 'text-red-600',
    border: 'border-red-200',
    light: 'bg-red-50',
    gradient: 'from-slate-900 to-red-900',
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_4ADbeFBqg9mRZQYTRGpzcdXlZN0IFw_0A&s",
    bgImage: "https://static.boostmytalent.com/img/univ/tula-s-institute-dehradun-campus-admission.webp",
    name: "Tula's Institute",
    sub: "Dehradun"
  },
  school: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    secondary: 'bg-red-800',
    accent: 'text-emerald-600',
    border: 'border-emerald-200',
    light: 'bg-emerald-50',
    gradient: 'from-emerald-900 to-slate-900',
    logoUrl: "https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png",
    bgImage: "https://www.schoolsofdehradun.com/wp-content/uploads/2023/10/Tulas-International-School.jpg",
    name: "Tula's International School",
    sub: "Dehradun"
  }
};

// --- ACADEMIC DATA STRUCTURE (Departments & Courses) ---
const INSTITUTE_ACADEMIC_DATA = {
  "Department of Engineering": [
    "B.Tech - Computer Science & Engineering (CSE)",
    "B.Tech - CSE (AI & ML)",
    "B.Tech - CSE (Cyber Security)",
    "B.Tech - CSE (Data Science)",
    "B.Tech - Civil Engineering (CE)",
    "B.Tech - Mechanical Engineering (ME)",
    "B.Tech - Electronics & Communication (ECE)",
    "B.Tech - Electrical & Electronics (EEE)",
    "M.Tech - Computer Science",
    "M.Tech - Thermal Engineering",
    "M.Tech - Structural Engineering (Civil)",
    "Polytechnic - Mechanical Engineering",
    "Polytechnic - Civil Engineering",
    "Polytechnic - Computer Science Engineering"
  ],
  "Department of Computer Application": [
    "BCA",
    "MCA"
  ],
  "Department of Agriculture": [
    "B.Sc. (Hons.) Agriculture (4 Years)"
  ],
  "Department of Journalism and Mass Communication": [
    "BAJMC (Bachelor of Arts in Journalism and Mass Communication)"
  ],
  "Graduate School of Business": [
    "BBA (General)",
    "B.Com (Hons.)",
    "MBA - Marketing",
    "MBA - Finance",
    "MBA - Human Resource Management (HRM)",
    "MBA - Agribusiness Management (ABM)",
    "MBA - Business Analytics (BA)",
    "MBA - International Business (IB)",
    "MBA - Entrepreneurship & Venture Development (EVD)"
  ],
  "Department of Applied Sciences & Humanities": [
    "Foundational Science & Communication"
  ],
  "Tula's Institute of Pharmacy": [
    "B.Pharma (4 Years)",
    "D.Pharma (2 Years)"
  ]
};

const ENGINEERING_BRANCHES_HOD = [
  "Civil Engineering (CE)",
  "Computer Science & Engineering (CSE)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical & Electronics Engineering (EEE)",
  "Mechanical Engineering (ME)"
];

const HOD_DEPARTMENTS = Object.keys(INSTITUTE_ACADEMIC_DATA);

const DASHBOARD_CONTENT = {
  institute: {
    student: [
      { id: 'profile', label: 'My Profile', icon: User, desc: 'View and update your personal and academic details.' },
      { id: 'mentor', label: 'My Mentor', icon: UserCheck, desc: 'Leave applications and mentor announcements.' },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck, desc: 'Check subject-wise attendance and eligibility status.' },
      { id: 'courses', label: 'Courses & Subjects', icon: BookOpen, desc: 'Access enrolled subjects, syllabus, and course materials.' },
      { id: 'assignments', label: 'Assignments', icon: FileText, desc: 'View, submit, and track assignment status.' },
      { id: 'exams', label: 'Examinations', icon: GraduationCap, desc: 'Check exam schedules, results, and performance reports.' },
      { id: 'sem_registration', label: 'Semester Registration', icon: ClipboardList, desc: 'Register for the upcoming academic semester.' },
      { id: 'grievance', label: 'Grievance Redressal', icon: AlertTriangle, desc: 'Submit and track grievances.' },
      { id: 'placements', label: 'Placements', icon: Briefcase, desc: 'View job openings, JDs, and apply for campus placements.' },
      { id: 'fees', label: 'Fees & Payments', icon: CreditCard, desc: 'View fee details, bank accounts, and make online payments.' },
      { id: 'notices', label: 'Notices', icon: Bell, desc: 'Stay updated with important institute notices.' }
    ],
    faculty: [
      { id: 'profile', label: 'My Profile', icon: User, desc: 'View faculty details and teaching schedule.' },
      { id: 'mentorship', label: 'Mentorship', icon: Users, desc: 'Manage mentees, leave requests & announcements.' },
      { id: 'class_mgmt', label: 'Class Management', icon: Users, desc: 'Manage assigned classes and subjects.' },
      { id: 'attendance_mgmt', label: 'Mark Attendance', icon: CalendarCheck, desc: 'Mark student attendance.' },
      { id: 'assignments', label: 'Assignments & Materials', icon: FileText, desc: 'Upload assignments, notes, and study resources.' }
    ],
    department: [
      { id: 'overview', label: 'Department Overview', icon: LayoutDashboard, desc: 'View department statistics and academic summary.' },
      { id: 'mentor_assign', label: 'Mentor Assignment', icon: UserPlus, desc: 'Create groups and assign mentors.' },
      { id: 'faculty_mgmt', label: 'Faculty Management', icon: Briefcase, desc: 'Manage faculty records and workload distribution.' },
      { id: 'student_records', label: 'Student Records', icon: Users, desc: 'Access student enrollment and performance data.' },
      { id: 'sem_registration_control', label: 'Registration Control', icon: Sliders, desc: 'Manage student semester registrations.' },
      { id: 'announcements', label: 'Announcements', icon: Megaphone, desc: 'Post notices for faculty and students.' }
    ],
    admin: [
      { id: 'admin_overview', label: 'System Overview', icon: LayoutDashboard, desc: 'Overview of the whole system and activities.' },
      { id: 'admin_requests', label: 'Pending Requests', icon: ShieldCheck, desc: 'Review and verify new user registrations.' },
      { id: 'admin_students', label: 'Student Mngmnt', icon: GraduationCap, desc: 'Add, edit, delete, view profiles.' },
      { id: 'admin_faculty', label: 'Faculty/HOD Mngmnt', icon: Briefcase, desc: 'Manage faculty/HOD, reset passwords.' },
      { id: 'admin_courses', label: 'Course Mngmnt', icon: BookOpen, desc: 'Create courses, assign to semesters.' },
      { id: 'admin_attendance', label: 'Attendance Mngmnt', icon: CalendarCheck, desc: 'View records, generate reports.' },
      { id: 'admin_exams', label: 'Exams & Results', icon: FileBarChart, desc: 'Create exams, upload marks.' },
      { id: 'admin_fees', label: 'Fees Mngmnt', icon: CreditCard, desc: 'Fee structure, track payments.' },
      { id: 'admin_notices', label: 'Announcements', icon: Megaphone, desc: 'Post notices and notifications.' },
      { id: 'admin_locked', label: 'Locked Accounts', icon: Lock, desc: 'Manage accounts locked due to failed logins.' },
      { id: 'admin_settings', label: 'System Settings', icon: Settings, desc: 'Roles, permissions, bundle.' }
    ],
  },
  school: {
    student: [
      { id: 'profile', label: 'My Profile', icon: User, desc: 'View personal and academic information.' },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck, desc: 'Check daily attendance records.' },
      { id: 'homework', label: 'Homework & Assignments', icon: FileText, desc: 'Track homework and submission status.' }
    ],
    teacher: [
      { id: 'class_mgmt', label: 'Class Management', icon: Users, desc: 'Manage assigned classes and students.' },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck, desc: 'Mark daily student attendance.' },
      { id: 'homework', label: 'Homework', icon: FileText, desc: 'Assign and evaluate homework.' }
    ],
    principal: [
      { id: 'overview', label: 'School Overview', icon: LayoutDashboard, desc: 'View attendance, performance, and activity summaries.' }
    ],
    admin: [
      { id: 'admin_overview', label: 'System Overview', icon: LayoutDashboard, desc: 'Overview of the whole system and activities.' },
      { id: 'admin_requests', label: 'Pending Requests', icon: ShieldCheck, desc: 'Review and verify new user registrations.' },
      { id: 'admin_students', label: 'Student Mngmnt', icon: GraduationCap, desc: 'Add, edit, delete, view profiles.' },
      { id: 'admin_faculty', label: 'Staff/HOD Mngmnt', icon: Briefcase, desc: 'Manage faculty, assign subjects.' },
      { id: 'admin_courses', label: 'Course Mngmnt', icon: BookOpen, desc: 'Create courses, assign to semesters.' },
      { id: 'admin_attendance', label: 'Attendance Mngmnt', icon: CalendarCheck, desc: 'View records, generate reports.' },
      { id: 'admin_exams', label: 'Exams & Results', icon: FileBarChart, desc: 'Create exams, upload marks.' },
      { id: 'admin_fees', label: 'Fees Mngmnt', icon: CreditCard, desc: 'Fee structure, track payments.' },
      { id: 'admin_notices', label: 'Announcements', icon: Megaphone, desc: 'Post notices and notifications.' },
      { id: 'admin_locked', label: 'Locked Accounts', icon: Lock, desc: 'Manage accounts locked due to failed logins.' },
      { id: 'admin_settings', label: 'System Settings', icon: Settings, desc: 'Roles, permissions, bundle.' }
    ],
  }
};

const SCHOOL_CLASSES = Array.from({ length: 12 }, (_, i) => i + 1);
const SCHOOL_SECTIONS = ['A', 'B', 'C', 'D'];

const ACCREDITATION_LOGOS = [
  "https://www.globalinstitutes.edu.in/wp-content/uploads/2022/07/NAACAlogo-1.png",
  "https://assets.thehansindia.com/h-upload/feeds/2019/05/02/170588-nba.jpg",
  "https://ncerc.ac.in/content/img/acrdt/aicte.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_m-WrD1K01K5fXWrzKY8kpN3hzCaeDvmtg&s",
  "https://upload.wikimedia.org/wikipedia/en/d/db/Uttarakhand_Technical_University_logo.png",
  "https://sdsu.co.in/wp-content/uploads/2025/10/Sri-Dev-Suman-Uttarakhand-University-1024x576.webp",
  "https://media.9curry.com/uploads/organization/image/1695/ubter-logo.png",
  "https://upload.wikimedia.org/wikipedia/en/1/1b/Pharmacy_Council_of_India_Logo.png"
];

const SCHOOL_LOGOS = [
  "https://tis-blog-assets.s3.ap-south-1.amazonaws.com/1765282345249.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5W6p0twn64g6noSrCcAOuYvW36sRMFksbNw&s",
  "https://etimg.etb2bimg.com/thumb/msid-113913252,width-1200,height-900,resizemode-4/.jpg"
];

// --- LOTTIE LOADING COMPONENTS ---

const WelcomeScreen = ({ isVisible, name }) => {
  useEffect(() => {
    // Dynamically load the dotLottie Player script to support .lottie files
    if (!document.querySelector('script[src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
      script.type = 'module';
      document.body.appendChild(script);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white backdrop-blur-xl transition-all duration-500 animate-in fade-in">
      <dotlottie-player
        src="/Welcome.lottie" // Ensure Welcome.lottie is in your 'public' folder
        background="transparent"
        speed="1"
        style={{ width: '700px', height: '700px' }}
        autoplay
      ></dotlottie-player>
      <h2 className="text-3xl font-extrabold text-gray-800 mt-2 animate-in slide-in-from-bottom-4 fade-in duration-700">
        Welcome, {name}!
      </h2>
      <p className="text-gray-500 mt-2 font-medium">Preparing your dashboard...</p>
    </div>
  );
};

const LottieLoader = ({ text = "Loading..." }) => {
  useEffect(() => {
    // Dynamically load the Lottie Player script to avoid bundler dependency issues
    if (!document.querySelector('script[src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://lottie.host/82da9428-2bc6-4076-8097-c6b65ee0e9cb/h61w32Uo5S.json" // CHANGE TO YOUR LOCAL JSON PATH (e.g., "/loading.json")
        style={{ height: '120px', width: '120px' }}
      ></lottie-player>
      {text && <p className="mt-2 text-sm font-bold text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
};

const GlobalOverlayLoader = ({ isVisible, text }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-md transition-all duration-300">
      <LottieLoader text={text || "Processing Request..."} />
    </div>
  );
};

// --- ISOLATED CLOCK COMPONENT TO PREVENT APP RE-RENDERS ---
const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right hidden md:block">
      <p className="text-sm font-bold text-gray-800">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
      <p className="text-xs text-gray-500">
        {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('login');
  const [entity, setEntity] = useState('institute');
  const [currentUser, setCurrentUser] = useState(null);

  // --- GLOBALLY LIFTED DASHBOARD STATES ---
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModuleLoading, setIsModuleLoading] = useState(false);

  const handleTabChange = (tabId) => {
    if (activeTab === tabId) return;
    setActiveTab(tabId);
    setIsModuleLoading(true);
    setTimeout(() => {
      setIsModuleLoading(false);
    }, 3000); // 3 Seconds ke liye Loader.lottie chalega
  };

  // --- GLOBAL STATE FOR MENTOR & LEAVE SYSTEM ---
  const [mentorGroups, setMentorGroups] = useState([
    { id: 1, mentorName: 'Siddharth Sharma', mentorId: 'CAFAC101', students: ['2023012039', 'STU002', 'STU003'], branch: 'BCA' }
  ]);
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, studentId: '2023012039', studentName: 'Priyanshu Bisht', type: 'Medical', reason: 'Fever', from: '2025-02-10', to: '2025-02-12', status: 'Pending' }
  ]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, mentorId: 'CAFAC101', message: 'Submit your internship reports by Friday.', date: '2025-01-20' }
  ]);

  // --- SEMESTER REGISTRATION STATE ---
  const [openRegistrations, setOpenRegistrations] = useState([]);
  const [semRegistrations, setSemRegistrations] = useState([]);

  // Forms State
  const [loginData, setLoginData] = useState({
    userType: 'student',
    username: '',
    password: '',
    captchaInput: '',
    department: '',
    branch: ''
  });

  const [signupData, setSignupData] = useState({
    role: 'student', fullName: '', idNumber: '', mobile: '', email: '',
    address: '', dob: '', gender: '', department: '', course: '',
    classVal: '', section: '', fatherName: '', fatherAlive: 'yes',
    motherName: '', motherAlive: 'yes', securityQ1: '', securityQ2: '',
    password: '', confirmPassword: '', profileImage: null
  });

  // Forgot Password States
  const [forgotStep, setForgotStep] = useState(0);
  const [showForgotSuccessAnim, setShowForgotSuccessAnim] = useState(false);
  const [showForgotErrorAnim, setShowForgotErrorAnim] = useState(false);
  const [showPassChangedAnim, setShowPassChangedAnim] = useState(false);
  const [forgotData, setForgotData] = useState({
    idNumber: '',
    email: '',
    totpCode: '',
    newPassword: '',
    confirmPassword: '',
    resetToken: ''
  });

  const [changePassData, setChangePassData] = useState({ newPass: '', confirmPass: '' });

  // CHECK STATUS STATES
  const [checkStatusId, setCheckStatusId] = useState('');
  const [statusResult, setStatusResult] = useState(null);

  // UI State
  const [captchaCode, setCaptchaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Login Authenticator Flow State
  const [showLoginTotpModal, setShowLoginTotpModal] = useState(false);
  const [showSetupTotpModal, setShowSetupTotpModal] = useState(false);
  const [loginTotpCode, setLoginTotpCode] = useState('');
  const [tempLoginCredentials, setTempLoginCredentials] = useState(null);

  // New Welcome Screen State
  const [showWelcome, setShowWelcome] = useState(false);

  // TOTP Sign Up State
  const [totpData, setTotpData] = useState({ secret: '', uri: '', code: '' });
  const [showTotpModal, setShowTotpModal] = useState(false);

  // Naya State: Tick Animation track karne ke liye
  const [isTotpSuccess, setIsTotpSuccess] = useState(false);
  const [isTotpError, setIsTotpError] = useState(false);

  // System Settings State (Admin Controls)
  const [systemSettings, setSystemSettings] = useState({
    allowRegistrations: true,
    maintenanceMode: false
  });

  const theme = THEMES[entity];

  useEffect(() => {
    generateCaptcha();
    // Dynamically load the dotLottie Player script globally to support the maintenance animation
    if (!document.querySelector('script[src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
      script.type = 'module';
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (view === 'dashboard') return;
    if (view !== 'login') {
      setLoginData(prev => ({
        ...prev,
        userType: 'student',
        password: '',
        captchaInput: '',
        department: '',
        branch: ''
      }));
    }

    setSignupData(prev => ({ ...prev, role: 'student', department: '', course: '' }));

    // Reset forgot states
    setForgotData({ idNumber: '', email: '', totpCode: '', newPassword: '', confirmPassword: '', resetToken: '' });
    setForgotStep(0);
    setShowForgotSuccessAnim(false);
    setShowForgotErrorAnim(false);
    setShowPassChangedAnim(false);
    setChangePassData({ newPass: '', confirmPass: '' });

    setCheckStatusId('');
    setStatusResult(null);

    setNotification(null);
    setIsLoading(false);
    setShowTotpModal(false);
    setIsTotpSuccess(false);
    setIsTotpError(false);

    // Reset Login TOTP states
    setShowLoginTotpModal(false);
    setShowSetupTotpModal(false);
    setLoginTotpCode('');
    setTempLoginCredentials(null);

  }, [entity, view]);

  const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)); }
    setCaptchaCode(result);
    setLoginData(prev => ({ ...prev, captchaInput: '' }));
  };

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupChange = (e) => {
    if (e.target.name === 'profileImage') {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setNotification({ type: 'error', message: 'Image size must be less than 5MB' });
          e.target.value = null;
          return;
        }
        setSignupData({ ...signupData, profileImage: file });
        setNotification(null);
      }
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  const handleForgotChange = (e) => { setForgotData({ ...forgotData, [e.target.name]: e.target.value }); setNotification(null); };
  const handleChangePassChange = (e) => setChangePassData({ ...changePassData, [e.target.name]: e.target.value });

  const validateSignup = () => {
    if (entity === 'institute' && !signupData.email.endsWith('@tulas.edu.in')) return "Institute email must end with @tulas.edu.in";
    if (signupData.password !== signupData.confirmPassword) return "Passwords do not match";
    if (!signupData.fullName || !signupData.idNumber || !signupData.mobile || !signupData.securityQ1 || !signupData.securityQ2) return "Please fill all required fields";
    if (entity === 'institute' && signupData.role === 'student' && (!signupData.department || !signupData.course)) return "Select Dept & Course";
    if (entity === 'school' && signupData.role === 'student' && (!signupData.classVal || !signupData.section)) return "Select Class & Section";
    return null;
  };

  // --- PASSWORD FORGOT HANDLER ---
  const handleForgotPasswordClick = () => {
    const highPrivilegeRoles = ['department', 'principal', 'admin'];
    if (highPrivilegeRoles.includes(loginData.userType)) {
      setNotification({
        type: 'error',
        message: 'You are not authorized for self forget password. Please contact the System Administrator for credential recovery.'
      });
    } else {
      setView('forgot');
    }
  };

  // --- FORGOT PASSWORD SUBMIT LOGIC (Authenticator Based) ---
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      // Step 0: Identify (Verify ID + Email exists)
      if (forgotStep === 0) {
        if (!forgotData.idNumber || !forgotData.email) {
          setNotification({ type: 'error', message: 'Enter ID and Email.' });
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/forgot/verify-identity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idNumber: forgotData.idNumber, email: forgotData.email })
        });

        let data;
        const textResponse = await response.text();
        try {
          data = JSON.parse(textResponse);
        } catch (parseError) {
          setNotification({ type: 'error', message: `Server Error ${response.status}: Forgot Password routes are missing in App.py.` });
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          setNotification({ type: 'success', message: data.message });
          setShowForgotSuccessAnim(true);
          setTimeout(() => {
            setShowForgotSuccessAnim(false);
            setForgotStep(1);
            setIsLoading(false);
          }, 2500); // Wait for the animation to play before moving to the next step
        } else {
          setNotification({ type: 'error', message: data.error });
          setShowForgotErrorAnim(true);
          setTimeout(() => {
            setShowForgotErrorAnim(false);
            setIsLoading(false);
          }, 2500); // Wait for the animation to play before showing form again
        }
      }
      // Step 1: Verify Authenticator TOTP
      else if (forgotStep === 1) {
        if (!forgotData.totpCode || forgotData.totpCode.length !== 6) {
          setNotification({ type: 'error', message: 'Enter 6-digit Authenticator code.' });
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/forgot/verify-totp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idNumber: forgotData.idNumber,
            email: forgotData.email,
            totpCode: forgotData.totpCode
          })
        });

        let data;
        const textResponse = await response.text();
        try {
          data = JSON.parse(textResponse);
        } catch (parseError) {
          setNotification({ type: 'error', message: `Server Error ${response.status}: Forgot Password routes are missing in App.py.` });
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          setForgotData({ ...forgotData, resetToken: data.resetToken });
          setIsTotpSuccess(true);
          setIsTotpError(false);
          setNotification({ type: 'success', message: 'Identity Verified! Set new password.' });
          setTimeout(() => {
            setForgotStep(2);
            setIsTotpSuccess(false);
            setIsLoading(false);
          }, 4100);
        } else {
          setIsTotpError(true);
          setNotification({ type: 'error', message: data.error });
          setIsLoading(false);
          setTimeout(() => setIsTotpError(false), 2000);
        }
      }
      // Step 2: Final Password Reset
      else if (forgotStep === 2) {
        if (forgotData.newPassword.length < 6 || forgotData.newPassword !== forgotData.confirmPassword) {
          setNotification({ type: 'error', message: 'Passwords mismatch or too short (min 6).' });
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/forgot/reset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idNumber: forgotData.idNumber,
            newPassword: forgotData.newPassword,
            resetToken: forgotData.resetToken
          })
        });

        let data;
        const textResponse = await response.text();
        try {
          data = JSON.parse(textResponse);
        } catch (parseError) {
          setNotification({ type: 'error', message: `Server Error ${response.status}: Forgot Password routes are missing in App.py.` });
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          setNotification({ type: 'success', message: 'Password Reset Successful! Redirecting...' });
          setShowPassChangedAnim(true);
          setTimeout(() => {
            setShowPassChangedAnim(false);
            setView('login');
            setIsLoading(false);
          }, 3000);
        } else {
          setNotification({ type: 'error', message: data.error });
          setIsLoading(false);
        }
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Network connection failed.' });
      setIsLoading(false);
    }
  };

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!checkStatusId) {
      setNotification({ type: 'error', message: 'Please enter your User ID.' });
      return;
    }
    setIsLoading(true);
    setStatusResult(null);
    setNotification(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNumber: checkStatusId })
      });
      const data = await response.json();

      if (response.ok) {
        setStatusResult(data);
      } else {
        if (response.status === 403) {
          setStatusResult({ success: false, status: 'Hidden', message: data.message });
        } else {
          setNotification({ type: 'error', message: data.message || 'Error checking status.' });
        }
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Connection error.' });
    }
    setIsLoading(false);
  };

  // --- Handle Login TOTP Verification ---
  const handleVerifyLoginTotp = async () => {
    if (!loginTotpCode || loginTotpCode.length !== 6) {
      setNotification({ type: 'error', message: 'Enter the 6-digit Authenticator code.' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-login-totp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: tempLoginCredentials.username,
          entity: tempLoginCredentials.entity,
          totpCode: loginTotpCode
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setIsTotpSuccess(true);
        setIsTotpError(false);
        setNotification({ type: 'success', message: `Verification Successful!` });

        setTimeout(() => {
          setShowLoginTotpModal(false);
          setIsTotpSuccess(false);
          setLoginTotpCode('');
          setCurrentUser({
            name: data.user.name,
            role: data.user.role,
            entity: data.user.entity,
            profileImage: data.user.profileImage,
            username: data.user.username,
            department: data.user.department,
            course: data.user.course,
            token: data.token
          });
          setActiveTab(data.user.role === 'department' ? 'overview' : 'home');

          // Show Welcome Screen instead of instant redirect
          setShowWelcome(true);
          setTimeout(() => {
            setShowWelcome(false);
            setView('dashboard');
            setIsLoading(false);
          }, 3000); // Plays animation for 3 seconds
        }, 4100); // Wait 4.1 seconds for Tick animation
      } else {
        setIsTotpError(true);
        setNotification({ type: 'error', message: data.error || 'Invalid Authenticator Code' });
        setIsLoading(false);
        setTimeout(() => setIsTotpError(false), 2000);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Server Connection Failed.' });
      setIsLoading(false);
    }
  };

  const finalizeLoginTotpSetup = async () => {
    if (!totpData.code || totpData.code.length !== 6) {
      setNotification({ type: 'error', message: 'Enter the 6-digit Authenticator code.' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/setup-login-totp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: tempLoginCredentials.username,
          totpSecret: totpData.secret,
          totpCode: totpData.code
        })
      });
      const data = await response.json();

      if (response.ok) {
        setIsTotpSuccess(true);
        setIsTotpError(false);
        setNotification({ type: 'success', message: 'Authenticator linked successfully! Please log in again.' });
        setTimeout(() => {
          setShowSetupTotpModal(false);
          setIsTotpSuccess(false);
          setTotpData({ secret: '', uri: '', code: '' });
          setLoginData({ ...loginData, password: '', captchaInput: '' });
          generateCaptcha();
          setIsLoading(false);
        }, 4100);
      } else {
        setIsTotpError(true);
        setNotification({ type: 'error', message: data.error || 'Failed to link Authenticator' });
        setIsLoading(false);
        setTimeout(() => setIsTotpError(false), 2000);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Server Error. Try again later.' });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (view === 'checkStatus') {
      handleCheckStatus(e);
      return;
    }
    if (view === 'forgot') {
      handleForgotSubmit(e);
      return;
    }

    setIsLoading(true);
    setNotification(null);

    if (view === 'login') {
      if (loginData.captchaInput.toUpperCase() !== captchaCode) {
        setNotification({ type: 'error', message: 'Incorrect Captcha.' });
        setIsLoading(false);
        generateCaptcha();
        return;
      }

      if (loginData.userType === 'department') {
        if (!loginData.department) {
          setNotification({ type: 'error', message: 'Please select a Department.' });
          setIsLoading(false);
          return;
        }
        if (loginData.department === 'Department of Engineering' && !loginData.branch) {
          setNotification({ type: 'error', message: 'Please select an Engineering Branch.' });
          setIsLoading(false);
          return;
        }
      }

      const isDemoHOD = loginData.username === 'CAHOD001' && loginData.password === '2023012039' && loginData.department === 'Department of Computer Application' && loginData.userType === 'department';
      if (isDemoHOD) {
        if (systemSettings.maintenanceMode) {
          setNotification({ type: 'error', message: 'System under maintenance. Access restricted to Administrators only.' });
          setIsLoading(false);
          return;
        }
        setCurrentUser({
          name: "Dr. Priya Matta",
          role: "department",
          entity: "institute",
          username: "CAHOD001",
          department: "Department of Computer Application",
          branch: ""
        });

        setActiveTab('overview');
        setNotification({ type: 'success', message: `Login Successful!` });

        // Show Welcome Screen
        setShowWelcome(true);
        setTimeout(() => {
          setShowWelcome(false);
          setView('dashboard');
          setIsLoading(false);
        }, 3000);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...loginData, entity })
        });

        const data = await response.json();

        if (response.ok && data.success) {

          // --- TRIGGER NEW SETUP FLOW ---
          if (data.requires_totp_setup) {
            setTempLoginCredentials({ username: data.username, entity: data.entity });
            setTotpData({ secret: data.secret, uri: data.uri, code: '' });
            setShowSetupTotpModal(true);
            setNotification({ type: 'info', message: "Security Update: Please set up Google Authenticator to continue." });
            setIsLoading(false);
            return;
          }

          // Trigger TOTP verification if the user has it configured
          if (data.requires_totp) {
            setTempLoginCredentials({ username: data.username, entity: data.entity });
            setShowLoginTotpModal(true);
            setNotification({ type: 'success', message: "Credentials verified. Please enter Authenticator code." });
            setIsLoading(false);
            return;
          }

          if (systemSettings.maintenanceMode && data.user.role !== 'admin') {
            setNotification({ type: 'error', message: 'System is currently under maintenance. Only Administrators can log in.' });
            setIsLoading(false);
            generateCaptcha();
            return;
          }

          const isDemoAccount = loginData.username.toUpperCase() === 'TEMPUSER001' && loginData.password === 'Temp@1234';
          if (isDemoAccount) {
            setNotification({ type: 'success', message: 'Temporary Password. Please Reset.' });
            setTimeout(() => { setView('changePassword'); setIsLoading(false); }, 1000);
            return;
          }

          setCurrentUser({
            name: data.user.name,
            role: data.user.role,
            entity: entity,
            profileImage: data.user.profileImage,
            username: data.user.username,
            department: data.user.department,
            course: data.user.course,
            token: data.token
          });

          setActiveTab(data.user.role === 'department' ? 'overview' : 'home');
          setNotification({ type: 'success', message: `Login Successful!` });

          // Show Welcome Screen
          setShowWelcome(true);
          setTimeout(() => {
            setShowWelcome(false);
            setView('dashboard');
            setIsLoading(false);
          }, 3000);
        } else {
          setNotification({ type: 'error', message: data.error || 'Login Failed' });
          generateCaptcha();
          setIsLoading(false);
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Error: ' + err.message });
        setIsLoading(false);
      }

    } else if (view === 'signup') {
      if (!systemSettings.allowRegistrations) {
        setNotification({ type: 'error', message: 'New registrations are currently disabled by the Administrator.' });
        setIsLoading(false);
        return;
      }

      const error = validateSignup();
      if (error) { setNotification({ type: 'error', message: error }); setIsLoading(false); return; }

      // Initiate TOTP Setup instead of direct signup
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/generate-totp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: signupData.email || 'user@tulas.edu.in' })
        });
        const data = await response.json();
        if (response.ok) {
          setTotpData({ secret: data.secret, uri: data.uri, code: '' });
          setShowTotpModal(true);
        } else {
          setNotification({ type: 'error', message: data.error || 'Failed to generate Authenticator QR' });
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Connection Error.' });
      }
      setIsLoading(false);

    } else if (view === 'changePassword') {
      if (changePassData.newPass.length < 6 || changePassData.newPass !== changePassData.confirmPass) {
        setNotification({ type: 'error', message: 'Invalid Password or Mismatch.' });
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setNotification({ type: 'success', message: 'Password Updated!' });
        setIsLoading(false);
        setTimeout(() => setView('login'), 2000);
      }, 1500);
    }
  };

  const finalizeSignup = async () => {
    if (!totpData.code || totpData.code.length !== 6) {
      setNotification({ type: 'error', message: 'Enter the 6-digit Authenticator code.' });
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(signupData).forEach(key => {
        if (key === 'profileImage' && signupData[key]) {
          formData.append(key, signupData[key]);
        } else if (key !== 'profileImage') {
          formData.append(key, signupData[key]);
        }
      });
      formData.append('entity', entity);
      formData.append('totpSecret', totpData.secret);
      formData.append('totpCode', totpData.code);

      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        body: formData
      });

      let data;
      const textResponse = await response.text();
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Non-JSON Server Response:", textResponse);
        setNotification({ type: 'error', message: `Server Error ${response.status}: Database schema mismatch. Please stop App.py and run Database.py to reset the DB.` });
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        setIsTotpSuccess(true);
        setIsTotpError(false);
        setNotification({ type: 'success', message: 'Request Submitted! Check status anytime.' });
        setTimeout(() => {
          setShowTotpModal(false);
          setIsTotpSuccess(false);
          setView('checkStatus');
          setCheckStatusId(signupData.idNumber);
          setIsLoading(false);
        }, 4100);
      } else {
        setIsTotpError(true);
        setNotification({ type: 'error', message: data.error || 'Signup Failed' });
        setIsLoading(false);
        setTimeout(() => setIsTotpError(false), 2000);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Server Error. Try again later.' });
      setIsLoading(false);
    }
  };

  const renderSignupForm = () => {
    if (!systemSettings.allowRegistrations) {
      return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mt-6 p-8 bg-orange-50 border border-orange-200 rounded-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={32} />
            </div>
            <h4 className="text-xl font-bold text-orange-800 mb-2">Registrations Closed</h4>
            <p className="text-sm text-orange-700">New account registrations are currently disabled by the administration. Please contact the helpdesk for assistance.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex justify-end">
          <button type="button" onClick={() => setView('checkStatus')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            Check Application Status <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {PORTAL_CONFIG[entity].signupRoles.map((role) => (
            <button key={role.id} type="button" onClick={() => setSignupData({ ...signupData, role: role.id })} className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${signupData.role === role.id ? `${theme.primary} text-white border-transparent` : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{role.label}</button>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col items-center">
          <label className="text-xs font-bold text-gray-500 uppercase mb-2">Upload Profile Picture (Max 5MB)</label>
          <div className="w-full relative">
            <input type="file" name="profileImage" accept="image/*" onChange={handleSignupChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-gray-400 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Upload size={18} />
              {signupData.profileImage ? signupData.profileImage.name : "Click to Upload Image"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Full Name</label><div className="relative"><User size={16} className="absolute left-3 top-3 text-gray-400" /><input type="text" name="fullName" value={signupData.fullName} onChange={handleSignupChange} className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2" required /></div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">User ID</label><div className="relative"><Briefcase size={16} className="absolute left-3 top-3 text-gray-400" /><input type="text" name="idNumber" value={signupData.idNumber} onChange={handleSignupChange} className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2" required /></div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Mobile</label><input type="tel" name="mobile" value={signupData.mobile} onChange={handleSignupChange} className="w-full border p-2 rounded-lg text-sm" required /></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Email</label><input type="email" name="email" value={signupData.email} onChange={handleSignupChange} className="w-full border p-2 rounded-lg text-sm" placeholder="Use @tulas.edu.in" required /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">DOB</label><input type="date" name="dob" value={signupData.dob} onChange={handleSignupChange} className="w-full border p-2 rounded-lg text-sm" required /></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Gender</label><select name="gender" value={signupData.gender} onChange={handleSignupChange} className="w-full border p-2 rounded-lg text-sm" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
        </div>
        <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Address</label><textarea name="address" value={signupData.address} onChange={handleSignupChange} rows="2" className="w-full border p-2 rounded-lg text-sm" required /></div>

        {entity === 'institute' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="col-span-2 text-xs font-bold text-gray-500 uppercase">Academic</div>
            <select name="department" value={signupData.department} onChange={handleSignupChange} className="w-full border p-2 rounded text-sm"><option value="">Dept</option>{Object.keys(INSTITUTE_ACADEMIC_DATA).map(d => <option key={d} value={d}>{d}</option>)}</select>
            {signupData.role === 'student' && <select name="course" value={signupData.course} onChange={handleSignupChange} className="w-full border p-2 rounded text-sm"><option value="">Course</option>{(INSTITUTE_ACADEMIC_DATA[signupData.department] || []).map(c => <option key={c} value={c}>{c}</option>)}</select>}
          </div>
        ) : (signupData.role === 'student' && <div className="grid grid-cols-2 gap-4"><select name="classVal" value={signupData.classVal} onChange={handleSignupChange} className="border p-2 rounded text-sm"><option>Class</option>{SCHOOL_CLASSES.map(c => <option key={c}>{c}</option>)}</select><select name="section" value={signupData.section} onChange={handleSignupChange} className="border p-2 rounded text-sm"><option>Sec</option>{SCHOOL_SECTIONS.map(s => <option key={s}>{s}</option>)}</select></div>)}

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
          <div className="text-xs font-bold text-gray-500 uppercase">Security Questions</div>
          <input type="text" name="securityQ1" value={signupData.securityQ1} onChange={handleSignupChange} className="w-full border p-2 rounded text-sm" placeholder="Dream thing?" required />
          <input type="text" name="securityQ2" value={signupData.securityQ2} onChange={handleSignupChange} className="w-full border p-2 rounded text-sm" placeholder="Fav Person?" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Password</label><div className="relative"><Lock size={16} className="absolute left-3 top-3 text-gray-400" /><input type="password" name="password" value={signupData.password} onChange={handleSignupChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" required /></div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-500">Confirm</label><div className="relative"><Lock size={16} className="absolute left-3 top-3 text-gray-400" /><input type="password" name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" required /></div></div>
        </div>
      </div>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
        {/* Progress Tracker */}
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${forgotStep >= 0 ? theme.primary : 'bg-gray-200'} text-white`}>1</div>
          <div className={`flex-1 h-0.5 ${forgotStep >= 1 ? theme.primary : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${forgotStep >= 1 ? theme.primary : 'bg-gray-200'} text-white`}>2</div>
          <div className={`flex-1 h-0.5 ${forgotStep >= 2 ? theme.primary : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${forgotStep >= 2 ? theme.primary : 'bg-gray-200'} text-white`}>3</div>
        </div>

        {forgotStep === 0 && (
          <div className="space-y-4">
            {showForgotSuccessAnim ? (
              <div className="flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-500">
                <dotlottie-player
                  src="/Success.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  autoplay
                ></dotlottie-player>
                <h4 className="text-lg font-bold text-green-600 mt-4">Identity Verified!</h4>
                <p className="text-sm text-gray-500 mt-1">Preparing Authenticator...</p>
              </div>
            ) : showForgotErrorAnim ? (
              <div className="flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-500">
                <dotlottie-player
                  src="/failed.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  autoplay
                ></dotlottie-player>
                <h4 className="text-lg font-bold text-red-600 mt-4">Verification Failed!</h4>
                <p className="text-sm text-gray-500 mt-1">Please check your details and try again.</p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                  Enter your College ID and registered Email. We will verify your identity before using the Authenticator.
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">User ID</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" name="idNumber" value={forgotData.idNumber} onChange={handleForgotChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" placeholder="e.g. 2023012039" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Registered Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="email" name="email" value={forgotData.email} onChange={handleForgotChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" placeholder="email@example.com" required />
                  </div>
                </div>
                <button type="button" onClick={handleForgotSubmit} disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  {isLoading ? 'Verifying...' : 'Verify Identity'}
                </button>
              </>
            )}
          </div>
        )}

        {forgotStep === 1 && (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
              {isTotpSuccess ? (
                <dotlottie-player key="tick" src="/tick.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : isTotpError ? (
                <dotlottie-player key="failure" src="/failure.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : (
                <dotlottie-player key="check" src="/check.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
              )}
            </div>
            <h4 className="font-bold text-gray-800">Authenticator Verification</h4>
            <p className="text-xs text-gray-500">Open your <b>Google Authenticator</b> app and enter the 6-digit code for your Tula's Connect account.</p>
            <input
              type="text"
              name="totpCode"
              maxLength={6}
              value={forgotData.totpCode}
              onChange={handleForgotChange}
              className="w-full border-2 p-3 rounded-xl text-center tracking-[0.5em] text-2xl font-bold font-mono focus:border-blue-500 outline-none"
              placeholder="000000"
            />
            <button type="button" onClick={handleForgotSubmit} disabled={isLoading} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
              {isLoading ? 'Verifying...' : 'Verify Authenticator'}
            </button>
            <button type="button" onClick={() => setForgotStep(0)} className="text-xs text-blue-600 hover:underline">Change Email/ID</button>
          </div>
        )}

        {forgotStep === 2 && (
          <div className="space-y-4">
            {showPassChangedAnim ? (
              <div className="flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-500">
                <dotlottie-player
                  src="/passchanged.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  autoplay
                ></dotlottie-player>
                <h4 className="text-lg font-bold text-green-600 mt-4 text-center">Password Changed!</h4>
                <p className="text-sm text-gray-500 mt-1 text-center">Redirecting to login...</p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-xs text-green-700 text-center">
                  Security Verified. Set your new login password.
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="password" name="newPassword" value={forgotData.newPassword} onChange={handleForgotChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" placeholder="Min 6 chars" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input type="password" name="confirmPassword" value={forgotData.confirmPassword} onChange={handleForgotChange} className="w-full pl-9 p-2.5 border rounded-lg text-sm" placeholder="Repeat password" required />
                  </div>
                </div>
                <button type="button" onClick={handleForgotSubmit} disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  {isLoading ? 'Updating...' : 'Reset Password'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderChangePasswordForm = () => {
    return (
      <div className="space-y-6">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg"><h4 className="text-sm font-bold text-orange-800">Security Alert</h4><p className="text-xs text-orange-700">Change temp password.</p></div>
        <input type="password" name="newPass" value={changePassData.newPass} onChange={handleChangePassChange} className="w-full border p-2 rounded" placeholder="New Password" />
        <input type="password" name="confirmPass" value={changePassData.confirmPass} onChange={handleChangePassChange} className="w-full border p-2 rounded" placeholder="Confirm Password" />
      </div>
    );
  };

  const renderCheckStatusForm = () => {
    const renderStatusBadge = () => {
      if (!statusResult) return null;

      let bgColor = 'bg-yellow-50 border-yellow-200 text-yellow-800';
      let icon = <Clock size={20} />;
      let title = 'Status Unknown';

      if (statusResult.status === 'Approved') {
        bgColor = 'bg-green-50 border-green-200 text-green-800';
        icon = <CheckCircle2 size={20} />;
        title = 'Approved';
      } else if (statusResult.status === 'Rejected') {
        bgColor = 'bg-red-50 border-red-200 text-red-800';
        icon = <XCircle size={20} />;
        title = 'Rejected';
      } else if (statusResult.status === 'Hidden') {
        bgColor = 'bg-gray-100 border-gray-300 text-gray-600';
        icon = <Lock size={20} />;
        title = 'Hidden';
      } else if (statusResult.status === 'Pending') {
        title = 'Pending';
      } else {
        bgColor = 'bg-red-50 border-red-200 text-red-800';
        icon = <AlertTriangle size={20} />;
        title = 'Error';
      }

      return (
        <div className={`mt-4 p-4 rounded-xl border text-sm animate-in fade-in zoom-in duration-300 ${bgColor}`}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
              <h4 className="font-bold text-lg mb-1">{title}</h4>
              <p>{statusResult.message}</p>
              {statusResult.reason && (
                <div className="mt-2 p-2 bg-white/50 rounded border border-red-100">
                  <span className="font-bold text-xs uppercase block mb-1">Reason:</span>
                  {statusResult.reason}
                </div>
              )}
              {statusResult.status === 'Approved' && (
                <button type="button" onClick={() => setView('login')} className="mt-3 bg-green-700 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-800">Go to Login</button>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
          Enter your User ID (e.g., 2023012039) to check the status of your account creation request.
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">User ID</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={checkStatusId}
              onChange={(e) => setCheckStatusId(e.target.value)}
              className="w-full pl-9 p-2.5 border rounded-lg text-sm outline-none focus:ring-2"
              placeholder="Enter ID used during signup"
            />
          </div>
        </div>

        <button type="button" onClick={handleCheckStatus} disabled={isLoading} className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70' : ''}`}>
          {isLoading ? 'Checking...' : 'Check Status'}
        </button>

        {renderStatusBadge()}
      </div>
    );
  };

  const FloatingAIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: `Hello ${currentUser?.name || ''}! I am Connect AI. How can I help you today?` }]);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendChatMessage = async () => {
      if (!chatInput.trim()) return;
      const userMsg = chatInput.trim();

      setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
      setChatInput('');
      setIsTyping(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg })
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: data.error || "Sorry, I couldn't process that request right now." }]);
        }
      } catch (err) {
        setMessages(prev => [...prev, { sender: 'bot', text: "Network error. Make sure the Python backend is running." }]);
      }
      setIsTyping(false);
    };

    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[350px] h-[500px] flex flex-col mb-4 transition-all duration-300 transform origin-bottom-right">

            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md z-20">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-full">
                  <img src="https://i.cdn.newsbytesapp.com/images/l71220250705112958.png" alt="AI Logo" className="h-5 w-5 object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">Connect AI</h3>
                  <p className="text-[10px] text-blue-100">Powered by Google Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col relative bg-gray-50">
              <div
                className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1400/1*uUFFjzaVmE_1RrfcVbx2QQ.jpeg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>

              <div className="relative z-10 flex flex-col space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center relative z-20">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
                className="flex-1 border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Ask me anything..."
                disabled={isTyping}
              />
              <button
                onClick={sendChatMessage}
                disabled={isTyping || !chatInput.trim()}
                className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none ${isOpen ? 'bg-red-500 text-white rotate-90' : 'bg-blue-600 text-white'}`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    );
  };

  const StudentMentorView = () => {
    const myGroup = mentorGroups.find(g => g.students.includes(currentUser.username)) || mentorGroups[0];
    const myMentor = myGroup ? myGroup.mentorName : "Not Assigned";
    const myAnnouncements = announcements.filter(a => a.mentorId === myGroup?.mentorId);

    const [leaveForm, setLeaveForm] = useState({ type: 'Medical', reason: '', from: '', to: '' });

    const handleApplyLeave = () => {
      const newLeave = {
        id: leaveRequests.length + 1,
        studentId: currentUser.username,
        studentName: currentUser.name,
        ...leaveForm,
        status: 'Pending'
      };
      setLeaveRequests([...leaveRequests, newLeave]);
      setNotification({ type: 'success', message: 'Leave Applied Successfully!' });
      setLeaveForm({ type: 'Medical', reason: '', from: '', to: '' });
    };

    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><UserCheck className="text-blue-600" /> My Mentor</h3>
            <p className="text-gray-500 text-sm mt-1">Assigned Mentor: <span className="font-bold text-blue-700 text-lg">{myMentor}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><CalendarCheck size={18} /> Apply for Leave</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500">Leave Type</label>
                <select className="w-full border p-2 rounded" value={leaveForm.type} onChange={e => setLeaveForm({ ...leaveForm, type: e.target.value })}>
                  <option>Medical</option><option>Personal</option><option>Emergency</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs font-bold text-gray-500">From</label><input type="date" className="w-full border p-2 rounded" value={leaveForm.from} onChange={e => setLeaveForm({ ...leaveForm, from: e.target.value })} /></div>
                <div><label className="text-xs font-bold text-gray-500">To</label><input type="date" className="w-full border p-2 rounded" value={leaveForm.to} onChange={e => setLeaveForm({ ...leaveForm, to: e.target.value })} /></div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500">Reason</label>
                <textarea className="w-full border p-2 rounded" rows="2" value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}></textarea>
              </div>
              <button onClick={handleApplyLeave} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium">Submit Request</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><MessageCircle size={18} /> Mentor Announcements</h4>
              <div className="space-y-2">
                {myAnnouncements.map((ann, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-blue-100 text-sm text-gray-700 shadow-sm">
                    <p>{ann.message}</p>
                    <span className="text-xs text-gray-400 block mt-1">{ann.date}</span>
                  </div>
                ))}
                {myAnnouncements.length === 0 && <p className="text-xs text-blue-400">No announcements yet.</p>}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-3">Leave History</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {leaveRequests.filter(l => l.studentId === currentUser.username).map((req, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b pb-2">
                    <div>
                      <span className="font-medium text-gray-800">{req.type}</span>
                      <span className="text-xs text-gray-500 block">{req.from} to {req.to}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{req.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FacultyMentorView = () => {
    const [msg, setMsg] = useState('');
    const myRequests = leaveRequests;

    const handleStatus = (id, status) => {
      const updated = leaveRequests.map(r => r.id === id ? { ...r, status } : r);
      setLeaveRequests(updated);
      setNotification({ type: 'success', message: `Leave ${status}` });
    };

    const postAnnouncement = () => {
      if (!msg) return;
      const newAnn = { id: Date.now(), mentorId: currentUser.username, message: msg, date: new Date().toISOString().split('T')[0] };
      setAnnouncements([newAnn, ...announcements]);
      setMsg('');
      setNotification({ type: 'success', message: 'Announcement Posted' });
    };

    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Users className="text-blue-600" /> Mentorship Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2"><Clock size={18} /> Pending Leave Requests</div>
            <div className="p-4 space-y-3">
              {myRequests.filter(r => r.status === 'Pending').map(req => (
                <div key={req.id} className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="font-bold text-gray-800">{req.studentName} <span className="text-xs font-normal text-gray-500">({req.studentId})</span></p>
                    <p className="text-sm text-blue-600 font-medium">{req.type} Leave</p>
                    <p className="text-xs text-gray-500">{req.from} to {req.to} • Reason: {req.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleStatus(req.id, 'Approved')} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Approve"><Check size={18} /></button>
                    <button onClick={() => handleStatus(req.id, 'Rejected')} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200" title="Reject"><XCircle size={18} /></button>
                  </div>
                </div>
              ))}
              {myRequests.filter(r => r.status === 'Pending').length === 0 && <p className="text-gray-400 text-sm text-center py-4">No pending requests.</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2"><MessageCircle size={18} /> Post Announcement</div>
            <div className="p-4 space-y-3">
              <textarea
                className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                rows="4"
                placeholder="Type message for your mentees..."
                value={msg}
                onChange={e => setMsg(e.target.value)}
              ></textarea>
              <button onClick={postAnnouncement} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Post Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FacultyAttendanceView = () => {
    const [selectedClass, setSelectedClass] = useState('BCA-6th-Sem-A');
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

    const MOCK_CLASS_ROSTER = [
      { id: '2023012039', name: 'Priyanshu Bisht' },
      { id: 'STU002', name: 'Rahul Kumar' },
      { id: 'STU003', name: 'Priya Singh' },
      { id: 'STU004', name: 'Amit Sharma' },
      { id: 'STU005', name: 'Sneha Verma' }
    ];

    const getLeaveStatus = (studentId) => {
      const leave = leaveRequests.find(l =>
        l.studentId === studentId &&
        l.status === 'Approved' &&
        new Date(attendanceDate) >= new Date(l.from) &&
        new Date(attendanceDate) <= new Date(l.to)
      );
      return leave ? leave.type : null;
    };

    const [attendance, setAttendance] = useState({});

    const markAttendance = (studentId, status) => {
      setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const submitAttendance = () => {
      setNotification({ type: 'success', message: 'Attendance Submitted Successfully!' });
    };

    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><CalendarCheck className="text-blue-600" /> Mark Attendance</h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <label className="text-xs font-bold text-gray-500 uppercase">Select Class</label>
            <select className="w-full border p-2 rounded-lg mt-1" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              <option value="BCA-6th-Sem-A">BCA - 6th Sem - Sec A</option>
              <option value="BCA-6th-Sem-B">BCA - 6th Sem - Sec B</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
            <input type="date" className="w-full border p-2 rounded-lg mt-1" value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_CLASS_ROSTER.map(student => {
                const onLeave = getLeaveStatus(student.id);
                return (
                  <tr key={student.id} className={onLeave ? "bg-orange-50" : "hover:bg-gray-50"}>
                    <td className="px-6 py-4 font-mono font-medium text-gray-700">{student.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4">
                      {onLeave ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                          <UserX size={12} /> On Leave ({onLeave})
                        </span>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-bold ${attendance[student.id] === 'Present' ? 'text-green-600' : attendance[student.id] === 'Absent' ? 'text-red-600' : 'text-gray-400'}`}>
                          {attendance[student.id] || 'Not Marked'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      {!onLeave ? (
                        <>
                          <button
                            onClick={() => markAttendance(student.id, 'Present')}
                            className={`px-3 py-1 rounded border text-xs font-bold transition-colors ${attendance[student.id] === 'Present' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-600 border-green-200 hover:bg-green-50'}`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, 'Absent')}
                            className={`px-3 py-1 rounded border text-xs font-bold transition-colors ${attendance[student.id] === 'Absent' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-200 hover:bg-red-50'}`}
                          >
                            A
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Leave Approved</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button onClick={submitAttendance} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-md">
            Submit Attendance
          </button>
        </div>
      </div>
    );
  };

  const HODOverview = () => (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><LayoutDashboard className="text-blue-600" /> Department Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={24} /></div>
          <div><p className="text-xs text-gray-500 font-bold uppercase">Total Students</p><h4 className="text-2xl font-bold text-gray-800">450</h4></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Briefcase size={24} /></div>
          <div><p className="text-xs text-gray-500 font-bold uppercase">Faculty Members</p><h4 className="text-2xl font-bold text-gray-800">28</h4></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><AlertCircle size={24} /></div>
          <div><p className="text-xs text-gray-500 font-bold uppercase">Pending Actions</p><h4 className="text-2xl font-bold text-gray-800">5</h4></div>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
        <h4 className="font-bold text-blue-800 mb-2">Welcome, Head of Department</h4>
        <p className="text-sm text-gray-600">You are managing the <span className="font-bold">Computer Application Department</span>. Use the sidebar to manage faculty, students, and mentorship programs.</p>
      </div>
    </div>
  );

  const HODFacultyView = () => (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Briefcase className="text-blue-600" /> Faculty Management</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Designation</th><th className="px-6 py-4">Mobile</th><th className="px-6 py-4">Email</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 'CAFAC101', name: 'Siddharth Sharma', desig: 'Professor', mob: '9876543210', email: 'siddharth@tulas.edu.in' },
              { id: 'FAC002', name: 'Mr. Verma', desig: 'Asst. Professor', mob: '9123456780', email: 'verma@tulas.edu.in' },
              { id: 'FAC003', name: 'Ms. Gupta', desig: 'Lecturer', mob: '9988776655', email: 'gupta@tulas.edu.in' }
            ].map((fac, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs">{fac.id}</td>
                <td className="px-6 py-4 font-bold text-gray-800">{fac.name}</td>
                <td className="px-6 py-4">{fac.desig}</td>
                <td className="px-6 py-4">{fac.mob}</td>
                <td className="px-6 py-4 text-blue-600">{fac.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const HODStudentRecords = () => (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Users className="text-blue-600" /> Student Records</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b flex gap-4">
          <input type="text" placeholder="Search by Name or ID..." className="border p-2 rounded-lg text-sm w-64 outline-none focus:ring-2 focus:ring-blue-100" />
          <select className="border p-2 rounded-lg text-sm"><option>All Years</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Year</th><th className="px-6 py-4">Contact</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: '2023012039', name: 'Priyanshu Bisht', year: '3rd', contact: '9876543210' },
              { id: 'STU002', name: 'Rahul Kumar', year: '2nd', contact: '9123456789' },
              { id: 'STU003', name: 'Priya Singh', year: '4th', contact: '9988776655' }
            ].map((stu, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs">{stu.id}</td>
                <td className="px-6 py-4 font-bold text-gray-800">{stu.name}</td>
                <td className="px-6 py-4">{stu.year} Year</td>
                <td className="px-6 py-4">{stu.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const HODMentorAssignment = () => {
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    const toggleStudent = (id) => {
      setSelectedStudents(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><UserPlus className="text-blue-600" /> Mentor Assignment</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h4 className="font-bold text-gray-700 mb-4">1. Select Faculty</h4>
            <select className="w-full border p-3 rounded-lg text-sm mb-4" value={selectedFaculty} onChange={e => setSelectedFaculty(e.target.value)}>
              <option value="">Choose Faculty Mentor...</option>
              <option value="CAFAC101">Siddharth Sharma</option>
              <option value="FAC002">Mr. Verma</option>
              <option value="FAC003">Ms. Gupta</option>
            </select>
            <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800">
              Selected: <b>{selectedFaculty || 'None'}</b><br />
              Students to Assign: <b>{selectedStudents.length}</b>
            </div>
            <button disabled={!selectedFaculty || selectedStudents.length === 0} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors" onClick={() => { setNotification({ type: 'success', message: 'Mentorship Group Created!' }); setSelectedStudents([]); setSelectedFaculty(''); }}>Assign Mentorship</button>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">2. Select Students (Unassigned)</div>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 border-b text-xs uppercase">
                  <tr><th className="px-4 py-3 w-10"><input type="checkbox" /></th><th className="px-4 py-3">ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Year</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {['2023012039', 'STU002', 'STU003', 'STU004', 'STU005'].map((id, i) => (
                    <tr key={id} className={`hover:bg-gray-50 cursor-pointer ${selectedStudents.includes(id) ? 'bg-blue-50' : ''}`} onClick={() => toggleStudent(id)}>
                      <td className="px-4 py-3 text-center"><input type="checkbox" checked={selectedStudents.includes(id)} readOnly /></td>
                      <td className="px-4 py-3 font-mono text-xs">{id}</td>
                      <td className="px-4 py-3 font-medium">{i === 0 ? 'Priyanshu Bisht' : `Student Name ${i + 1}`}</td>
                      <td className="px-4 py-3">{['3rd', '2nd', '3rd', '4th'][i % 4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HODAnnouncements = () => {
    const [notices, setNotices] = useState([
      { id: 1, target: 'Faculty', msg: 'Department meeting at 2 PM.', date: '2025-02-15' },
      { id: 2, target: 'Students', msg: 'Submit project synopsis by Friday.', date: '2025-02-14' }
    ]);
    const [newNotice, setNewNotice] = useState({ target: 'Both', msg: '' });

    const postNotice = () => {
      if (!newNotice.msg) return;
      setNotices([{ id: Date.now(), ...newNotice, date: new Date().toISOString().split('T')[0] }, ...notices]);
      setNewNotice({ target: 'Both', msg: '' });
      setNotification({ type: 'success', message: 'Announcement Posted!' });
    };

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Megaphone className="text-blue-600" /> Announcements</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 h-fit shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4">Create Notice</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Target Audience</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm" value={newNotice.target} onChange={e => setNewNotice({ ...newNotice, target: e.target.value })}>
                  <option>Both</option><option>Faculty Only</option><option>Students Only</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea className="w-full border p-2 rounded-lg mt-1 text-sm" rows="4" value={newNotice.msg} onChange={e => setNewNotice({ ...newNotice, msg: e.target.value })} placeholder="Type announcement..."></textarea>
              </div>
              <button onClick={postNotice} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Post Announcement</button>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {notices.map(n => (
              <div key={n.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${n.target === 'Faculty' ? 'bg-purple-100 text-purple-700' : n.target === 'Students' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{n.target}</span>
                  <p className="mt-2 text-gray-800 font-medium">{n.msg}</p>
                </div>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const [newRegControl, setNewRegControl] = useState({ course: '', year: '1st Year', semester: 'Semester 1' });
  const HODRegistrationControl = () => {
    const myDept = currentUser?.department || 'Department of Computer Application';
    const myCourses = INSTITUTE_ACADEMIC_DATA[myDept] || [];

    useEffect(() => {
      if (!newRegControl.course && myCourses.length > 0) {
        setNewRegControl(prev => ({ ...prev, course: myCourses[0] }));
      }
    }, [myCourses, newRegControl.course]);

    const activePortals = openRegistrations.filter(r => r.department === myDept);

    const handleOpenPortal = () => {
      if (!newRegControl.course) return;
      const newPortal = {
        id: Date.now(),
        department: myDept,
        ...newRegControl
      };
      setOpenRegistrations([...openRegistrations, newPortal]);
      setNotification({ type: 'success', message: `Registration Portal Opened for ${newRegControl.course}` });
    };

    const handleClosePortal = (id) => {
      setOpenRegistrations(openRegistrations.filter(r => r.id !== id));
      setNotification({ type: 'success', message: 'Registration Portal Closed.' });
    };

    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Sliders className="text-blue-600" /> Semester Registration Control</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h4 className="font-bold text-gray-700 mb-4">Open New Registration Portal</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Department (Locked)</label>
                <input type="text" readOnly value={myDept} className="w-full border p-2 rounded-lg mt-1 text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Course</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm focus:ring-2 outline-none" value={newRegControl.course} onChange={e => setNewRegControl({ ...newRegControl, course: e.target.value })}>
                  {myCourses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Academic Year</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm focus:ring-2 outline-none" value={newRegControl.year} onChange={e => setNewRegControl({ ...newRegControl, year: e.target.value })}>
                  <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Semester</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm focus:ring-2 outline-none" value={newRegControl.semester} onChange={e => setNewRegControl({ ...newRegControl, semester: e.target.value })}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s}>Semester {s}</option>)}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button onClick={handleOpenPortal} className="w-full bg-green-600 text-white font-bold rounded-lg py-2 hover:bg-green-700 transition-colors shadow">
                  Open Portal
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 flex justify-between items-center">
                Currently Open Portals
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{activePortals.length} Active</span>
              </div>
              <div className="p-4 space-y-3">
                {activePortals.map(portal => (
                  <div key={portal.id} className="border border-green-200 bg-green-50 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{portal.course}</h4>
                      <p className="text-xs text-gray-500">{portal.year} • {portal.semester}</p>
                    </div>
                    <button onClick={() => handleClosePortal(portal.id)} className="bg-red-50-500 text-white text-xs font-bold px-4 py-2 rounded shadow hover:bg-red-600 transition-colors">
                      Close Portal
                    </button>
                  </div>
                ))}
                {activePortals.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No registration portals are currently open.</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 flex justify-between items-center">
                Registered Students (Your Department)
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {semRegistrations.filter(r => r.department === myDept).length} Total
                </span>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white text-gray-500 border-b text-xs uppercase">
                    <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Date</th><th className="px-4 py-3 text-center">Docs</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {semRegistrations.filter(r => r.department === myDept).map((reg, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs">{reg.collegeId}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{reg.studentName}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{reg.course}</td>
                        <td className="px-4 py-3 text-gray-500">{reg.submissionDate}</td>
                        <td className="px-4 py-3 text-center"><button className="text-blue-600 hover:text-blue-800" title="View Digital Signature"><Paperclip size={16} className="mx-auto" /></button></td>
                      </tr>
                    ))}
                    {semRegistrations.filter(r => r.department === myDept).length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No students have registered for this semester yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StudentAttendanceView = () => {
    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><CalendarCheck className="text-blue-600" /> My Attendance</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Held</th>
                <th className="px-6 py-4">Attended</th>
                <th className="px-6 py-4">Percentage</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { sub: 'Computer Networks', held: 24, attended: 22, color: 'text-green-600' },
                { sub: 'Operating Systems', held: 20, attended: 15, color: 'text-yellow-600' },
                { sub: 'Database Management', held: 25, attended: 10, color: 'text-red-600' }
              ].map((row, i) => {
                const pct = Math.round((row.attended / row.held) * 100);
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{row.sub}</td>
                    <td className="px-6 py-4">{row.held}</td>
                    <td className="px-6 py-4">{row.attended}</td>
                    <td className={`px-6 py-4 font-bold ${row.color}`}>{pct}%</td>
                    <td className="px-6 py-4">
                      {pct >= 75 ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Eligible</span> : <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Debarred</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StudentCoursesView = () => {
    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><BookOpen className="text-blue-600" /> Courses & Subjects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Computer Networks', 'Operating Systems', 'Database Management', 'Software Engineering', 'Web Technology'].map((sub, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
              <button onClick={() => setNotification({ type: 'success', message: `Downloading syllabus for ${sub}...` })} className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Download Syllabus">
                <Download size={18} />
              </button>
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4"><BookOpen size={24} /></div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">{sub}</h4>
              <p className="text-xs text-gray-500 mb-4">Code: CS-{300 + i}</p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${60 + i * 5}%` }}></div>
              </div>
              <p className="text-xs text-right text-gray-500">{60 + i * 5}% Completed</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StudentAssignmentsView = () => {
    const [assignments, setAssignments] = useState([
      { id: 1, title: 'CN Lab Record', sub: 'Computer Networks', due: '20 Feb 2025', status: 'Pending', fileName: null },
      { id: 2, title: 'SQL Queries', sub: 'DBMS', due: '15 Feb 2025', status: 'Submitted', fileName: 'queries.sql' },
    ]);

    const handleUpload = (id, e) => {
      const file = e.target.files[0];
      if (file) {
        setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Submitted', fileName: file.name } : a));
        setNotification({ type: 'success', message: 'Assignment Uploaded Successfully!' });
      }
    };

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><FileText className="text-blue-600" /> Assignments</h3>
        <div className="space-y-4">
          {assignments.map((asn) => (
            <div key={asn.id} className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-bold text-gray-800">{asn.title}</h4>
                <p className="text-sm text-gray-500">{asn.sub} • Due: {asn.due}</p>
                {asn.fileName && <p className="text-xs text-blue-600 mt-1 flex items-center gap-1"><Paperclip size={12} /> {asn.fileName}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${asn.status === 'Submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{asn.status}</span>
                {asn.status === 'Pending' && (
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors">
                    <Upload size={16} /> Upload
                    <input type="file" className="hidden" onChange={(e) => handleUpload(asn.id, e)} />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StudentNoticesView = () => {
    const [notices] = useState([
      { id: 1, target: 'Students', msg: 'Submit project synopsis by Friday.', date: '2025-02-14', author: 'Department HOD' },
      { id: 2, target: 'All Campus', msg: 'Holiday on Account of Holi. The institute will remain closed on 14th and 15th March.', date: '2025-03-10', author: 'System Admin' },
      { id: 3, target: 'Students', msg: 'Semester Registration portal is now open for BCA 6th Sem.', date: '2025-02-20', author: 'Department HOD' }
    ]);
    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Bell className="text-blue-600" /> Notices & Announcements</h3>
        <div className="space-y-4">
          {notices.map(n => (
            <div key={n.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${n.target === 'All Campus' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{n.target}</span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
              <p className="text-gray-800 font-medium mb-3">{n.msg}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <User size={12} /> Posted by: {n.author}
              </div>
            </div>
          ))}
          {notices.length === 0 && <p className="text-gray-500">No new notices.</p>}
        </div>
      </div>
    );
  };

  const StudentSemesterRegistration = () => {
    const [regForm, setRegForm] = useState({
      studentName: '', collegeId: '', univRollNo: '', enrollmentNo: '',
      abcId: '', aadhaarNo: '', presentAddress: '', permanentAddress: '',
      motherPhone: '', fatherPhone: '', fatherEmail: '', motherEmail: '',
      studentEmail: '', studentMobile: '',
      sem1Cgpa: '', sem2Cgpa: '', sem3Cgpa: '', sem4Cgpa: '',
      sem5Cgpa: '', sem6Cgpa: '', sem7Cgpa: '', sem8Cgpa: '',
      hasBacklog: 'No', backlogSubjects: '', digitalSignature: null
    });

    useEffect(() => {
      if (currentUser && !regForm.studentName) {
        setRegForm(prev => ({
          ...prev,
          studentName: currentUser.name || '',
          collegeId: currentUser.username || ''
        }));
      }
    }, [currentUser, regForm.studentName]);

    const hasSubmitted = semRegistrations.some(reg => reg.collegeId === currentUser.username);
    const myDept = currentUser?.department;
    const myCourse = currentUser?.course;
    const activePortal = openRegistrations.find(r => r.department === myDept && r.course === myCourse);

    const handleRegChange = (e) => {
      const { name, value } = e.target;
      if (name === 'aadhaarNo' && value && !/^\d{0,12}$/.test(value)) return;
      if (['motherPhone', 'fatherPhone', 'studentMobile'].includes(name) && value && !/^\d{0,10}$/.test(value)) return;
      setRegForm({ ...regForm, [name]: value });
    };

    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setRegForm({ ...regForm, digitalSignature: e.target.files[0] });
      }
    }

    const handleRegSubmit = (e) => {
      e.preventDefault();
      if (regForm.aadhaarNo.length !== 12) {
        setNotification({ type: 'error', message: 'Aadhaar must be exactly 12 digits.' });
        return;
      }
      if (regForm.motherPhone.length !== 10 || regForm.fatherPhone.length !== 10 || regForm.studentMobile.length !== 10) {
        setNotification({ type: 'error', message: 'Phone numbers must be exactly 10 digits.' });
        return;
      }

      const newSubmission = {
        ...regForm,
        department: myDept,
        course: myCourse,
        submissionDate: new Date().toISOString().split('T')[0]
      };

      setSemRegistrations([...semRegistrations, newSubmission]);
      setNotification({ type: 'success', message: 'Semester Registration Submitted Successfully!' });
    };

    if (!activePortal) {
      return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6 shadow-inner"><Lock size={48} /></div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Registration Closed</h2>
          <p className="text-gray-500 max-w-md mx-auto">The semester registration portal is currently not active for your specific course (<b>{myCourse || 'Unknown Course'}</b>). Please wait for an announcement from your HOD.</p>
        </div>
      );
    }

    if (hasSubmitted) {
      return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner"><CheckCircle2 size={48} /></div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Registration Submitted</h2>
          <p className="text-gray-500 max-w-md mx-auto">You have successfully submitted your semester registration. The administration is currently reviewing your details.</p>
          <button onClick={() => setNotification({ type: 'success', message: 'PDF Download Started!' })} className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 flex items-center gap-2"><Download size={18} /> Download Receipt</button>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl flex items-start gap-3">
          <Info size={20} className="mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Semester Registration Open</h4>
            <p className="text-xs mt-1">Registration is open for <b>{activePortal.department}</b> - <b>{activePortal.course}</b>. Please ensure all details are accurate before submitting.</p>
          </div>
        </div>

        <form onSubmit={handleRegSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><ClipboardList className="text-blue-600" /> Registration Form</h3>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Academic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-600">Student Name</label><input type="text" name="studentName" value={regForm.studentName} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">College Student ID</label><input type="text" name="collegeId" value={regForm.collegeId} onChange={handleRegChange} required readOnly className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed" /></div>
                <div><label className="text-xs font-bold text-gray-600">University Roll Number</label><input type="text" name="univRollNo" value={regForm.univRollNo} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Enrollment Number</label><input type="text" name="enrollmentNo" value={regForm.enrollmentNo} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Identity & Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-600">ABC ID</label><input type="text" name="abcId" value={regForm.abcId} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Aadhaar Number (12 digits)</label><input type="text" name="aadhaarNo" value={regForm.aadhaarNo} onChange={handleRegChange} required placeholder="000000000000" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100 tracking-widest font-mono" /></div>
                <div className="md:col-span-2"><label className="text-xs font-bold text-gray-600">Present Address</label><textarea name="presentAddress" value={regForm.presentAddress} onChange={handleRegChange} required rows="2" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100"></textarea></div>
                <div className="md:col-span-2"><label className="text-xs font-bold text-gray-600">Permanent Address</label><textarea name="permanentAddress" value={regForm.permanentAddress} onChange={handleRegChange} required rows="2" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100"></textarea></div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Academic Performance & Backlogs</h4>
              <p className="text-xs text-gray-500 mb-3">Enter your previous semester CGPA or Percentage. If not applicable, enter "NA".</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <div key={sem}>
                    <label className="text-xs font-bold text-gray-600">Semester {sem}</label>
                    <input type="text" name={`sem${sem}Cgpa`} value={regForm[`sem${sem}Cgpa`]} onChange={handleRegChange} required placeholder="e.g. 8.5 or NA" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600">Do you have any active backlogs?</label>
                  <select name="hasBacklog" value={regForm.hasBacklog} onChange={handleRegChange} className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                {regForm.hasBacklog === 'Yes' && (
                  <div>
                    <label className="text-xs font-bold text-gray-600">Subject Code(s) of Backlog Subjects</label>
                    <input type="text" name="backlogSubjects" value={regForm.backlogSubjects} onChange={handleRegChange} required placeholder="e.g. CS301, CS305" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-600">Student Mobile Number</label><input type="tel" name="studentMobile" value={regForm.studentMobile} onChange={handleRegChange} required placeholder="10 digits" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Student Email ID</label><input type="email" name="studentEmail" value={regForm.studentEmail} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Father's Phone Number</label><input type="tel" name="fatherPhone" value={regForm.fatherPhone} onChange={handleRegChange} required placeholder="10 digits" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Father's Email ID</label><input type="email" name="fatherEmail" value={regForm.fatherEmail} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Mother's Phone Number</label><input type="tel" name="motherPhone" value={regForm.motherPhone} onChange={handleRegChange} required placeholder="10 digits" className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div><label className="text-xs font-bold text-gray-600">Mother's Email ID</label><input type="email" name="motherEmail" value={regForm.motherEmail} onChange={handleRegChange} required className="w-full mt-1 border p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100" /></div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Verification</h4>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-2">Digital Signature Upload (Max 2MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
                  <input type="file" required accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-sm font-medium text-blue-600">Click or drag file to upload</p>
                  <p className="text-xs text-gray-500 mt-1">{regForm.digitalSignature ? regForm.digitalSignature.name : 'PNG, JPG or JPEG'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={() => handleTabChange('home')} className="px-6 py-2.5 text-gray-600 font-bold text-sm">Cancel</button>
            <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-md hover:bg-blue-700 transition-colors">Submit Registration</button>
          </div>
        </form>
      </div>
    );
  };

  const FacultyAssignmentsView = () => {
    const [activeView, setActiveView] = useState('list');
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const myClasses = [
      { id: 'C001', name: 'BCA - 6th Sem - Sec A', subject: 'Computer Networks' },
      { id: 'C002', name: 'B.Tech CSE - 2nd Year - Sec B', subject: 'Database Management' },
      { id: 'C003', name: 'BCA - 3rd Year - Sec A', subject: 'Cloud Computing' }
    ];

    const [assignments, setAssignments] = useState([
      { id: 1, title: 'Unit 1 Analysis', classId: 'C001', className: 'BCA - 6th Sem - Sec A', subject: 'Computer Networks', dueDate: '2025-02-20', description: 'Analyze the packet flow.', comments: 'Strict deadline.' }
    ]);

    const [submissions, setSubmissions] = useState([
      { id: 101, assignmentId: 1, studentName: 'Rahul Kumar', studentId: 'STU002', file: 'network_analysis.pdf', status: 'Submitted', checked: false },
      { id: 102, assignmentId: 1, studentName: 'Priya Singh', studentId: 'STU003', file: 'analysis_final.pdf', status: 'Submitted', checked: true }
    ]);

    const [form, setForm] = useState({ classId: '', title: '', description: '', dueDate: '', comments: '' });

    const handleCreate = (e) => {
      e.preventDefault();
      const selectedClass = myClasses.find(c => c.id === form.classId);
      const newAssignment = {
        id: Date.now(),
        ...form,
        className: selectedClass.name,
        subject: selectedClass.subject
      };
      setAssignments([newAssignment, ...assignments]);
      setForm({ classId: '', title: '', description: '', dueDate: '', comments: '' });
      setActiveView('list');
      setNotification({ type: 'success', message: 'Assignment Created Successfully!' });
    };

    const toggleCheck = (subId) => {
      setSubmissions(submissions.map(s => s.id === subId ? { ...s, checked: !s.checked } : s));
    };

    if (activeView === 'create') {
      return (
        <div className="p-6">
          <button onClick={() => setActiveView('list')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-medium"><ArrowLeft size={18} /> Back to List</button>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><Plus size={18} /> Create New Assignment</h4>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Select Class & Subject</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm" value={form.classId} onChange={e => setForm({ ...form, classId: e.target.value })} required>
                  <option value="">Select Class</option>
                  <option value="C001">BCA - 6th Sem - Sec A - Computer Networks</option>
                  <option value="C002">B.Tech CSE - 2nd Year - Sec B - Database Management</option>
                  <option value="C003">BCA - 3rd Year - Sec A - Cloud Computing</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                <input type="text" className="w-full border p-2 rounded-lg mt-1 text-sm" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Due Date</label>
                  <input type="date" className="w-full border p-2 rounded-lg mt-1 text-sm" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Attachment</label>
                  <input type="file" className="w-full border p-2 rounded-lg mt-1 text-xs" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea className="w-full border p-2 rounded-lg mt-1 text-sm" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Additional Comments</label>
                <textarea className="w-full border p-2 rounded-lg mt-1 text-sm" rows="2" value={form.comments} onChange={e => setForm({ ...form, comments: e.target.value })}></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Publish Assignment</button>
            </form>
          </div>
        </div>
      );
    }

    if (activeView === 'submissions' && selectedAssignment) {
      const currentSubs = submissions.filter(s => s.assignmentId === selectedAssignment.id);
      return (
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <button onClick={() => { setActiveView('list'); setSelectedAssignment(null); }} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium"><ArrowLeft size={18} /> Back to Assignments</button>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">{selectedAssignment.title}</h2>
              <p className="text-sm text-gray-500">{selectedAssignment.className}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b font-bold text-gray-700 flex justify-between">
              <span>Student Submissions</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Total: {currentSubs.length}</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 border-b text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Student ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">File</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-gray-600">{sub.studentId}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{sub.studentName}</td>
                    <td className="px-6 py-4 text-blue-600 flex items-center gap-1 cursor-pointer hover:underline"><Paperclip size={14} /> {sub.file}</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{sub.status}</span></td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleCheck(sub.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-colors mx-auto ${sub.checked ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {sub.checked ? <CheckSquare size={14} /> : <div className="w-3.5 h-3.5 border-2 border-gray-400 rounded-sm"></div>}
                        {sub.checked ? 'Checked' : 'Mark Check'}
                      </button>
                    </td>
                  </tr>
                ))}
                {currentSubs.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-gray-400">No submissions yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><FileText className="text-blue-600" /> Assignment Management</h3>
          <button onClick={() => setActiveView('create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center text-sm font-bold shadow hover:bg-blue-700 transition-colors"><Plus size={18} /> Create Assignment</button>
        </div>

        <div className="grid gap-4">
          {assignments.map(assign => (
            <div key={assign.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
              <div>
                <h4 className="font-bold text-lg text-gray-800">{assign.title}</h4>
                <p className="text-sm font-semibold text-blue-600">{assign.subject}</p>
                <p className="text-xs text-gray-500 mt-1">{assign.className} • Due: {assign.dueDate}</p>
                <p className="text-xs text-gray-400 mt-2 italic line-clamp-1">{assign.description}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setSelectedAssignment(assign); setActiveView('submissions'); }} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 border border-blue-100 flex items-center gap-2">View Submissions <ArrowRight size={16} /></button>
              </div>
            </div>
          ))}
          {assignments.length === 0 && <div className="text-center py-10 text-gray-400">No assignments created yet.</div>}
        </div>
      </div>
    );
  };

  const StudentExamsView = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><GraduationCap className="text-blue-600" /> Examinations</h3>
          <button onClick={() => setNotification({ type: 'success', message: 'Admit Card Download Started' })} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700"><Download size={16} /> Admit Card</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b font-bold text-gray-700">Upcoming Schedule</div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Time</th><th className="px-6 py-4">Subject</th><th className="px-6 py-4">Room</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-6 py-4">10 Mar 2025</td><td className="px-6 py-4">10:00 AM</td><td className="px-6 py-4">Computer Networks</td><td className="px-6 py-4">NB-201</td></tr>
              <tr><td className="px-6 py-4">12 Mar 2025</td><td className="px-6 py-4">10:00 AM</td><td className="px-6 py-4">DBMS</td><td className="px-6 py-4">NB-204</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const StudentGrievanceView = () => {
    const [grievances, setGrievances] = useState([
      {
        id: 'GRV001',
        type: 'Academic',
        subject: 'Incorrect Internal Marks',
        details: 'My internal marks for DBMS are shown as 0 despite submission.',
        date: '2025-02-01',
        status: 'Resolved',
        comments: [
          { author: 'Admin', text: 'Checked with faculty. Updated to 18/20.', date: '2025-02-03' }
        ]
      },
      {
        id: 'GRV002',
        type: 'Non-Academic',
        subject: 'Hostel WiFi Issue',
        details: 'WiFi in Room 304 is not connecting.',
        date: '2025-02-10',
        status: 'Pending',
        comments: []
      }
    ]);

    const [form, setForm] = useState({ type: 'Academic', subject: '', details: '', attachment: null });
    const [viewingId, setViewingId] = useState(null);
    const [replyText, setReplyText] = useState('');

    const activeGrievance = grievances.find(g => g.id === viewingId);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newGrievance = {
        id: `GRV${String(grievances.length + 1).padStart(3, '0')}`,
        ...form,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        comments: []
      };
      setGrievances([newGrievance, ...grievances]);
      setForm({ type: 'Academic', subject: '', details: '', attachment: null });
      setNotification({ type: 'success', message: 'Grievance Submitted Successfully!' });
    };

    const handleReply = () => {
      if (!replyText) return;
      const updatedList = grievances.map(g => {
        if (g.id === viewingId) {
          return {
            ...g,
            comments: [...g.comments, { author: 'Student', text: replyText, date: new Date().toISOString().split('T')[0] }]
          };
        }
        return g;
      });
      setGrievances(updatedList);
      setReplyText('');
    };

    const resolved = grievances.filter(g => g.status === 'Resolved').length;
    const pending = grievances.filter(g => g.status !== 'Resolved').length;

    if (viewingId && activeGrievance) {
      return (
        <div className="p-6">
          <button onClick={() => setViewingId(null)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-medium"><ArrowLeft size={18} /> Back to List</button>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{activeGrievance.subject}</h2>
                <div className="flex gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Info size={14} /> {activeGrievance.id}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {activeGrievance.date}</span>
                  <span className="flex items-center gap-1"><Building2 size={14} /> {activeGrievance.type}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${activeGrievance.status === 'Resolved' ? 'bg-green-100 text-green-700' : activeGrievance.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{activeGrievance.status}</span>
            </div>

            <div className="p-6 border-b border-gray-100">
              <h4 className="font-bold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{activeGrievance.details}</p>
              {activeGrievance.attachment && <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium"><Paperclip size={16} /> Attachment Uploaded</div>}
            </div>

            <div className="p-6 bg-gray-50">
              <h4 className="font-bold text-gray-700 mb-4">Discussion History</h4>
              <div className="space-y-4 mb-6">
                {activeGrievance.comments.length > 0 ? activeGrievance.comments.map((c, i) => (
                  <div key={i} className={`flex flex-col ${c.author === 'Student' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${c.author === 'Student' ? 'bg-blue-100 text-blue-900 rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                      <p className="font-bold text-xs mb-1 opacity-70">{c.author} • {c.date}</p>
                      <p>{c.text}</p>
                    </div>
                  </div>
                )) : <p className="text-center text-gray-400 text-sm italic">No comments yet.</p>}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 border p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply..."
                />
                <button onClick={handleReply} className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><AlertTriangle className="text-blue-600" /> Grievance Redressal</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><FileText size={24} /></div>
            <div><p className="text-gray-500 text-xs font-bold uppercase">Total</p><h4 className="text-2xl font-bold">{grievances.length}</h4></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={24} /></div>
            <div><p className="text-gray-500 text-xs font-bold uppercase">Resolved</p><h4 className="text-2xl font-bold text-green-600">{resolved}</h4></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center"><Clock size={24} /></div>
            <div><p className="text-gray-500 text-xs font-bold uppercase">Pending</p><h4 className="text-2xl font-bold text-yellow-600">{pending}</h4></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 h-fit shadow-sm">
            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Plus size={18} /> New Grievance</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                <select className="w-full border p-2 rounded-lg mt-1 text-sm" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Academic</option>
                  <option>Non-Academic</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                <input type="text" required className="w-full border p-2 rounded-lg mt-1 text-sm" placeholder="Brief subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Details</label>
                <textarea required className="w-full border p-2 rounded-lg mt-1 text-sm" rows="4" placeholder="Explain the issue..." value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Attachment (Optional)</label>
                <input type="file" className="w-full border p-2 rounded-lg mt-1 text-xs" onChange={e => setForm({ ...form, attachment: e.target.files[0] })} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Submit Grievance</button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">My Grievances</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 border-b">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {grievances.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{g.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{g.subject} <span className="block text-xs text-gray-400 font-normal">{g.type}</span></td>
                      <td className="px-4 py-3 text-gray-500">{g.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${g.status === 'Resolved' ? 'bg-green-100 text-green-700' : g.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{g.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setViewingId(g.id)} className="text-blue-600 hover:underline text-xs font-bold">View / Reply</button>
                      </td>
                    </tr>
                  ))}
                  {grievances.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-400">No grievances found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FacultyClassMgmtView = () => {
    const [classes] = useState([
      { id: 'C001', name: 'BCA - 6th Sem', section: 'A', subject: 'Computer Networks', students: 58 },
      { id: 'C002', name: 'B.Tech CSE - 2nd Year', section: 'B', subject: 'Database Management', students: 62 },
      { id: 'C003', name: 'BCA - 3rd Year', section: 'A', subject: 'Cloud Computing', students: 45 }
    ]);

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Users className="text-blue-600" /> Class Management</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all text-left group">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><School size={20} /></div>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Sec {cls.section}</span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">{cls.name}</h4>
              <p className="text-sm font-medium text-blue-600 mb-4">{cls.subject}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users size={16} />
                  <span className="text-xs font-bold">{cls.students} Students</span>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">Manage Roster</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h4 className="font-bold text-gray-700">Quick Search Roster</h4>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search student ID..." className="pl-9 pr-3 py-2 border rounded-lg text-xs w-64 outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={32} /></div>
            <p className="text-gray-500 text-sm">Select a class card above to load the student list.</p>
          </div>
        </div>
      </div>
    );
  };

  const PlacementView = () => {
    const [jobs, setJobs] = useState([
      { id: 1, company: "TCS", role: "System Engineer", ctc: "7 LPA", deadline: "2025-02-20", jd: "Knowledge of Java, SQL." },
      { id: 2, company: "Amazon", role: "SDE I", ctc: "18 LPA", deadline: "2025-03-01", jd: "DSA & System Design." },
      { id: 3, company: "Wipro", role: "Project Engineer", ctc: "4.5 LPA", deadline: "2025-02-25", jd: "Basic Aptitude." }
    ]);
    const [applied, setApplied] = useState([]);

    const handleApply = (id) => {
      setApplied([...applied, id]);
      setNotification({ type: 'success', message: 'Applied Successfully!' });
    };

    return (
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Openings</h3>
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job.id} className="border border-gray-200 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center bg-white hover:shadow-md">
              <div className="mb-4 md:mb-0">
                <h4 className="font-bold text-lg text-gray-900">{job.company}</h4>
                <p className="text-sm font-semibold text-blue-600">{job.role}</p>
                <div className="flex gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><CreditCard size={12} /> {job.ctc}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {job.deadline}</span>
                </div>
                <p className="text-sm mt-3 text-gray-700 bg-gray-50 p-2 rounded italic">{job.jd}</p>
              </div>
              <button
                disabled={applied.includes(job.id)}
                onClick={() => handleApply(job.id)}
                className={`px-6 py-2 rounded-lg text-sm font-bold ${applied.includes(job.id) ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {applied.includes(job.id) ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FeesView = () => {
    const [transactions, setTransactions] = useState([
      { id: "TXN12345678", date: "2024-08-15", amount: "45000", type: "Semester 1 Fee", status: "Success" },
      { id: "TXN98765432", date: "2025-01-10", amount: "35000", type: "Hostel Fee", status: "Success" }
    ]);

    const [upiModal, setUpiModal] = useState(false);
    const [qrGenerated, setQrGenerated] = useState(false);
    const [timer, setTimer] = useState(240); // 4 minutes
    const [utr, setUtr] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({ type: '', amount: 0, upiId: '' });

    useEffect(() => {
      let interval;
      if (upiModal && qrGenerated && timer > 0) {
        interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      } else if (timer === 0 && upiModal && qrGenerated) {
        setUpiModal(false);
        setNotification({ type: 'error', message: 'Payment time expired.' });
      }
      return () => clearInterval(interval);
    }, [upiModal, qrGenerated, timer]);

    const openUpiPayment = (type, amount, upiId) => {
      setPaymentDetails({ type, amount, upiId });
      setUtr('');
      setTimer(240);
      setQrGenerated(false);
      setUpiModal(true);
    };

    const submitUtr = () => {
      if (utr.length !== 12 || isNaN(utr)) {
        setNotification({ type: 'error', message: 'Enter a valid 12-digit UTR number.' });
        return;
      }

      const newTxn = {
        id: utr,
        date: new Date().toISOString().split('T')[0],
        amount: paymentDetails.amount.toString(),
        type: paymentDetails.type,
        status: "Pending Verification"
      };

      setTransactions([newTxn, ...transactions]);
      setUpiModal(false);
      setNotification({ type: 'success', message: 'UTR Submitted! Receipt available after Admin Verification.' });
    };

    const handleDownloadReceipt = (txn) => {
      const receiptWindow = window.open('', '_blank');
      receiptWindow.document.write(`
          <html>
            <head><title>Fee Receipt - ${txn.id}</title></head>
            <body style="font-family: Arial; padding: 40px; border: 1px solid #ddd; max-width: 800px; margin: auto;">
              <div style="text-align: center; border-bottom: 2px solid #d32f2f; padding-bottom: 20px; margin-bottom: 20px;">
                <h1 style="color: #d32f2f;">Tula's Institute</h1>
                <h3>FEE PAYMENT RECEIPT</h3>
              </div>
              <p><b>Receipt No:</b> ${txn.id}</p>
              <p><b>Student:</b> ${currentUser.name} (${currentUser.username})</p>
              <p><b>Date:</b> ${txn.date}</p>
              <hr/>
              <p><b>Description:</b> ${txn.type}</p>
              <p><b>Amount:</b> ₹${txn.amount}</p>
              <p><b>Status:</b> Success</p>
              <br/><br/>
              <p style="text-align: center; font-size: 12px; color: #777;">Computer Generated Receipt</p>
              <script>window.print();</script>
            </body>
          </html>
        `);
      receiptWindow.document.close();
    };

    const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const upiUrl = `upi://pay?pa=${paymentDetails.upiId}&pn=Tulas+Institute&am=${paymentDetails.amount}&cu=INR`;

    return (
      <div className="p-6 space-y-8 relative">
        {upiModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative animate-in zoom-in-95">
              <button onClick={() => setUpiModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={20} /></button>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-1">Pay via UPI</h3>

              {!qrGenerated ? (
                <div className="space-y-4 mt-6">
                  <p className="text-center text-sm font-bold text-gray-600 mb-2">{paymentDetails.type}</p>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 text-center">Enter Amount (₹)</label>
                    <input
                      type="number"
                      value={paymentDetails.amount || ''}
                      onChange={e => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl text-center font-bold text-xl text-blue-700 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                      placeholder="Enter amount"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (paymentDetails.amount > 0) setQrGenerated(true);
                      else setNotification({ type: 'error', message: 'Please enter a valid amount.' });
                    }}
                    className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md mt-4"
                  >
                    Generate QR Code
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-center text-sm font-bold text-blue-600 mb-6">{paymentDetails.type} - ₹{paymentDetails.amount}</p>

                  <div className="flex justify-center mb-6">
                    <div className="border-4 border-blue-50 p-2 rounded-2xl bg-white shadow-sm relative inline-block">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}&ecc=H`} alt="UPI QR Code" className="w-48 h-48 rounded-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center border border-gray-100">
                          <img src="https://tulas.edu.in/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Scan with any UPI App</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{paymentDetails.upiId}</p>
                    <div className="mt-2 text-red-600 font-mono font-bold text-lg flex justify-center items-center gap-1.5">
                      <Clock size={16} className="-mt-0.5" /> {formatTime(timer)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Enter 12-Digit UTR / Ref No.</label>
                      <input type="text" maxLength={12} value={utr} onChange={e => setUtr(e.target.value.replace(/\D/g, ''))} className="w-full border-2 border-gray-200 p-3 rounded-xl text-center font-mono font-bold tracking-[0.2em] focus:border-blue-500 focus:ring-0 outline-none transition-colors" placeholder="000000000000" />
                    </div>
                    <button onClick={submitUtr} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md flex justify-center items-center gap-2">
                      <CheckCircle2 size={18} /> Submit UTR for Verification
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><CreditCard className="text-blue-600" /> Fee & Payments</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><CreditCard size={20} className="text-blue-600" /> Direct UPI Payment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-700 border-b pb-2">Academic Fee</h5>
              <div className="flex flex-col gap-3">
                <button onClick={() => openUpiPayment('Academic Fee', 45000, '9917000677m6@pnb')} className="flex justify-between px-5 py-4 bg-white border-2 border-blue-100 rounded-xl text-blue-700 hover:bg-blue-50 hover:border-blue-200 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay Academic Fee<span className="block text-xs font-normal text-gray-500 mt-0.5">Amount: ₹45,000</span></span>
                  <div className="flex items-center gap-3"><span className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 bg-blue-600 text-white rounded-md shadow-sm">Scan QR</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></div>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-700 border-b pb-2">Hostel Fee</h5>
              <div className="flex flex-col gap-3">
                <button onClick={() => openUpiPayment('Hostel Fee', 35000, '9917000677m2@pnb')} className="flex justify-between px-5 py-4 bg-white border-2 border-green-100 rounded-xl text-green-700 hover:bg-green-50 hover:border-green-200 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay Hostel Fee<span className="block text-xs font-normal text-gray-500 mt-0.5">Amount: ₹35,000</span></span>
                  <div className="flex items-center gap-3"><span className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 bg-green-600 text-white rounded-md shadow-sm">Scan QR</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW RAZORPAY SECTION --- */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mt-6">
          <h4 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2"><CreditCard size={20} className="text-blue-600" /> Pay via Razorpay</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-semibold text-blue-800 border-b border-blue-200 pb-2">Academic Fee</h5>
              <div className="flex flex-col gap-3">
                <a href="https://pages.razorpay.com/pl_EemYzSuH4dRF2e/view" target="_blank" rel="noopener noreferrer" className="flex justify-between px-5 py-4 bg-white border-2 border-blue-100 rounded-xl text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay for Existing Student</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://pages.razorpay.com/pl_Eemb9cp24Dac8R/view" target="_blank" rel="noopener noreferrer" className="flex justify-between px-5 py-4 bg-white border-2 border-blue-100 rounded-xl text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay for New Student</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-semibold text-green-800 border-b border-green-200 pb-2">Hostel Fee</h5>
              <div className="flex flex-col gap-3">
                <a href="https://pages.razorpay.com/pl_Ef8FofNuC4SR5C/view" target="_blank" rel="noopener noreferrer" className="flex justify-between px-5 py-4 bg-white border-2 border-green-100 rounded-xl text-green-700 hover:bg-green-100 hover:border-green-300 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay for Existing Student</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://pages.razorpay.com/pl_EfCHelq0PvHmwp/view" target="_blank" rel="noopener noreferrer" className="flex justify-between px-5 py-4 bg-white border-2 border-green-100 rounded-xl text-green-700 hover:bg-green-100 hover:border-green-300 font-bold items-center shadow-sm transition-all group">
                  <span className="text-left">Pay for New Student</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden mt-6">
          <div className="p-6 border-b"><h4 className="font-bold text-gray-800 flex items-center gap-2"><ClipboardList size={20} /> History</h4></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase"><tr><th className="px-6 py-4">ID (UTR)</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Action</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((txn, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium">{txn.id}</td><td className="px-6 py-4">{txn.date}</td><td className="px-6 py-4">{txn.type}</td><td className="px-6 py-4">₹{txn.amount}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{txn.status}</span></td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDownloadReceipt(txn)} disabled={txn.status !== 'Success'} className={`flex gap-1 items-center font-medium ${txn.status === 'Success' ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 cursor-not-allowed'}`}>
                        <Download size={16} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Building2 size={20} className="text-blue-600" /> Academic Fee Bank Account</h4>
            <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Bank Name:</span> <span className="font-bold text-gray-800">PNB</span></div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Account Name:</span> <span className="font-bold text-gray-800">Rishabh Educational Trust</span></div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Account No:</span> <span className="font-mono font-bold text-blue-700">51881011000036</span></div>
              <div className="flex justify-between items-center pt-1"><span>IFSC Code:</span> <span className="font-mono font-bold text-gray-800">PUNB0518810</span></div>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Building2 size={20} className="text-green-600" /> Hostel Fee Bank Account</h4>
            <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Bank Name:</span> <span className="font-bold text-gray-800">PNB</span></div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Account Name:</span> <span className="font-bold text-gray-800">Rishabh Educational Trust</span></div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span>Account No:</span> <span className="font-mono font-bold text-green-700">1175002100007996</span></div>
              <div className="flex justify-between items-center pt-1"><span>IFSC Code:</span> <span className="font-mono font-bold text-gray-800">PUNB0117500</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileView = () => {
    const [profile, setProfile] = useState({
      fullName: currentUser.name || "Priyanshu Bisht",
      idNumber: currentUser.username || "2023012039",
      dob: "2003-08-15", gender: "Male", department: "Department of Computer Application", course: "BCA",
      email: "priyanshu.2023012039@tulas.edu.in", mobile: "9876543210", fatherName: "Mr. Parent", motherName: "Mrs. Parent",
      address: "123, Hostel Block A, Tula's Institute, Dehradun", profileImage: currentUser.profileImage || null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profile);

    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });
    const handleImageUpdate = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setEditForm({ ...editForm, profileImage: reader.result });
        reader.readAsDataURL(file);
      }
    };

    const saveProfile = () => {
      setProfile(editForm);
      if (editForm.profileImage !== currentUser.profileImage) setCurrentUser(prev => ({ ...prev, profileImage: editForm.profileImage }));
      setIsEditing(false);
      setNotification({ type: 'success', message: 'Profile Updated!' });
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><User className="text-blue-600" /> My Profile</h3>
          {!isEditing && <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center text-sm"><Edit2 size={16} /> Edit</button>}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative group">
              {isEditing ? (
                <><img src={editForm.profileImage || ""} alt="Profile" className="w-full h-full object-cover" /><label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer text-white"><Upload size={16} /><input type="file" className="hidden" onChange={handleImageUpdate} /></label></>
              ) : (
                <img src={profile.profileImage || ""} alt="Profile" className="w-full h-full object-cover" />
              )}
              {!profile.profileImage && !editForm.profileImage && <div className="absolute inset-0 flex items-center justify-center"><User size={64} className="text-gray-400" /></div>}
            </div>
            <h2 className="mt-4 text-xl font-bold">{profile.fullName}</h2>
            <p className="text-gray-500">{profile.idNumber}</p>
          </div>

          <div className="w-full lg:w-2/3 bg-white border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2"><h4 className="font-bold text-gray-500 uppercase border-b pb-2 mb-4">Academic</h4><p><span className="text-xs text-gray-500 block">Department</span>{profile.department}</p></div>
              <div className="md:col-span-2"><h4 className="font-bold text-gray-500 uppercase border-b pb-2 mb-4">Personal</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-500 block">DOB</label>{profile.dob}</div>
                  <div><label className="text-xs text-gray-500 block">Gender</label>{profile.gender}</div>
                  <div><label className="text-xs text-gray-500 block">Father</label>{profile.fatherName}</div>
                  <div><label className="text-xs text-gray-500 block">Mother</label>{profile.motherName}</div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Mobile {isEditing && <span className="text-blue-600">(Edit)</span>}</label>
                    {isEditing ? <input type="tel" name="mobile" value={editForm.mobile} onChange={handleEditChange} className="border p-1 rounded w-full" /> : profile.mobile}
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 block mb-1">Address {isEditing && <span className="text-blue-600">(Edit)</span>}</label>
                    {isEditing ? <textarea name="address" value={editForm.address} onChange={handleEditChange} className="border p-1 rounded w-full" rows="2" /> : profile.address}
                  </div>
                </div>
              </div>
            </div>
            {isEditing && <div className="mt-6 flex justify-end gap-3 border-t pt-4"><button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600">Cancel</button><button onClick={saveProfile} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button></div>}
          </div>
        </div>
      </div>
    );
  };

  const AdminOverviewView = () => {
    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><LayoutDashboard className="text-blue-600" /> System Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><GraduationCap size={28} /></div>
            <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total Students</p><h4 className="text-3xl font-extrabold text-gray-800">3,450</h4></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"><Briefcase size={28} /></div>
            <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total Faculty</p><h4 className="text-3xl font-extrabold text-gray-800">210</h4></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><BookOpen size={28} /></div>
            <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total Courses</p><h4 className="text-3xl font-extrabold text-gray-800">45</h4></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><Activity size={28} /></div>
            <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Active Today</p><h4 className="text-3xl font-extrabold text-gray-800">1,890</h4></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-96 overflow-y-auto">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Clock size={18} /> Recent Activities</h4>
            <div className="space-y-4">
              {[
                { time: '10 mins ago', msg: 'New student Priyanshu Bisht registered.', type: 'student' },
                { time: '1 hour ago', msg: 'Siddharth Sharma uploaded BCA attendance.', type: 'faculty' },
                { time: '3 hours ago', msg: 'Fee structure for 2026 Semester updated.', type: 'admin' },
                { time: '5 hours ago', msg: 'New exam schedule published by Dept Head.', type: 'exam' },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${act.type === 'student' ? 'bg-blue-500' : act.type === 'faculty' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                  <div>
                    <p className="text-sm text-gray-700">{act.msg}</p>
                    <span className="text-xs text-gray-400">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell size={18} /> Notifications & Alerts</h4>
            <div className="space-y-3">
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm">Database Backup Overdue</h5>
                  <p className="text-xs mt-1">The system hasn't been backed up in 3 days. Please run a manual backup from settings.</p>
                </div>
              </div>
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200 flex items-start gap-3">
                <Info size={20} className="mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm">Pending Student Approvals</h5>
                  <p className="text-xs mt-1">There are 15 new student registration requests awaiting admin approval.</p>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 flex items-start gap-3">
                <Calendar size={20} className="mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm">Upcoming Event</h5>
                  <p className="text-xs mt-1">Mid-term examinations start next week. Ensure all faculty have uploaded subject configurations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminRequestsView = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);
    const [rejectModal, setRejectModal] = useState({ show: false, id: null, reason: '' });
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
      fetchRequests();
    }, []);

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/admin/requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser?.token}`
          }
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setRequests(data);
          setFetchError(false);
        } else {
          setRequests([]);
          setFetchError(true);
          console.error("Expected array, got:", data);
        }
      } catch (err) {
        console.error('Failed to load pending requests:', err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    const handleAction = async (id, action, reason = '') => {
      setActionId(id);
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/verify-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser?.token}`
          },
          body: JSON.stringify({ requestId: id, action, reason })
        });
        const data = await res.json();

        if (res.ok) {
          setNotification({ type: 'success', message: data.message });
          setRequests(requests.filter(r => r.id !== id));
          if (rejectModal.show) setRejectModal({ show: false, id: null, reason: '' });
        } else {
          setNotification({ type: 'error', message: data.error || 'Action failed' });
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Network error. Make sure backend is running.' });
      } finally {
        setActionId(null);
      }
    };

    return (
      <div className="p-6 space-y-6 relative">
        {rejectModal.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-in zoom-in-95">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Reject Registration</h3>
              <p className="text-sm text-gray-500 mb-4">Please provide a reason for declining this request.</p>
              <textarea
                className="w-full border p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-100 mb-4"
                rows="3"
                placeholder="e.g. Invalid ID proof, Details mismatch..."
                value={rejectModal.reason}
                onChange={e => setRejectModal({ ...rejectModal, reason: e.target.value })}
              ></textarea>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setRejectModal({ show: false, id: null, reason: '' })} className="px-4 py-2 text-gray-600 font-medium text-sm">Cancel</button>
                <button
                  onClick={() => handleAction(rejectModal.id, 'Reject', rejectModal.reason)}
                  disabled={actionId === rejectModal.id}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
                >
                  {actionId === rejectModal.id ? 'Processing...' : 'Confirm Rejection'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Pending Registrations</h3>
          <button onClick={fetchRequests} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-gray-200 transition-colors"><RefreshCw size={16} /> Refresh</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
            <span className="font-bold text-gray-700 text-sm">Action Required</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">{requests.length} Pending</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 uppercase text-xs border-b">
                <tr>
                  <th className="px-6 py-4">ID / Username</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="p-8"><LottieLoader text="Loading requests..." /></td></tr>
                ) : fetchError ? (
                  <tr><td colSpan="5" className="p-8 text-center text-red-500 font-medium">Failed to load requests. Please check if your backend server is running.</td></tr>
                ) : requests.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">No pending registration requests found.</td></tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-gray-600">{req.username}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{req.full_name}<span className="block text-xs font-normal text-gray-400 mt-1">{req.email}</span></td>
                      <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{req.user_type}</span></td>
                      <td className="px-6 py-4 text-gray-600">{req.department || 'N/A'}</td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleAction(req.id, 'Approve')}
                          disabled={actionId === req.id}
                          className="px-3 py-1.5 bg-green-50 text-green-700 font-bold text-xs rounded-lg hover:bg-green-100 flex items-center gap-1 border border-green-200 disabled:opacity-50 transition-colors"
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button
                          onClick={() => setRejectModal({ show: true, id: req.id, reason: '' })}
                          disabled={actionId === req.id}
                          className="px-3 py-1.5 bg-red-50 text-red-700 font-bold text-xs rounded-lg hover:bg-red-100 flex items-center gap-1 border border-red-200 disabled:opacity-50 transition-colors"
                        >
                          <XCircle size={14} /> Decline
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AdminStudentMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Users className="text-blue-600" /> Student Management</h3>
          <button onClick={() => setNotification({ type: 'success', message: 'Add Student Modal Opened' })} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700"><UserPlus size={16} /> Add New Student</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 flex gap-4 items-center border-b">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search student by Name, ID, or Course..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
            </div>
            <select className="border p-2 rounded-lg text-sm bg-white"><option>All Departments</option><option>Computer Application</option><option>CSE</option></select>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Course/Sem</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-center">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '2023012039', name: 'Priyanshu Bisht', course: 'BCA - 6th Sem', status: 'Active' },
                { id: 'TULA102', name: 'Riya Gupta', course: 'B.Tech ME - 1st Sem', status: 'Active' },
                { id: 'TULA103', name: 'Karan Patel', course: 'BCA - 5th Sem', status: 'Suspended' },
              ].map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-gray-600">{s.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{s.name}</td>
                  <td className="px-6 py-4 text-gray-600">{s.course}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span></td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="Edit/Assign"><Edit2 size={14} /></button>
                    <button className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200" title="View Documents"><FileText size={14} /></button>
                    <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Delete"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AdminFacultyMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Briefcase className="text-blue-600" /> Faculty & HOD Management</h3>
          <button onClick={() => setNotification({ type: 'success', message: 'Add Staff Form Opened' })} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700"><UserPlus size={16} /> Add Staff/HOD</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Role/Dept</th><th className="px-6 py-4">Subjects</th><th className="px-6 py-4 text-center">Security Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: 'CAHOD001', name: 'Dr. Priya Matta', dept: 'HOD - Computer Application', subjs: 'System Mgmt' },
                { id: 'CAFAC101', name: 'Siddharth Sharma', dept: 'Faculty - BCA', subjs: 'OS, DBMS' },
                { id: 'FAC002', name: 'Prof. Aditi Singh', dept: 'Faculty - Applied Sci', subjs: 'Mathematics I' },
              ].map((f, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-gray-600">{f.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{f.name}</td>
                  <td className="px-6 py-4 text-gray-600">{f.dept}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{f.subjs}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => setNotification({ type: 'success', message: `Password Reset Email sent to ${f.name}` })} className="p-1.5 bg-orange-50 text-orange-600 rounded border border-orange-200 hover:bg-orange-100 flex items-center gap-1 text-xs font-bold" title="Admin Force Reset">
                      <Key size={14} /> Reset Pass
                    </button>
                    <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="Edit Profile"><Edit2 size={14} /></button>
                    <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Remove"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AdminCourseMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><BookOpen className="text-blue-600" /> Course & Subject Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700"><Plus size={16} /> Create New Course</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { course: "Bachelor of Computer Applications (BCA)", totalSubjs: 36, sems: 6 },
            { course: "Master of Business Admin (MBA)", totalSubjs: 32, sems: 4 }
          ].map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-xl text-gray-800">{c.course}</h4>
                <button className="text-gray-400 hover:text-gray-800"><MoreVertical size={20} /></button>
              </div>
              <div className="flex gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><BookOpen size={16} /> {c.totalSubjs} Subjects</span>
                <span className="flex items-center gap-1"><Calendar size={16} /> {c.sems} Semesters</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-100">View Subjects</button>
                <button className="flex-1 bg-blue-50 text-blue-700 font-bold py-2 rounded text-sm hover:bg-blue-100">Assign Faculty</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AdminAttendanceMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><CalendarCheck className="text-blue-600" /> Master Attendance Control</h3>
          <button onClick={() => setNotification({ type: 'success', message: 'Report Generation Started' })} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-green-700"><Download size={16} /> Monthly Report</button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end mb-6">
          <div className="w-full md:w-1/3"><label className="text-xs font-bold text-gray-500">Course / Branch</label><select className="w-full border p-2 rounded mt-1"><option>BCA</option><option>B.Tech CSE</option></select></div>
          <div className="w-full md:w-1/3"><label className="text-xs font-bold text-gray-500">Semester</label><select className="w-full border p-2 rounded mt-1"><option>6th Semester</option></select></div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium">Fetch Data</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr><th className="px-6 py-4">Student ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Overall %</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-center">Admin Edit</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-6 py-4 font-mono">2023012039</td><td className="px-6 py-4 font-bold">Priyanshu Bisht</td><td className="px-6 py-4 font-bold text-green-600">85%</td><td className="px-6 py-4">Eligible</td><td className="px-6 py-4 text-center"><button className="text-blue-600 hover:underline text-xs">Edit Record</button></td></tr>
              <tr><td className="px-6 py-4 font-mono">TULA102</td><td className="px-6 py-4 font-bold">Riya Gupta</td><td className="px-6 py-4 font-bold text-red-600">45%</td><td className="px-6 py-4 text-red-600 font-bold">Debarred</td><td className="px-6 py-4 text-center"><button className="text-blue-600 hover:underline text-xs">Edit Record</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AdminExamMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><FileBarChart className="text-blue-600" /> Exam & Results Management</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Plus size={18} /> Schedule Exam</h4>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-gray-500">Exam Title</label><input type="text" className="w-full border p-2 rounded mt-1" placeholder="e.g. Mid-Term 2025" /></div>
              <div><label className="text-xs font-bold text-gray-500">Course & Sem</label><select className="w-full border p-2 rounded mt-1"><option>Select...</option></select></div>
              <div><label className="text-xs font-bold text-gray-500">Start Date</label><input type="date" className="w-full border p-2 rounded mt-1" /></div>
              <button onClick={() => setNotification({ type: 'success', message: 'Exam Created!' })} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Create Exam</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b font-bold text-gray-700 flex justify-between">Upcoming Exams</div>
              <table className="w-full text-left text-sm">
                <thead className="bg-white border-b text-gray-400 text-xs"><tr><th className="px-4 py-2">Exam</th><th className="px-4 py-2">Course</th><th className="px-4 py-2">Date</th><th className="px-4 py-2">Action</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-bold">Mid-Term 2025</td><td className="px-4 py-3 text-gray-600">BCA 6th Sem</td><td className="px-4 py-3">2025-04-10</td><td className="px-4 py-3"><button className="text-blue-600 font-medium text-xs hover:underline flex items-center gap-1"><Upload size={14} /> Upload Marks</button></td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
              <BarChart3 size={40} className="mx-auto text-gray-300 mb-3" />
              <h4 className="font-bold text-gray-800">Result Analysis & Reports</h4>
              <p className="text-sm text-gray-500 mb-4">Select an established exam to view pass/fail percentages and top performers.</p>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded border shadow-sm font-bold text-sm hover:bg-gray-200">Open Analytics Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminFeeMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><CreditCard className="text-blue-600" /> Master Fee Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow hover:bg-blue-700"><Plus size={16} /> Add Fee Structure</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-l-4 border-l-green-500 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Collected (This Sem)</p>
            <h4 className="text-3xl font-extrabold text-gray-800">₹4.2 Cr</h4>
          </div>
          <div className="bg-white p-6 rounded-xl border border-l-4 border-l-red-500 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Dues</p>
            <h4 className="text-3xl font-extrabold text-gray-800">₹85 L</h4>
          </div>
          <div className="bg-white p-6 rounded-xl border border-l-4 border-l-blue-500 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Transactions</p>
            <h4 className="text-3xl font-extrabold text-gray-800">1,245</h4>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 font-bold border-b text-gray-700">Recent Student Payments</div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 uppercase text-xs border-b">
              <tr><th className="px-6 py-3">Txn ID</th><th className="px-6 py-3">Student</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-center">Receipt</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-6 py-4 font-mono text-xs">TXN998877</td><td className="px-6 py-4 font-bold">2023012039</td><td className="px-6 py-4">₹45,000</td><td className="px-6 py-4">2025-02-15</td><td className="px-6 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded font-bold text-xs">Success</span></td><td className="px-6 py-4 text-center"><button className="text-blue-600 hover:text-blue-800"><Download size={16} className="mx-auto" /></button></td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">TXN665544</td><td className="px-6 py-4 font-bold">TULA205</td><td className="px-6 py-4">₹35,000</td><td className="px-6 py-4">2025-02-14</td><td className="px-6 py-4"><span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded font-bold text-xs">Pending</span></td><td className="px-6 py-4 text-center">-</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AdminNoticeMngmntView = () => {
    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Megaphone className="text-blue-600" /> Notice & Announcements</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Send size={18} /> Post New Notice</h4>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-gray-500">Notice Title</label><input type="text" className="w-full border p-2 rounded mt-1" /></div>
              <div><label className="text-xs font-bold text-gray-500">Target Audience</label><select className="w-full border p-2 rounded mt-1"><option>All Campus</option><option>Students Only</option><option>Faculty Only</option></select></div>
              <div><label className="text-xs font-bold text-gray-500">Message Body</label><textarea className="w-full border p-2 rounded mt-1" rows="4"></textarea></div>
              <button onClick={() => setNotification({ type: 'success', message: 'Notice Published Globally!' })} className="w-full bg-blue-600 text-white py-2 rounded font-bold shadow hover:bg-blue-700">Publish Notice</button>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-gray-800">Active Notices</h4>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded uppercase">All Campus</span>
                  <h5 className="font-bold text-lg mt-2">Holiday on Account of Holi</h5>
                  <p className="text-sm text-gray-600 mt-1">The institute will remain closed on 14th and 15th March.</p>
                </div>
                <button className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminLockedAccountsView = () => {
    const [lockedUsers, setLockedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLockedUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/admin/locked-users`, {
          headers: { 'Authorization': `Bearer ${currentUser?.token}` }
        });
        const data = await res.json();
        if (res.ok) setLockedUsers(data.users || []);
      } catch (err) {
        console.error('Failed to load locked users');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => { fetchLockedUsers(); }, []);

    const handleUnlock = async (username) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/unlock-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser?.token}`
          },
          body: JSON.stringify({ username })
        });
        if (res.ok) {
          setNotification({ type: 'success', message: `Account ${username} unlocked successfully!` });
          setLockedUsers(lockedUsers.filter(u => u.username !== username));
        } else {
          setNotification({ type: 'error', message: 'Failed to unlock account.' });
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Network error.' });
      }
    };

    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Lock className="text-red-600" /> Locked Accounts</h3>
          <button onClick={fetchLockedUsers} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-gray-200 transition-colors"><RefreshCw size={16} /> Refresh</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
            <span className="font-bold text-gray-700 text-sm">Security Action Required</span>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">{lockedUsers.length} Locked</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 uppercase text-xs border-b">
                <tr>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Failed Attempts</th>
                  <th className="px-6 py-4">Lock Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="p-8"><LottieLoader text="Loading locked accounts..." /></td></tr>
                ) : lockedUsers.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">No locked accounts found.</td></tr>
                ) : (
                  lockedUsers.map((u) => (
                    <tr key={u.username} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-gray-600">{u.username}</td>
                      <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{u.role}</span></td>
                      <td className="px-6 py-4 text-red-600 font-bold">{u.failed_attempts}</td>
                      <td className="px-6 py-4">
                        {u.failed_attempts >= 5 ?
                          <span className="text-red-600 font-bold flex items-center gap-1"><XCircle size={14} /> Permanently Locked</span> :
                          <span className="text-orange-500 font-bold flex items-center gap-1"><Clock size={14} /> Temp Locked (10m)</span>}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleUnlock(u.username)}
                          className="px-3 py-1.5 bg-green-50 text-green-700 font-bold text-xs rounded-lg hover:bg-green-100 flex items-center gap-1 border border-green-200 transition-colors"
                        >
                          <Key size={14} /> Unlock Account
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AdminSettingsView = () => {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [roles, setRoles] = useState([
      { id: 1, name: 'System Admin', permissions: ['All Access'] },
      { id: 2, name: 'Department HOD', permissions: ['Manage Faculty', 'View Students', 'Post Notices'] },
      { id: 3, name: 'Faculty', permissions: ['Mark Attendance', 'Upload Assignments', 'View Mentees'] },
      { id: 4, name: 'Student', permissions: ['View Profile', 'Submit Assignments', 'Pay Fees'] }
    ]);
    const [editingRole, setEditingRole] = useState(null);
    const [newPermission, setNewPermission] = useState('');

    const toggleRegistration = () => {
      setSystemSettings(prev => {
        const newState = !prev.allowRegistrations;
        setNotification({ type: 'success', message: `New Registrations ${newState ? 'Enabled' : 'Disabled'}` });
        return { ...prev, allowRegistrations: newState };
      });
    };

    const toggleMaintenance = () => {
      setSystemSettings(prev => {
        const newState = !prev.maintenanceMode;
        setNotification({ type: 'success', message: `Maintenance Mode ${newState ? 'ON' : 'OFF'}` });
        return { ...prev, maintenanceMode: newState };
      });
    };

    return (
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Settings className="text-blue-600" /> System Settings & Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2"><Database size={20} className="text-blue-600" /> Database Management</h4>
              <p className="text-sm text-gray-500 mb-4">Create a backup of users, fees, and system logs. Last backup was yesterday.</p>
            </div>
            <button onClick={() => setNotification({ type: 'success', message: 'Backup Started. This may take a few minutes.' })} className="bg-gray-900 text-white w-full py-2 rounded font-bold flex items-center justify-center gap-2 hover:bg-gray-800"><Download size={16} /> Initiate Secure Backup</button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Shield size={20} className="text-emerald-600" /> Portal Access Control</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold">New Registrations</p><p className="text-xs text-gray-500">Allow students to sign up</p></div>
                <div onClick={toggleRegistration} className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${systemSettings.allowRegistrations ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${systemSettings.allowRegistrations ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold">Maintenance Mode</p><p className="text-xs text-gray-500">Lock site for updates</p></div>
                <div onClick={toggleMaintenance} className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${systemSettings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${systemSettings.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Sliders size={20} className="text-orange-600" /> Role Management</h4>
            <p className="text-sm text-gray-500 mb-4">Modify permissions for system administrators, HODs, and Staff.</p>
            <button onClick={() => setShowRoleModal(true)} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">Manage Permissions <ArrowRight size={14} /></button>
          </div>
        </div>

        {/* Role Management Modal */}
        {showRoleModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2"><Sliders size={20} className="text-orange-600" /> Manage System Roles</h3>
                <button onClick={() => { setShowRoleModal(false); setEditingRole(null); }} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-sm"><X size={20} /></button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {roles.map(role => (
                    <div key={role.id} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm transition hover:shadow-md">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg text-gray-800">{role.name}</h4>
                        <button
                          onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                          className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded font-medium hover:bg-blue-100"
                        >
                          {editingRole === role.id ? 'Done' : 'Edit Permissions'}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                            {perm}
                            {editingRole === role.id && role.name !== 'System Admin' && (
                              <button
                                onClick={() => {
                                  const updatedRoles = roles.map(r => {
                                    if (r.id === role.id) {
                                      return { ...r, permissions: r.permissions.filter(p => p !== perm) };
                                    }
                                    return r;
                                  });
                                  setRoles(updatedRoles);
                                }}
                                className="text-gray-400 hover:text-red-500 ml-1"
                              ><X size={12} /></button>
                            )}
                          </span>
                        ))}
                        {role.permissions.length === 0 && <span className="text-xs text-gray-400 italic">No permissions assigned.</span>}
                      </div>

                      {editingRole === role.id && role.name !== 'System Admin' && (
                        <div className="mt-4 flex gap-2 pt-3 border-t border-gray-100">
                          <input
                            type="text"
                            placeholder="Add new permission..."
                            className="flex-1 border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-100 outline-none"
                            value={newPermission}
                            onChange={(e) => setNewPermission(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newPermission.trim()) {
                                const updatedRoles = roles.map(r => {
                                  if (r.id === role.id) {
                                    return { ...r, permissions: [...r.permissions, newPermission.trim()] };
                                  }
                                  return r;
                                });
                                setRoles(updatedRoles);
                                setNewPermission('');
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              if (newPermission.trim()) {
                                const updatedRoles = roles.map(r => {
                                  if (r.id === role.id) {
                                    return { ...r, permissions: [...r.permissions, newPermission.trim()] };
                                  }
                                  return r;
                                });
                                setRoles(updatedRoles);
                                setNewPermission('');
                              }
                            }}
                            className="bg-orange-500 text-white px-3 py-2 rounded text-sm font-bold hover:bg-orange-600"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                <button onClick={() => setShowRoleModal(false)} className="px-4 py-2 text-gray-600 font-medium">Cancel</button>
                <button onClick={() => { setShowRoleModal(false); setNotification({ type: 'success', message: 'Role Permissions Saved!' }); }} className="px-6 py-2 bg-blue-600 text-white rounded font-bold shadow-md hover:bg-blue-700">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Dashboard = () => {
    const activeItem = DASHBOARD_CONTENT[currentUser.entity][currentUser.role]?.find(item => item.id === activeTab);
    const menuItems = DASHBOARD_CONTENT[currentUser.entity][currentUser.role] || [];
    const handleLogout = () => { setCurrentUser(null); setView('login'); };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 ${theme.secondary} text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl`}>
          <div className="p-6 border-b border-white/10 flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0"><img src={theme.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" /></div><div><h2 className="font-bold leading-tight">Tula's Connect</h2><p className="text-[10px] text-gray-400 uppercase">{currentUser.entity}</p></div><button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto"><X size={20} /></button></div>
          <div className="p-4"><nav className="space-y-1">{currentUser.role !== 'department' && (<button onClick={() => handleTabChange('home')} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${activeTab === 'home' ? theme.primary : 'hover:bg-white/10'}`}><LayoutDashboard size={18} /> Home</button>)}{menuItems.map(item => (<button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${activeTab === item.id ? theme.primary : 'hover:bg-white/10'}`}><item.icon size={18} /> {item.label}</button>))}</nav></div>
          <div className="mt-auto p-4 border-t border-white/10"><button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-2 py-2 text-sm font-medium"><LogOut size={16} /> Logout</button></div>
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden"><Menu size={24} /></button>
              <h1 className="text-xl font-bold">{activeTab === 'home' ? `Welcome, ${currentUser.name}` : activeItem?.label}</h1>
            </div>

            <LiveClock />
          </header>
          <main className="flex-1 overflow-y-auto p-6 pb-24 relative">
            {activeTab === 'home' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentUser.role === 'department' ? <HODOverview /> : (
                  <>
                    <div className={`rounded-2xl p-8 text-white shadow-xl bg-gradient-to-r ${theme.gradient} relative overflow-hidden`}>
                      <div className="relative z-10 max-w-2xl"><h2 className="text-3xl font-bold mb-2">Welcome to Tula’s Connect</h2><p className="text-lg opacity-90 mb-4">Your unified digital platform.</p></div>
                      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-700 mb-4">Quick Access</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{menuItems.map((item) => (<button key={item.id} onClick={() => handleTabChange(item.id)} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group"><div className={`w-12 h-12 rounded-lg ${theme.light} ${theme.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><item.icon size={24} /></div><h4 className="font-bold text-gray-800 mb-1">{item.label}</h4><p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p></button>))}</div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Common Views */}
            {activeTab === 'placements' && <PlacementView />}
            {activeTab === 'fees' && <FeesView />}
            {activeTab === 'profile' && <ProfileView />}

            {/* Student Views */}
            {activeTab === 'mentor' && <StudentMentorView />}
            {activeTab === 'attendance' && <StudentAttendanceView />}
            {activeTab === 'courses' && <StudentCoursesView />}
            {activeTab === 'assignments' && currentUser.role === 'student' && <StudentAssignmentsView />}
            {activeTab === 'homework' && currentUser.role === 'student' && <StudentAssignmentsView />}
            {activeTab === 'exams' && <StudentExamsView />}
            {activeTab === 'grievance' && <StudentGrievanceView />}
            {activeTab === 'sem_registration' && currentUser.role === 'student' && <StudentSemesterRegistration />}
            {activeTab === 'notices' && currentUser.role === 'student' && <StudentNoticesView />}

            {/* Faculty Views */}
            {activeTab === 'mentorship' && <FacultyMentorView />}
            {activeTab === 'attendance_mgmt' && <FacultyAttendanceView />}
            {activeTab === 'assignments' && currentUser.role === 'faculty' && <FacultyAssignmentsView />}
            {activeTab === 'class_mgmt' && currentUser.role === 'faculty' && <FacultyClassMgmtView />}

            {/* HOD Views */}
            {activeTab === 'overview' && currentUser.role === 'department' && <HODOverview />}
            {activeTab === 'mentor_assign' && <HODMentorAssignment />}
            {activeTab === 'faculty_mgmt' && <HODFacultyView />}
            {activeTab === 'student_records' && <HODStudentRecords />}
            {activeTab === 'sem_registration_control' && <HODRegistrationControl />}
            {activeTab === 'announcements' && <HODAnnouncements />}

            {/* Admin Views */}
            {activeTab === 'admin_overview' && currentUser.role === 'admin' && <AdminOverviewView />}
            {activeTab === 'admin_requests' && currentUser.role === 'admin' && <AdminRequestsView />}
            {activeTab === 'admin_students' && currentUser.role === 'admin' && <AdminStudentMngmntView />}
            {activeTab === 'admin_faculty' && currentUser.role === 'admin' && <AdminFacultyMngmntView />}
            {activeTab === 'admin_courses' && currentUser.role === 'admin' && <AdminCourseMngmntView />}
            {activeTab === 'admin_attendance' && currentUser.role === 'admin' && <AdminAttendanceMngmntView />}
            {activeTab === 'admin_exams' && currentUser.role === 'admin' && <AdminExamMngmntView />}
            {activeTab === 'admin_fees' && currentUser.role === 'admin' && <AdminFeeMngmntView />}
            {activeTab === 'admin_notices' && currentUser.role === 'admin' && <AdminNoticeMngmntView />}
            {activeTab === 'admin_locked' && currentUser.role === 'admin' && <AdminLockedAccountsView />}
            {activeTab === 'admin_settings' && currentUser.role === 'admin' && <AdminSettingsView />}

            {/* Stylish Loading Overlay Over Content */}
            {isModuleLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all duration-300">
                <dotlottie-player
                  key={`loader-${activeTab}`}
                  src="/Loader.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  loop
                  autoplay
                ></dotlottie-player>
                <p className="text-sm font-bold text-blue-600 mt-2 animate-pulse tracking-wider uppercase">Loading Module...</p>
              </div>
            )}
          </main>

          <FloatingAIAssistant />
        </div>
      </div>
    );
  };

  if (view === 'dashboard' && currentUser) return <Dashboard />;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${theme.gradient} transition-colors duration-700`}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            overflow: hidden;
            display: flex;
            width: 100%;
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- INLINE MODALS FIX FOCUS ISSUE --- */}

      {/* 1. Signup TOTP Setup Modal */}
      {showTotpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden shadow-2xl p-8 text-center animate-in zoom-in-95">
            <div className="mx-auto mb-4 flex justify-center">
              {isTotpSuccess ? (
                <dotlottie-player key="tick" src="/tick.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : isTotpError ? (
                <dotlottie-player key="failure" src="/failure.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : (
                <dotlottie-player key="check" src="/check.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
            <p className="text-sm text-gray-500 mb-6">Scan this QR code with the Google Authenticator app on your phone.</p>

            <div className="flex justify-center mb-6">
              <div className="p-3 border-2 border-gray-100 rounded-xl inline-block shadow-sm">
                {totpData.uri ? (
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(totpData.uri)}&ecc=M`} alt="Authenticator QR Code" className="w-40 h-40" />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-50 text-gray-400 text-sm font-medium">Generating QR...</div>
                )}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Enter 6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={totpData.code}
                onChange={(e) => setTotpData({ ...totpData, code: e.target.value.replace(/\D/g, '') })}
                className="w-full border-2 border-gray-200 p-3 rounded-xl text-center font-mono font-bold text-2xl tracking-[0.5em] focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                placeholder="000000"
                autoFocus
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowTotpModal(false)} disabled={isTotpSuccess} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={finalizeSignup} disabled={isLoading || totpData.code.length !== 6 || isTotpSuccess} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Verify & Register'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Login - Force Setup TOTP Modal (For existing users without TOTP) */}
      {showSetupTotpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden shadow-2xl p-8 text-center animate-in zoom-in-95">
            <div className="mx-auto mb-4 flex justify-center">
              {isTotpSuccess ? (
                <dotlottie-player key="tick" src="/tick.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : isTotpError ? (
                <dotlottie-player key="failure" src="/failure.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : (
                <dotlottie-player key="check" src="/check.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Security Update Required</h2>
            <p className="text-sm text-gray-500 mb-6">Please secure your account by scanning this QR code with the Google Authenticator app.</p>

            <div className="flex justify-center mb-6">
              <div className="p-3 border-2 border-gray-100 rounded-xl inline-block shadow-sm">
                {totpData.uri ? (
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(totpData.uri)}&ecc=M`} alt="Authenticator QR Code" className="w-40 h-40" />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-50 text-gray-400 text-sm font-medium">Generating QR...</div>
                )}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Enter 6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={totpData.code}
                onChange={(e) => setTotpData({ ...totpData, code: e.target.value.replace(/\D/g, '') })}
                className="w-full border-2 border-gray-200 p-3 rounded-xl text-center font-mono font-bold text-2xl tracking-[0.5em] focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                placeholder="000000"
                autoFocus
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowSetupTotpModal(false); setTotpData({ secret: '', uri: '', code: '' }); generateCaptcha(); }} disabled={isTotpSuccess} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={finalizeLoginTotpSetup} disabled={isLoading || totpData.code.length !== 6 || isTotpSuccess} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Verify & Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Login - Verify Existing TOTP Modal */}
      {showLoginTotpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-[400px] overflow-hidden shadow-2xl p-8 text-center animate-in zoom-in-95">
            <div className="mx-auto mb-4 flex justify-center">
              {isTotpSuccess ? (
                <dotlottie-player key="tick" src="/tick.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : isTotpError ? (
                <dotlottie-player key="failure" src="/failure.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} autoplay></dotlottie-player>
              ) : (
                <dotlottie-player key="check" src="/check.lottie" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500 mb-6">Open Google Authenticator and enter the 6-digit code to continue securely.</p>

            <div className="space-y-3 text-left">
              <input
                type="text"
                maxLength={6}
                value={loginTotpCode}
                onChange={(e) => setLoginTotpCode(e.target.value.replace(/\D/g, ''))}
                onKeyPress={(e) => { if (e.key === 'Enter') handleVerifyLoginTotp(); }}
                className="w-full border-2 border-gray-200 p-3 rounded-xl text-center font-mono font-bold text-2xl tracking-[0.5em] focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                placeholder="000000"
                autoFocus
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => { setShowLoginTotpModal(false); setLoginTotpCode(''); setIsLoading(false); generateCaptcha(); }} disabled={isTotpSuccess} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50">Cancel</button>
              <button type="button" onClick={handleVerifyLoginTotp} disabled={isLoading || loginTotpCode.length !== 6 || isTotpSuccess} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Verify Login'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-black opacity-20 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${theme.bgImage}')` }}></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-85`}></div>

      {/* Render Welcome Animation overlay */}
      <WelcomeScreen isVisible={showWelcome} name={currentUser?.name} />

      <div className={`w-full max-w-6xl transition-all duration-500 ${view === 'signup' ? 'my-4' : 'h-auto md:min-h-[650px]'} bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 m-4 z-10`}>
        <div className={`w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-between text-white relative transition-colors duration-500 bg-black/20 ${view === 'signup' ? 'hidden md:flex' : 'flex'}`}>
          <div>
            <div className="flex items-center gap-3 mb-6"><div className="w-16 h-16 p-2 rounded-xl bg-white shadow-lg flex items-center justify-center shrink-0"><img src={theme.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" /></div><div><h1 className="text-2xl font-bold tracking-wide">Tula's Connect</h1><p className="text-xs text-gray-300 uppercase tracking-widest">ERP Portal</p></div></div>
            <div className="mt-12 space-y-6"><h2 className="text-3xl md:text-5xl font-extrabold leading-tight">One Campus.<br /><span className={`text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400`}>One Connect.</span></h2><p className="text-gray-300 text-lg max-w-sm">Unifying the Campus Experience.</p></div>

            <div className="mt-10 hidden md:block animate-in fade-in duration-1000">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Recognized & Affiliated By</p>
              <div className="marquee-container bg-white/5 border border-white/10 rounded-xl py-3.5 shadow-inner">
                <div className="marquee-track gap-5 px-2">
                  {[...(entity === 'institute' ? ACCREDITATION_LOGOS : SCHOOL_LOGOS), ...(entity === 'institute' ? ACCREDITATION_LOGOS : SCHOOL_LOGOS)].map((logo, idx) => (
                    <div key={idx} className="w-[220px] h-[120px] bg-white rounded-lg p-2 flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform overflow-hidden">
                      <img src={logo} alt="Accreditation" className={`w-full h-full ${entity === 'institute' ? 'object-contain' : 'object-cover rounded'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-0 flex flex-col gap-4">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Select Your Portal</div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setEntity('institute')} className={`flex-1 p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 group ${entity === 'institute' ? 'bg-red-600 border-red-500 shadow-lg scale-105' : 'bg-transparent border-white/20 hover:bg-white/5'}`}><Building2 size={24} className={entity === 'institute' ? 'text-white' : 'text-gray-400 group-hover:text-white'} /><span className="text-sm font-medium">Institute</span></button>
              <button type="button" onClick={() => setEntity('school')} className={`flex-1 p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 group ${entity === 'school' ? 'bg-emerald-600 border-emerald-500 shadow-lg scale-105' : 'bg-transparent border-white/20 hover:bg-white/5'}`}><School size={24} className={entity === 'school' ? 'text-white' : 'text-gray-400 group-hover:text-white'} /><span className="text-sm font-medium">School</span></button>
            </div>
          </div>
        </div>
        <div className={`w-full ${view === 'signup' ? 'md:w-full bg-white overflow-y-auto max-h-[90vh]' : 'md:w-7/12 bg-white'} p-6 md:p-10 flex flex-col relative`}>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">
                {view === 'login' ? 'Welcome Back' :
                  view === 'signup' ? 'Create Account' :
                    view === 'forgot' ? 'Reset Password' :
                      view === 'checkStatus' ? 'Check Status' :
                        'Change Password'}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {view === 'login' ? 'Please login to your account.' :
                  view === 'signup' ? 'New registration' :
                    view === 'checkStatus' ? 'View application status' :
                      'Verify identity'}
              </p>
            </div>
            {view === 'login' && systemSettings.allowRegistrations && (<button type="button" onClick={() => setView('signup')} className={`text-sm font-semibold ${theme.accent} hover:underline flex items-center gap-1`}>New User? Sign Up <ArrowRight size={14} /></button>)}
            {view === 'login' && !systemSettings.allowRegistrations && (<span className={`text-sm font-semibold text-red-500 flex items-center gap-1 cursor-not-allowed`} title="Registrations are temporarily closed by Admin"><AlertTriangle size={14} /> Registrations Closed</span>)}
            {view === 'signup' && (<button type="button" onClick={() => setView('login')} className={`text-sm font-semibold ${theme.accent} hover:underline flex items-center gap-1`}>Already have an account? Login <ArrowLeft size={14} /></button>)}
            {(view === 'forgot' || view === 'checkStatus') && (<button type="button" onClick={() => setView('login')} className={`text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1`}><ArrowLeft size={14} /> Back to Login</button>)}
          </div>
          {notification && (<div className={`mb-6 p-4 rounded-lg text-sm flex items-center gap-2 animate-pulse ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}><div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>{notification.message}</div>)}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            {view === 'login' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-end">
                  <button type="button" onClick={() => setView('checkStatus')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    Check Application Status <ArrowRight size={12} />
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Role</label>
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">{PORTAL_CONFIG[entity].loginRoles.map((role) => (<button key={role.id} type="button" onClick={() => setLoginData({ ...loginData, userType: role.id })} className={`py-2 px-1 text-xs md:text-sm font-medium rounded-lg capitalize transition-all duration-200 ${loginData.userType === role.id ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5 scale-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>{role.label}</button>))}</div>
                </div>

                {systemSettings.maintenanceMode && loginData.userType !== 'admin' ? (
                  <div className="mt-4 p-6 bg-white border border-gray-200 rounded-xl text-center flex flex-col items-center justify-center animate-in zoom-in duration-300 shadow-sm">
                    <div className="w-56 h-56 mb-2">
                      <dotlottie-player
                        src="/comingsoon.lottie"
                        background="transparent"
                        speed="1"
                        style={{ width: '100%', height: '100%' }}
                        loop
                        autoplay
                      ></dotlottie-player>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">System Under Maintenance</h4>
                    <p className="text-sm text-gray-500 mb-2">The portal is currently locked for updates to serve you better.</p>
                    <p className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">Only Administrators can log in</p>
                  </div>
                ) : (
                  <>
                    {/* HOD Specific Dropdowns */}
                    {loginData.userType === 'department' && (
                      <div className="space-y-3 mb-3 animate-in fade-in slide-in-from-top-2">
                        <div className="relative">
                          <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400" />
                          <select name="department" value={loginData.department} onChange={handleLoginChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 appearance-none text-sm" style={{ '--tw-ring-color': entity === 'institute' ? '#dc2626' : '#059669' }}>
                            <option value="">Select Department</option>
                            {HOD_DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                        </div>
                        {loginData.department === 'Department of Engineering' && (
                          <div className="relative animate-in fade-in slide-in-from-top-2">
                            <Settings size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            <select name="branch" value={loginData.branch} onChange={handleLoginChange} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 appearance-none text-sm" style={{ '--tw-ring-color': entity === 'institute' ? '#dc2626' : '#059669' }}>
                              <option value="">Select Engineering Branch</option>
                              {ENGINEERING_BRANCHES_HOD.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="relative group">
                      <User size={18} className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-gray-600" />
                      <input type="text" name="username" value={loginData.username} onChange={handleLoginChange} required className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': entity === 'institute' ? '#dc2626' : '#059669' }} placeholder="User ID" />
                    </div>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-gray-600" />
                      <input type={showPassword ? "text" : "password"} name="password" value={loginData.password} onChange={handleLoginChange} required className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': entity === 'institute' ? '#dc2626' : '#059669' }} placeholder="Password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={handleForgotPasswordClick} className={`text-xs font-semibold ${theme.accent} hover:underline`}>Forgot Password?</button>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Security Check</label>
                      <div className="flex gap-3">
                        <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group select-none h-12">
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                          <div className="text-xl font-mono font-bold tracking-[0.3em] text-gray-600 z-10 skew-x-12">{captchaCode}</div>
                          <div className="absolute w-full h-[2px] bg-gray-400/30 rotate-3 top-1/2"></div>
                        </div>
                        <button type="button" onClick={generateCaptcha} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"><RefreshCw size={20} /></button>
                      </div>
                      <div className="relative">
                        <ShieldCheck size={18} className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="text" name="captchaInput" value={loginData.captchaInput} onChange={handleLoginChange} required maxLength={6} className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 uppercase font-mono tracking-widest" style={{ '--tw-ring-color': entity === 'institute' ? '#dc2626' : '#059669' }} placeholder="ENTER CODE" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : view === 'signup' ? renderSignupForm()
              : view === 'forgot' ? renderForgotPasswordForm()
                : view === 'checkStatus' ? renderCheckStatusForm()
                  : renderChangePasswordForm()}

            <div className="pt-4">
              {forgotStep === 0 && !showForgotSuccessAnim && !showForgotErrorAnim && view !== 'forgot' && view !== 'changePassword' && view !== 'checkStatus' && !(view === 'login' && systemSettings.maintenanceMode && loginData.userType !== 'admin') && !(view === 'signup' && !systemSettings.allowRegistrations) && (
                <button type="submit" disabled={isLoading} className={`w-full py-3.5 px-4 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2 ${theme.primary} ${theme.primaryHover} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isLoading ? (<span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>) : (<>{view === 'login' ? 'Sign In' : view === 'signup' ? 'Proceed to Authenticator' : view === 'changePassword' ? 'Update Password' : 'Send OTP'} <ArrowRight size={18} /></>)}
                </button>
              )}
            </div>
            {view === 'login' && (
              <div className="mt-6 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} {theme.name}. All rights reserved.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;