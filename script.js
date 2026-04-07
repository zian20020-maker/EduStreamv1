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
        join: "join",
        nav_courses: "Courses",
        nav_get_started: "Get Started",
        hero_title: "Find Your Passion and Progress",
        hero_para: "With us, you make your wishes come true.",
        setup_title: "Create Your Profile",
        expcourses: "Explore Courses",
        trending: "Trending Courses",
        startfuturepar: "Start Your Future Today",
        join: "Join Now",
        viewpricing: "View Pricing",
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
        trending: "الدورات الرائجة",
        startfuturepar: "ابدأ مستقبلك اليوم",
        join: "انظم الآن",
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
// --- HAMBURGER MENU LOGIC ---
const menuToggle = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navLinksContainer.classList.toggle('active');
    });
}

// Close menu when clicking a link (important for mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinksContainer.classList.remove('active');
    });
});