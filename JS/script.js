// ==================== NEW NAV BAR MENU TOGGLE CODE ====================
let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');

if (menuBtn && navbar) {
    menuBtn.onclick = (e) => {
        navbar.classList.toggle('active');
        e.stopPropagation();
    }
}

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
    setInterval(showNextMember, 3000);
}


// ==================== SWEETALERT INLINE CUSTOM STYLES ====================
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    .swal-link-container {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        margin: 8px 0 !important;
        box-sizing: border-box !important;
    }
    .swal-link-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        flex: 1 !important;
        padding: 12px 15px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #fff !important;
        border-radius: 8px !important;
        text-decoration: none !important;
        transition: 0.2s ease !important;
        box-sizing: border-box !important;
    }
    .swal-share-wa-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 44px !important;
        height: 44px !important;
        background: #25D366 !important;
        color: white !important;
        font-size: 18px !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        transition: transform 0.2s ease, filter 0.2s ease !important;
        text-decoration: none !important;
        box-sizing: border-box !important;
    }
    .swal-share-wa-btn:hover { transform: scale(1.05); filter: brightness(1.1); }
    
    .swal-pyq-active { background: #f44336 !important; cursor: pointer !important; }
    .swal-pyq-active:hover { transform: scale(1.01); filter: brightness(1.1); }
    .swal-pyq-active::after { content: " ✓" !important; color: #00ff88 !important; font-weight: bold !important; font-size: 16px !important; }

    .swal-notes-active { background: #2196f3 !important; cursor: pointer !important; }
    .swal-notes-active:hover { transform: scale(1.01); filter: brightness(1.1); }
    .swal-notes-active::after { content: " ✓" !important; color: #00ff88 !important; font-weight: bold !important; font-size: 16px !important; }

    .swal-res-na { background: #e2e8f0 !important; color: #94a3b8 !important; pointer-events: none !important; border: 1px dashed #cbd5e1 !important; cursor: not-allowed !important; }
    .swal-res-na::after { content: " (N/A)" !important; color: #ef4444 !important; font-size: 11px !important; font-weight: bold !important; }

    .swal-res-cs { background: #f8fafc !important; color: #94a3b8 !important; pointer-events: none !important; border: 1px solid #e2e8f0 !important; cursor: not-allowed !important; }
    .swal-res-cs::after { content: " (Soon)" !important; color: #f59e0b !important; font-size: 11px !important; font-weight: bold !important; }
`;
document.head.appendChild(styleTag);


// ⚡ CORE ENGINE FUNCTION: GENERATE SHARE LINK MATRIX
function getWaShareLink(resourceTitle, fileUrl) {
    const siteUrl = "https://subhamkumar-ray.github.io/bcastudyzone/";
    const textMessage = `📚 *BCA Study Zone Resource Share* 📚\n\nHey! I found the official resource *${resourceTitle}* on BCA Study Zone. You can directly view and access it here:\n👉 ${siteUrl}${fileUrl}\n\nPrepared by Subham Kumar Ray.`;
    return `https://wa.me/?text=${encodeURIComponent(textMessage)}`;
}


// ==================== MASTER PYQ POPUP ENGINE (WITH WHATSAPP SHARE) ====================
function openPyqPopup(sem) {
    let pyqData = {};
    
    if(sem === 1) {
        pyqData = {
            title: '📄 Semester 1 PYQ Papers',
            html: `
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2016-2019)', 'PYQ/sem1/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2017-2020)', 'PYQ/sem1/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container"><a class="swal-link-btn swal-res-na">2018-2021</a></div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2019-2022)', 'PYQ/sem1/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container"><a class="swal-link-btn swal-res-na">2020-2023</a></div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2021-2024)', 'PYQ/sem1/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2022-2025)', 'PYQ/sem1/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2023-2026)', 'PYQ/sem1/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2024_27.html" target="_blank" class="swal-link-btn swal-pyq-active">2024-2027</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2024-2027)', 'PYQ/sem1/2024_27.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem1/2025_28.html" target="_blank" class="swal-link-btn swal-pyq-active">2025-2028</a>
                    <a href="${getWaShareLink('Semester 1 PYQ (2025-2028)', 'PYQ/sem1/2025_28.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
            `
        };
    } else if(sem === 2) {
        pyqData = {
            title: '📄 Semester 2 PYQ Papers',
            html: `
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2016-2019)', 'PYQ/sem2/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2017-2020)', 'PYQ/sem2/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2018-2021)', 'PYQ/sem2/2018_21.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-na">2019-2022</a></div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2020-2023)', 'PYQ/sem2/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2021-2024)', 'PYQ/sem2/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2022-2025)', 'PYQ/sem2/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2023-2026)', 'PYQ/sem2/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem2/2024_27.html" target="_blank" class="swal-link-btn swal-pyq-active">2024-2027</a>
                    <a href="${getWaShareLink('Semester 2 PYQ (2024-2027)', 'PYQ/sem2/2024_27.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container"><a class="swal-link-btn swal-res-cs">2025-2028</a></div>
            `
        };
    } else if(sem === 3) {
        pyqData = {
            title: '📄 Semester 3 PYQ Papers',
            html: `
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2015-2018)', 'PYQ/sem3/2015_18.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2016-2019)', 'PYQ/sem3/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2017-2020)', 'PYQ/sem3/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2020-2023)', 'PYQ/sem3/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2021-2024)', 'PYQ/sem3/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2022-2025)', 'PYQ/sem3/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
                    <a href="PYQ/sem3/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2023-2026)', 'PYQ/sem3/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2024-2027</a>
				</div>
            `
        };
    } else if(sem === 4) {
        pyqData = { 
		title: '📄 Semester 4 PYQ Papers', 
		html: `
				<div class="swal-link-container">
					<a href="PYQ/sem4/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2015-2018)', 'PYQ/sem4/2015_18.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2016-2019)', 'PYQ/sem4/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2017-2020)', 'PYQ/sem4/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-21</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2018-2021)', 'PYQ/sem4/2018_21.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-22</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2019-2022)', 'PYQ/sem4/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-23</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2020-2023)', 'PYQ/sem4/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-24</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2021-2024)', 'PYQ/sem4/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-25</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2022-2025)', 'PYQ/sem4/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-26</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2023-2026)', 'PYQ/sem4/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2024-27</a>
				</div>
			` 
		};
    } else if(sem === 5) {
        pyqData = { 
		title: '📄 Semester 5 PYQ Papers', 
		html: `
				<div class="swal-link-container">
					<a href="PYQ/sem5/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-19</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2016-2019)', 'PYQ/sem5/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-22</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2019-2022)', 'PYQ/sem5/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-23</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2020-2023)', 'PYQ/sem5/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-24</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2021-2024)', 'PYQ/sem5/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-25</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2022-2025)', 'PYQ/sem5/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-26</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2023-2026)', 'PYQ/sem5/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-cs">2024-27</a></div>
			` 
		};
    } else if(sem === 6) {
        pyqData = { 
		title: '📄 Semester 6 PYQ Papers', 
		html: `
				<div class="swal-link-container">
					<a href="PYQ/sem6/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-18</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2015-2018)', 'PYQ/sem6/2015_18.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-19</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2016-2019)', 'PYQ/sem6/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-20</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2017-2020)', 'PYQ/sem6/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-21</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2018-2021)', 'PYQ/sem6/2018_21.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-23</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2020-2023)', 'PYQ/sem6/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-24</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2021-2024)', 'PYQ/sem6/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-25</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2022-2025)', 'PYQ/sem6/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2023-26</a>
				</div>
				<div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2024-27</a>
				</div>
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


// ==================== MASTER NOTES POPUP ENGINE (WITH WHATSAPP SHARE) ====================
function openNotesPopup(sem) {
    let notesHtml = "";
    let title = `📘 Semester ${sem} Notes`;

    if(sem === 1) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem1/F1001.html" target="_blank" class="swal-link-btn swal-notes-active">Business Communications (F1001)</a>
				<a href="${getWaShareLink('Business Communications Notes (F1001)', 'Notes/sem1/F1001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem1/F1002.html" target="_blank" class="swal-link-btn swal-notes-active">Basic Mathematics-I (F1002)</a>
				<a href="${getWaShareLink('Basic Mathematics-I Notes (F1002)', 'Notes/sem1/F1002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem1/F1003.html" target="_blank" class="swal-link-btn swal-notes-active">Business Practices And Mgmt (F1003)</a>
				<a href="${getWaShareLink('Business Practices and Management Notes (F1003)', 'Notes/sem1/F1003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem1/C1004.html" target="_blank" class="swal-link-btn swal-notes-active">Intro to Computer Science (C1004)</a>
				<a href="${getWaShareLink('Introduction to Computer Science Notes (C1004)', 'Notes/sem1/C1004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem1/C1005.html" target="_blank" class="swal-link-btn swal-notes-active">Programming in C (C1005)</a>
				<a href="${getWaShareLink('Problem Solving and C Programming Notes (C1005)', 'Notes/sem1/C1005.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a class="swal-link-btn swal-res-na">PC Software Lab (P1006)</a>
			</div>
            <div class="swal-link-container">
				<a class="swal-link-btn swal-res-na">C Programming Lab (P1007)</a>
			</div>
            <div class="swal-link-container">
				<a class="swal-link-btn swal-res-cs">Communication Skill Lab (P1008)</a>
			</div>
        `;
    } else if(sem === 2) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem2/F2001.html" target="_blank" class="swal-link-btn swal-notes-active">Basic Mathematics-II (F2001)</a>
				<a href="${getWaShareLink('Basic Mathematics-II Notes (F2001)', 'Notes/sem2/F2001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem2/F2002.html" target="_blank" class="swal-link-btn swal-notes-active">Environmental Science (F2002)</a>
				<a href="${getWaShareLink('Environmental Science Notes (F2002)', 'Notes/sem2/F2002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem2/C2003.html" target="_blank" class="swal-link-btn swal-notes-active">Database Management System (C2003)</a>
				<a href="${getWaShareLink('Database Management System Notes (C2003)', 'Notes/sem2/C2003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem2/C2004.html" target="_blank" class="swal-link-btn swal-notes-active">OOP using C++ (C2004)</a>
				<a href="${getWaShareLink('Object Oriented Programming C++ Notes (C2004)', 'Notes/sem2/C2004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem2/C2005.html" target="_blank" class="swal-link-btn swal-notes-active">Logic Design (C2005)</a>
				<a href="${getWaShareLink('Logic Design Notes (C2005)', 'Notes/sem2/C2005.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
        `;
    } else if(sem === 3) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem3/C3001.html" target="_blank" class="swal-link-btn swal-notes-active">Data Structure using C (C3001)</a>
				<a href="${getWaShareLink('Data Structure using C Notes (C3001)', 'Notes/sem3/C3001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem3/C3002.html" target="_blank" class="swal-link-btn swal-notes-active">Java Programming (C3002)</a>
				<a href="${getWaShareLink('Java Programming Notes (C3002)', 'Notes/sem3/C3002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem3/C3003.html" target="_blank" class="swal-link-btn swal-notes-active">Computer Architecture (C3003)</a>
				<a href="${getWaShareLink('Computer Architecture Notes (C3003)', 'Notes/sem3/C3003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem3/C3004.html" target="_blank" class="swal-link-btn swal-notes-active">System Analysis & Design (C3004)</a>
				<a href="${getWaShareLink('System Analysis and Design Notes (C3004)', 'Notes/sem3/C3004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem3/C3005.html" target="_blank" class="swal-link-btn swal-notes-active">Probability & Statistics (C3005)</a>
				<a href="${getWaShareLink('Probability and Statistics Notes (C3005)', 'Notes/sem3/C3005.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
        `;
    } else if(sem === 4) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem4/C4001.html" target="_blank" class="swal-link-btn swal-notes-active">Multimedia (C4001)</a>
				<a href="${getWaShareLink('Multimedia Notes (C4001)', 'Notes/sem4/C4001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem4/C4002.html" target="_blank" class="swal-link-btn swal-notes-active">Operating System (C4002)</a>
				<a href="${getWaShareLink('Operating System Notes (C4002)', 'Notes/sem4/C4002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem4/C4003.html" target="_blank" class="swal-link-btn swal-notes-active">HTML Engine Docs (C4003)</a>
				<a href="${getWaShareLink('HTML Core Subject Notes (C4003)', 'Notes/sem4/C4003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem4/C4004.html" target="_blank" class="swal-link-btn swal-notes-active">Visual Programming (C4004)</a>
				<a href="${getWaShareLink('Visual Programming Notes (C4004)', 'Notes/sem4/C4004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem4/C4005.html" target="_blank" class="swal-link-btn swal-notes-active">Computer Networks (C4005)</a>
				<a href="${getWaShareLink('Computer Networks Notes (C4005)', 'Notes/sem4/C4005.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
        `;
    } else if(sem === 5) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem5/C5001.html" target="_blank" class="swal-link-btn swal-notes-active">Internet Concept & Web Design</a>
				<a href="${getWaShareLink('Internet Concept & Web Design Notes (C5001)', 'Notes/sem5/C5001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem5/C5002.html" target="_blank" class="swal-link-btn swal-notes-active">Design & Analysis of Algorithms</a>
				<a href="${getWaShareLink('Design and Analysis of Algorithms Notes (C5002)', 'Notes/sem5/C5002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem5/C5003.html" target="_blank" class="swal-link-btn swal-notes-active">Linux Programming (C5003)</a>
				<a href="${getWaShareLink('Linux Programming Notes (C5003)', 'Notes/sem5/C5003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem5/C5004.html" target="_blank" class="swal-link-btn swal-notes-active">Numerical Methods (C5004)</a>
				<a href="${getWaShareLink('Computer Oriented Numerical Methods Notes (C5004)', 'Notes/sem5/C5004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem5/E5007.html" target="_blank" class="swal-link-btn swal-notes-active">E-Commerce Matrix (E5007)</a>
				<a href="${getWaShareLink('E-Commerce Subject Notes (E5007)', 'Notes/sem5/E5007.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
        `;
    } else if(sem === 6) {
        notesHtml = `
            <div class="swal-link-container">
				<a href="Notes/sem6/C6001.html" target="_blank" class="swal-link-btn swal-notes-active">Optimization Techniques (C6001)</a>
				<a href="${getWaShareLink('Optimization Techniques Notes (C6001)', 'Notes/sem6/C6001.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem6/C6002.html" target="_blank" class="swal-link-btn swal-notes-active">Principle of Management (C6002)</a>
				<a href="${getWaShareLink('Principle of Management Notes (C6002)', 'Notes/sem6/C6002.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem6/C6003.html" target="_blank" class="swal-link-btn swal-notes-active">Accounting & Finance (C6003)</a>
				<a href="${getWaShareLink('Accounting and Financial Management Notes (C6003)', 'Notes/sem6/C6003.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem6/C6004.html" target="_blank" class="swal-link-btn swal-notes-active">Network Security (C6004)</a>
				<a href="${getWaShareLink('Network Security Notes (C6004)', 'Notes/sem6/C6004.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
            <div class="swal-link-container">
				<a href="Notes/sem6/E6007.html" target="_blank" class="swal-link-btn swal-notes-active">Management Info System (E6007)</a>
				<a href="${getWaShareLink('Management Information System Notes (E6007)', 'Notes/sem6/E6007.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
			</div>
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

// Smart Network Connectivity Monitor
window.addEventListener('online', () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Connection Restored',
        text: 'You are back online. All systems synchronized.',
        showConfirmButton: false,
        timer: 3000
    });
});

window.addEventListener('offline', () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Connection Interrupted',
        text: 'Network offline. Please verify your internet settings.',
        showConfirmButton: false
    });
});

// ==================== 🌌 SYNCHRONIZED PORTAL HANDSHAKE CONTROLLER (FIXED SEQUENCE) ====================

function startPortalHandshakeSequence() {
    const gatewayScreen = document.getElementById("brand-gateway-screen");
    if (!gatewayScreen) return;

    gatewayScreen.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    gatewayScreen.style.opacity = "0";
    gatewayScreen.style.transform = "scale(1.05)";

    setTimeout(() => {
        gatewayScreen.style.display = "none";
        executeDynamicGatewayLoader(); // Loader starts right here safely
    }, 500);
}

function executeDynamicGatewayLoader() {
    let loaderNode = document.getElementById("loader");
    let mainPageNode = document.getElementById("mainPage");
    let counterNode = document.getElementById("count");
    let progressCircleNode = document.getElementById("progress");

    if (!loaderNode || !mainPageNode) return;

    // 🔒 Enforce full security: ensure notice popup stays hidden while loading
    if (document.getElementById("noticePopup")) {
        document.getElementById("noticePopup").style.display = "none";
    }

    loaderNode.style.display = "flex";
    mainPageNode.style.display = "none";

    let currentPercent = 1;
    let radiusValue = 70;
    let totalCircumference = 2 * Math.PI * radiusValue;

    if (progressCircleNode) {
        progressCircleNode.style.strokeDasharray = totalCircumference;
        progressCircleNode.style.strokeDashoffset = totalCircumference;
    }

    let gatewayLoaderInterval = setInterval(() => {
        if (counterNode) counterNode.innerText = currentPercent + "%";

        if (progressCircleNode) {
            let offsetMetrics = totalCircumference - (currentPercent / 100) * totalCircumference;
            progressCircleNode.style.strokeDashoffset = offsetMetrics;
        }

        currentPercent++;

        if (currentPercent > 100) {
            clearInterval(gatewayLoaderInterval);
            
            // 🎬 1. Hide Loader ring layout
            loaderNode.style.display = "none";
            
            // 🎬 2. Open Main Website Dashboard Content Canvas
            mainPageNode.style.display = "block";

            // 🎬 3. Show the official Hindi Welcome speech popup card first!
            if (document.getElementById("voicePopup")) {
                document.getElementById("voicePopup").style.display = "flex";
            }
        }
    }, 30);
}
// 🎬 4. UPDATE INTERCEPTOR: Modified handler to route directly into VBU notices on complete
function handleEnglishVoiceAndOpen() {
    if (typeof speakEnglishIndian === "function") {
        speakEnglishIndian(); // Trigger speech audio voice matrix
    }
    
    // Hide the नमस्ते voice popup card frame
    document.getElementById("voicePopup").style.display = "none";
    document.getElementById("mainPage").style.display = "block";

    // 🎯 MAGIC STEP: Jaise hi bacha audio click karke "Continue" karega, tab VBU Notice popup automatic samne load hoga!
    if (typeof triggerVbuNoticePopupMetrics === "function") {
        triggerVbuNoticePopupMetrics();
    }
}
