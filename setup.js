document.addEventListener('DOMContentLoaded', () => {
    const setupForm = document.getElementById('setupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const strengthBar = document.getElementById('strengthBar');

    // 1. Password Strength Logic
    password.addEventListener('input', () => {
        const val = password.value;
        let width = 0;
        let color = "#ef4444"; // Default Red

        // Check length and complexity
        if (val.length > 0) {
            if (val.length <= 5) {
                width = 25;
                color = "#ef4444"; // Weak - Red
            } else if (val.length <= 8) {
                width = 50;
                color = "#f59e0b"; // Medium - Orange
            } else if (val.length > 8 && /[A-Z]/.test(val) && /\d/.test(val)) {
                width = 100;
                color = "#10b981"; // Strong - Green
            } else {
                width = 75;
                color = "#84cc16"; // Good - Light Green
            }
        } else {
            width = 0;
        }

        // Apply styles to the bar
        strengthBar.style.width = width + "%";
        strengthBar.style.backgroundColor = color;
    });

    // 2. Form Submission Logic
    if (setupForm) {
        setupForm.onsubmit = (e) => {
            e.preventDefault();

            // Validation: Password Match
            if (password.value !== confirmPassword.value) {
                alert("Passwords do not match. Please check again.");
                confirmPassword.style.borderColor = "#ef4444";
                return;
            }

            // Save user data for the Landing Page "Member Mode"
            const name = document.getElementById('fullName').value;
            localStorage.setItem('studentName', name);

            // Visual Feedback on Button
            const btn = document.querySelector('.launch-btn');
            btn.innerText = "Launching...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            // Redirect to Home
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        };
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Stop the instant jump

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// 1. DATA FIRST: Put the translations at the VERY TOP
const i18n = {
    en: {
        withus: "with us you make your wish come true",
        edutitle:"EduStream",
        dir: "ltr",
        nav_home: "Home",
        join: "Join",
        nav_courses: "Courses",
        nav_get_started: "Get Started",
        hero_title: "Find Your Passion and Progress",
        hero_para: "With us, you make your wishes come true.",
        setup_title: "Create Your Profile",
        expcourses: "Explore Courses",
        create_profile: "Create Your Profile",
        welcomepr: "Welcome to EduStream! Let's get your account ready.",
        fullname: "Full Name",
        username: "Username",
        email: "Email Address",
        password: "Password",
        confirmpassword: "Confirm Password",  
        note: "Note",
        notecont: "You can customize your profile picture and bio once your account is launched.",
        launch_account: "Launch My Account"
    },
    ar: {
        withus: "معنا تجعل التمني واقعا",
        edutitle:"إديو ستريم",
        dir: "rtl",
        join: "انظم",
        nav_home: "الرئيسية",
        nav_courses: "الدورات",
        nav_get_started: "ابدأ الآن",
        hero_title: "اكتشف شغفك وتقدمك المستمر",
        hero_para: "معنا، يمكنك تحقيق كل ما تطمح إليه.",
        setup_title: "أنشئ ملفك الشخصي",
        expcourses: "اكتشف الدروس",
        create_profile: "أنشئ ملفك الشخصي",
        welcomepr: "مرحبًا بك في إديو ستريم! دعنا نجهز حسابك.",
        fullname: "الاسم الكامل",
        username: "اسم المستخدم",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirmpassword: "تأكيد كلمة المرور",
        note: "ملاحظة",
        notecont: "يمكنك تخصيص صورة ملفك الشخصي وسيرتك الذاتية بمجرد إطلاق حسابك.",
        launch_account: "إطلاق حسابي",

    }
};

// 2. CORE FUNCTIONS
function setLanguage(lang) {
    const translation = i18n[lang];
    if (!translation) return;

    // Change all text with data-i18n tags
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translation[key]) {
            el.textContent = translation[key];
        }
    });

    // Flip the page direction (LTR vs RTL)
    document.documentElement.dir = translation.dir;
    document.documentElement.lang = lang;

    // Save choice
    localStorage.setItem('userLang', lang);
}

// 3. MAIN INITIALIZATION (One single listener for everything)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LANGUAGE LOGIC ---
    const langSwitcher = document.getElementById('langSwitcher');
    const savedLang = localStorage.getItem('userLang') || 'en';
    
    if (langSwitcher) {
        langSwitcher.value = savedLang;
        setLanguage(savedLang);
        langSwitcher.addEventListener('change', (e) => setLanguage(e.target.value));
    }

    // --- MODAL & LOGIN LOGIC ---
    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('openLogin');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const heroContent = document.querySelector('.hero-content');
    const userName = localStorage.getItem('studentName');

    if (userName && heroContent) {
        // MEMBER MODE
        heroContent.innerHTML = `
            <h1>Welcome back, ${userName}! 🎓</h1>
            <p class="para">Pick up where you left off and keep growing.</p>
            <div class="hero-btns">
                <a href="#courses" class="btn-primary">My Courses</a>
                <button id="logoutBtn" class="btn-secondary">Log Out</button>
            </div>
        `;
        if (openBtn) openBtn.outerHTML = `<span class="user-name-nav">Hi, ${userName}</span>`;
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = () => {
                localStorage.removeItem('studentName');
                location.reload();
            };
        }
    } else {
        // GUEST MODE
        if (openBtn && modal) {
            openBtn.onclick = (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            };
        }
    }

    // Modal Close logic
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            window.location.href = "setup.html";
        };
    }
});