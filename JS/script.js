// ==================== NEW NAV BAR MENU TOGGLE CODE ====================
let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');

// जब मोबाइल पर मेनू बटन पर क्लिक होगा
if (menuBtn && navbar) {
    menuBtn.onclick = (e) => {
        navbar.classList.toggle('active');
        e.stopPropagation(); // क्लिक इवेंट को बाहर जाने से रोकेगा
    }
}

// स्क्रीन स्क्रॉल होने पर या बाहर कहीं भी क्लिक करने पर मेनू अपने आप बंद हो जाएगा
window.onscroll = () => {
    if (navbar) {
        navbar.classList.remove('active');
    }
}

document.addEventListener('click', (e) => {
    if (navbar && menuBtn && !navbar.contains(e.target) && e.target !== menuBtn) {
        navbar.classList.remove('active');
    }
});


// ==================== IMAGE SLIDER MEMBER FUNCTION ====================
const slides = document.querySelectorAll('.team-member');
let current = 0;

function showNextMember() {
    if (slides.length > 0) {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }
}

if (slides.length > 0) {
    setInterval(showNextMember, 3000); // 3 सेकंड में टीम मेंबर बदलेगा
}



//   QUICK SECTION ONLY PYQ AND NOTES AND SYLLABUS //
// ==================== SWEETALERT INLINE CUSTOM STYLES ====================
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    .swal-link-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        margin: 8px 0 !important;
        padding: 12px 15px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #fff !important;
        border-radius: 8px !important;
        text-decoration: none !important;
        transition: 0.2s ease !important;
        box-sizing: border-box !important;
    }
    /* Active Resources Styles (With Green Tick ✓) */
    .swal-pyq-active { background: #f44336 !important; cursor: pointer !important; }
    .swal-pyq-active:hover { transform: scale(1.02); filter: brightness(1.1); }
    .swal-pyq-active::after { content: " ✓" !important; color: #00ff88 !important; font-weight: bold !important; font-size: 16px !important; }

    .swal-notes-active { background: #2196f3 !important; cursor: pointer !important; }
    .swal-notes-active:hover { transform: scale(1.02); filter: brightness(1.1); }
    .swal-notes-active::after { content: " ✓" !important; color: #00ff88 !important; font-weight: bold !important; font-size: 16px !important; }

    /* Not Available Resources Styles (Disabled state) */
    .swal-res-na { background: #e2e8f0 !important; color: #94a3b8 !important; pointer-events: none !important; border: 1px dashed #cbd5e1 !important; cursor: not-allowed !important; }
    .swal-res-na::after { content: " (Not Available)" !important; color: #ef4444 !important; font-size: 11px !important; font-weight: bold !important; }

    /* Coming Soon Resources Styles (Disabled state) */
    .swal-res-cs { background: #f8fafc !important; color: #94a3b8 !important; pointer-events: none !important; border: 1px solid #e2e8f0 !important; cursor: not-allowed !important; }
    .swal-res-cs::after { content: " (Coming Soon)" !important; color: #f59e0b !important; font-size: 11px !important; font-weight: bold !important; }
`;
document.head.appendChild(styleTag);

// ==================== MASTER PYQ POPUP ENGINE ====================
function openPyqPopup(sem) {
    let pyqData = {};
    
    if(sem === 1) {
        pyqData = {
            title: '📄 Semester 1 PYQ Papers',
            html: `
                <a href="PYQ/sem1/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem1/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                <a class="swal-link-btn swal-res-na">2018-2021</a>
                <a href="PYQ/sem1/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
                <a class="swal-link-btn swal-res-na">2020-2023</a>
                <a href="PYQ/sem1/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem1/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a href="PYQ/sem1/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                <a href="PYQ/sem1/2024_27.html" target="_blank" class="swal-link-btn swal-pyq-active">2024-2027</a>
                <a href="PYQ/sem1/2025_28.html" target="_blank" class="swal-link-btn swal-pyq-active">2025-2028</a>
            `
        };
    } else if(sem === 2) {
        pyqData = {
            title: '📄 Semester 2 PYQ Papers',
            html: `
                <a href="PYQ/sem2/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem2/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                <a href="PYQ/sem2/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
                <a href="PYQ/sem2/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                <a href="PYQ/sem2/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem2/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a href="PYQ/sem2/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                <a href="PYQ/sem2/2024_27.html" target="_blank" class="swal-link-btn swal-pyq-active">2024-2027</a>
                <a class="swal-link-btn swal-res-cs">2025-2028</a>
            `
        };
    } else if(sem === 3) {
        pyqData = {
            title: '📄 Semester 3 PYQ Papers',
            html: `
                <a href="PYQ/sem3/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
                <a href="PYQ/sem3/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem3/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                <a href="PYQ/sem3/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                <a href="PYQ/sem3/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem3/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a href="PYQ/sem3/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                <a class="swal-link-btn swal-res-cs">2024-2027</a>
            `
        };
    } else if(sem === 4) {
        pyqData = {
            title: '📄 Semester 4 PYQ Papers',
            html: `
                <a href="PYQ/sem4/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
                <a href="PYQ/sem4/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem4/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                <a href="PYQ/sem4/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
                <a href="PYQ/sem4/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
                <a href="PYQ/sem4/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                <a href="PYQ/sem4/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem4/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a href="PYQ/sem4/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                <a class="swal-link-btn swal-res-cs">2024-2027</a>
            `
        };
    } else if(sem === 5) {
        pyqData = {
            title: '📄 Semester 5 PYQ Papers',
            html: `
                <a href="PYQ/sem5/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem5/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
                <a href="PYQ/sem5/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                <a href="PYQ/sem5/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem5/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a href="PYQ/sem5/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                <a class="swal-link-btn swal-res-cs">2024-2027</a>
            `
        };
    } else if(sem === 6) {
        pyqData = {
            title: '📄 Semester 6 PYQ Papers',
            html: `
                <a href="PYQ/sem6/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
                <a href="PYQ/sem6/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                <a href="PYQ/sem6/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                <a href="PYQ/sem6/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
                <a href="PYQ/sem6/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                <a href="PYQ/sem6/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                <a href="PYQ/sem6/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                <a class="swal-link-btn swal-res-cs">2023-2026</a>
                <a class="swal-link-btn swal-res-cs">2024-2027</a>
            `
        };
    }

    Swal.fire({
        title: pyqData.title,
        html: `<div style="max-height: 330px; overflow-y: auto; padding-right: 5px;">${pyqData.html}</div>`,
        showConfirmButton: false,
        showCloseButton: true,
        background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff',
        color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40'
    });
}

// ==================== MASTER NOTES POPUP ENGINE ====================
function openNotesPopup(sem) {
    let notesHtml = "";
    let title = `📘 Semester ${sem} Notes`;

    if(sem === 1) {
        notesHtml = `
            <a href="Notes/sem1/F1001.html" target="_blank" class="swal-link-btn swal-notes-active">Business Communications (F1001)</a>
            <a href="Notes/sem1/F1002.html" target="_blank" class="swal-link-btn swal-notes-active">Basic Mathematics-I (F1002)</a>
            <a href="Notes/sem1/F1003.html" target="_blank" class="swal-link-btn swal-notes-active">Business Practices And Management (F1003)</a>
            <a href="Notes/sem1/C1004.html" target="_blank" class="swal-link-btn swal-notes-active">Introduction to Computer Science (C1004)</a>
            <a href="Notes/sem1/C1005.html" target="_blank" class="swal-link-btn swal-notes-active">Problem Solving and Programming in C (C1005)</a>
            
            <a class="swal-link-btn swal-res-na">Computer Basics and PC Software Lab (P1006)</a>
            <a class="swal-link-btn swal-res-na">C Programming Lab (P1007)</a>
            <a class="swal-link-btn swal-res-cs">Communication Skill Lab (P1008)</a>
			
			<!-- 🔴 EXAMPLE: अगर कोई नोट्स उपलब्ध नहीं कराना है (Not Available दिखेगा और क्लिक नहीं होगा) -->
            <a class="swal-link-btn swal-res-na">Sample Extra Subject (X1006)</a>
        `;
    } else if(sem === 2) {
        notesHtml = `
            <a href="Notes/sem2/F2001.html" target="_blank" class="swal-link-btn swal-notes-active">Basic Mathematics-II (F2001)</a>
            <a href="Notes/sem2/F2002.html" target="_blank" class="swal-link-btn swal-notes-active">Environmental Science (F2002)</a>
            <a href="Notes/sem2/C2003.html" target="_blank" class="swal-link-btn swal-notes-active">Database Management System (C2003)</a>
            <a href="Notes/sem2/C2004.html" target="_blank" class="swal-link-btn swal-notes-active">Object Oriented Programming using C++ (C2004)</a>
            <a href="Notes/sem2/C2005.html" target="_blank" class="swal-link-btn swal-notes-active">Logic Design (C2005)</a>
			
			<!-- 🟡 EXAMPLE: अगर आप भविष्य में कोई नोट्स जोड़ने वाले हैं (Coming Soon दिखेगा और क्लिक नहीं होगा) -->
            <a class="swal-link-btn swal-res-cs">BCA Practical Lab II (P2006)</a>
        `;
    } else if(sem === 3) {
        notesHtml = `
            <a href="Notes/sem3/C3001.html" target="_blank" class="swal-link-btn swal-notes-active">Data Structure using C (C3001)</a>
            <a href="Notes/sem3/C3002.html" target="_blank" class="swal-link-btn swal-notes-active">Java Programming (C3002)</a>
            <a href="Notes/sem3/C3003.html" target="_blank" class="swal-link-btn swal-notes-active">Computer Architecture (C3003)</a>
            <a href="Notes/sem3/C3004.html" target="_blank" class="swal-link-btn swal-notes-active">System Analysis and Design (C3004)</a>
            <a href="Notes/sem3/C3005.html" target="_blank" class="swal-link-btn swal-notes-active">Probability and Statistics (C3005)</a>
        `;
    } else if(sem === 4) {
        notesHtml = `
            <a href="Notes/sem4/C4001.html" target="_blank" class="swal-link-btn swal-notes-active">Multimedia (C4001)</a>
            <a href="Notes/sem4/C4002.html" target="_blank" class="swal-link-btn swal-notes-active">Operating System (C4002)</a>
            <a href="Notes/sem4/C4003.html" target="_blank" class="swal-link-btn swal-notes-active">HTML (C4003)</a>
            <a href="Notes/sem4/C4004.html" target="_blank" class="swal-link-btn swal-notes-active">Visual Programming (C4004)</a>
            <a href="Notes/sem4/C4005.html" target="_blank" class="swal-link-btn swal-notes-active">Computer Networks (C4005)</a>
        `;
    } else if(sem === 5) {
        notesHtml = `
            <a href="Notes/sem5/C5001.html" target="_blank" class="swal-link-btn swal-notes-active">Internet Concept & Web Design (C5001)</a>
            <a href="Notes/sem5/C5002.html" target="_blank" class="swal-link-btn swal-notes-active">Design and Analysis of Algorithms (C5002)</a>
            <a href="Notes/sem5/C5003.html" target="_blank" class="swal-link-btn swal-notes-active">Linux Programming (C5003)</a>
            <a href="Notes/sem5/C5004.html" target="_blank" class="swal-link-btn swal-notes-active">Computer Oriented Numerical Methods (C5004)</a>
            <a href="Notes/sem5/E5007.html" target="_blank" class="swal-link-btn swal-notes-active">E-Commerce (E5007)</a>
        `;
    } else if(sem === 6) {
        notesHtml = `
            <a href="Notes/sem6/C6001.html" target="_blank" class="swal-link-btn swal-notes-active">Optimization Techniques (C6001)</a>
            <a href="Notes/sem6/C6002.html" target="_blank" class="swal-link-btn swal-notes-active">Principle of Management (C6002)</a>
            <a href="Notes/sem6/C6003.html" target="_blank" class="swal-link-btn swal-notes-active">Accounting and Financial Management(C6003)</a>
            <a href="Notes/sem6/C6004.html" target="_blank" class="swal-link-btn swal-notes-active">Network Security (C6004)</a>
            <a href="Notes/sem6/E6007.html" target="_blank" class="swal-link-btn swal-notes-active">Management Information System (E6007)</a>
        `;
    }

    Swal.fire({
        title: title,
        html: `<div style="max-height: 300px; overflow-y: auto; padding-right: 5px;">${notesHtml}</div>`,
        showConfirmButton: false,
        showCloseButton: true,
        background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff',
        color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40'
    });
}
