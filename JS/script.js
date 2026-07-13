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

// =========================================================================
// 🧠 SYNC NETWORK MATRIX PROTOCOL: MASTER LOGIC SEQUENCE ENGINE
// =========================================================================

// SEQUENCE STEP 1: USER CLICKS 'ENTER PORTAL' ON GATEWAY
function startPortalHandshakeSequence() {
    const gatewayScreen = document.getElementById("brand-gateway-screen");
    const loaderNode = document.getElementById("loader");

    if (!gatewayScreen || !loaderNode) return;

    gatewayScreen.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    gatewayScreen.style.opacity = "0";
    gatewayScreen.style.transform = "scale(1.03)";

    setTimeout(() => {
        gatewayScreen.style.display = "none";
        
        // Execute Phase 2: Upgraded Gravity Loader
        executeDynamicGatewayLoader();
    }, 400);
}

// SEQUENCE STEP 2: RUNS THE 1% TO 100% MULTICOLOR GRAVITY MATRIX
function executeDynamicGatewayLoader() {
    let loaderNode = document.getElementById("loader");
    let mainPageNode = document.getElementById("mainPage");
    let counterNode = document.getElementById("count");
    let canvas = document.getElementById("loader-particle-canvas");

    if (!loaderNode || !mainPageNode || !canvas) return;

    if (document.getElementById("noticePopup")) {
        document.getElementById("noticePopup").style.display = "none";
    }

    loaderNode.style.display = "flex";
    loaderNode.style.opacity = "1";
    mainPageNode.style.display = "none";

    // Setup Canvas Boundaries
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let currentPercent = 1;
    const bubbleColors = ["#ff3838", "#ffd700", "#00ff88", "#ffffff"]; // Red, Yellow, Green, White

    // Sateek center focus jahan photo bada hua hai
    const targetX = canvas.width / 2;
    const targetY = canvas.height / 2 - 18; // Adjusted anchor metrics according to larger box size

    class LoadingParticle {
        constructor() {
            let angle = Math.random() * Math.PI * 2;
            // Particles boundary screen distribution
            let distance = Math.random() * (canvas.width * 0.4) + 220; 
            this.x = targetX + Math.cos(angle) * distance;
            this.y = targetY + Math.sin(angle) * distance;
            
            this.size = Math.random() * 3 + 2;
            this.color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
            this.speed = Math.random() * 0.035 + 0.012;
            this.angle = angle;
        }
        update() {
            let dx = targetX - this.x;
            let dy = targetY - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            // Larger center photo radius guard (140px size integration)
            if (dist > 65) { 
                let factor = (currentPercent / 100) * this.speed * 2.5;
                this.x += dx * factor;
                this.y += dy * factor;
            } else {
                let angle = Math.random() * Math.PI * 2;
                let distance = Math.random() * 120 + canvas.width * 0.4;
                this.x = targetX + Math.cos(angle) * distance;
                this.y = targetY + Math.sin(angle) * distance;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Initialize 75 particle bits
    for (let i = 0; i < 75; i++) {
        particlesArray.push(new LoadingParticle());
    }

    function animateLoader() {
        if (currentPercent > 100) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateLoader);
    }
    animateLoader();

    // Constant Percentage Loop Control
    // Constant Percentage Loop Control
    let gatewayLoaderInterval = setInterval(() => {
        if (counterNode) counterNode.innerText = currentPercent + "%";
        currentPercent++;

        if (currentPercent > 100) {
            clearInterval(gatewayLoaderInterval);
            
            loaderNode.style.transition = "opacity 0.4s ease";
            loaderNode.style.opacity = "0";
            
            setTimeout(() => {
                loaderNode.style.display = "none";
                
                // ❌ Puraani mainPageNode aur voicePopup direct logic ko humne yahan se bypass kiya
                // 🚀 NAYA CORRECTION: Loader 100% hote hi pehle Student Identity Tracking Engine active hoga!
                initIdentityTrackingVerification();
            }, 400);
        }
    }, 32);
}

// SEQUENCE STEP 4: TRIGGERED WHEN USER CLOSES HINDI VOICE POPUP
function handleEnglishVoiceAndOpen() {
    if (typeof speakEnglishIndian === "function") {
        speakEnglishIndian();
    }
    
    document.getElementById("voicePopup").style.display = "none";
    document.getElementById("mainPage").style.display = "block";

    if (typeof triggerVbuNoticePopupMetrics === "function") {
        triggerVbuNoticePopupMetrics();
    }
}

// ⚡ SECURE ANTI-FLICKER HANDSHAKE: GATEWAY SYNC AUTO-CONTROLLER (FIXED)
document.addEventListener("DOMContentLoaded", () => {
    const gatewayScreen = document.getElementById("brand-gateway-screen");
    const loaderNode = document.getElementById("loader");
    const mainPageNode = document.getElementById("mainPage");

    // Pre-load cleanups
    if (loaderNode) loaderNode.style.display = "none";

    // 🔥 SMART CHECK: Agar bacha verified hai, toh screen load hote hi pehle main content area ko bypass karke show kar do taaki flicker na ho!
    if (localStorage.getItem("student_verified_profile") === "true" && localStorage.getItem("student_portal_uid")) {
        
        if (gatewayScreen) gatewayScreen.style.display = "none"; // Refresh par jhatka roko (Hide gateway instantly)
        if (mainPageNode) mainPageNode.style.display = "block";  // Seedhe website ka main page kholo
        
        // Background me chupchaap check lagayein ki kahin admin ne data delete toh nahi kiya
        if (typeof initIdentityTrackingVerification === "function") {
            initIdentityTrackingVerification();
        }
    } else {
        // Agar naya student hai ya browser clear hai, toh pure gateway animations ke sath launch karein
        if (gatewayScreen) {
            gatewayScreen.style.display = "flex";
            gatewayScreen.style.opacity = "1";
        }
        if (mainPageNode) mainPageNode.style.display = "none";
    }
});

// =========================================================================
// 🧠 LIVE SYNC MATRIX: FIREBASE LIVE CHECK (DELETE IN DB = RESET ON WEBSITE)
// =========================================================================

// Loader complete hote hi hum is function ko trigger karenge
function initIdentityTrackingVerification() {
    // Unique session/student ID jo local memory mein save hoti hai
    const studentUID = localStorage.getItem("student_portal_uid");

    // 🎯 CASE A: Agar bacha pehle se details bhar chuka hai, toh live database check karo
    if (localStorage.getItem("student_verified_profile") === "true" && studentUID) {
        
        console.log("Verifying active database credentials with Firebase Cloud...");
        
        // Live check url for that specific student ID
        const checkUrl = `https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers/${studentUID}.json`;

        fetch(checkUrl)
        .then(response => response.json())
        .then(dbData => {
            // 🚨 CRITICAL LOCK: Agar Firebase mein data NULL hai (yaani tumne delete kar diya hai)
            if (!dbData) {
    console.log("Identity revoked by admin. Force resetting client portal memory...");
    // Poori local memory aur bypass token ko clean karein
    localStorage.removeItem("student_verified_profile");
    localStorage.removeItem("student_tracked_name");
    localStorage.removeItem("student_tracked_college");
    localStorage.removeItem("student_tracked_sem");
    localStorage.removeItem("student_portal_uid");
    localStorage.removeItem("portal_already_entered"); // 👈 Yeh nayi line add hui hai memory flush karne ke liye

    // 🚀 ENTER PORTAL WALI SCREEN KO DOBARA UTPAAN (SHOW) KAREIN
    const gatewayScreen = document.getElementById("brand-gateway-screen");
    if (gatewayScreen) {
        gatewayScreen.style.display = "flex";
        gatewayScreen.style.opacity = "1";
    }

    if (document.getElementById("studentTrackingPopup")) {
        document.getElementById("studentTrackingPopup").style.display = "flex";
    }
    return;
}

            // 🔄 CASE B: Agar data database mein HAI, toh welcome back process karo (Only Telegram Alert)
            const savedName = dbData.studentName || "Existing Student";
            const savedCollege = dbData.collegeName || "Saved College";
            const savedSem = dbData.currentSemester || "Saved Semester";
            
            const lastVisitTimeStr = localStorage.getItem("student_last_visit_readable") || "First Session";
            const lastVisitTimestamp = parseInt(localStorage.getItem("student_last_visit_timestamp")) || Date.now();
            
            const currentTimestamp = Date.now();
            const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            
            // ⏳ GAP CALCULATION MATRIX
            const diffInMilliseconds = currentTimestamp - lastVisitTimestamp;
            const totalSeconds = Math.floor(diffInMilliseconds / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);
            
            let gapString = "";
            if (totalDays > 0) gapString += `${totalDays} Days, `;
            if ((totalHours % 24) > 0 || totalDays > 0) gapString += `${totalHours % 24} Hours, `;
            if ((totalMinutes % 60) > 0 || totalHours > 0) gapString += `${totalMinutes % 60} Minutes, `;
            gapString += `${totalSeconds % 60} Seconds`;

            localStorage.setItem("student_last_visit_timestamp", currentTimestamp.toString());
            localStorage.setItem("student_last_visit_readable", formattedDate);
            
            const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; 
            const chatId = '@bca_dashboard_subham'; 
            
            const telegramRevisitMessage = `🔄 *STUDENT RETURNED (WELCOME BACK)* 🔄\n\n` +
                                         `👤 *Student Name:* ${savedName}\n` +
                                         `🏫 *College:* ${savedCollege}\n` +
                                         `📚 *Semester:* ${savedSem}\n\n` +
                                         `🕒 *Current Return:* ${formattedDate}\n` +
                                         `⏮️ *Last Active Was:* ${lastVisitTimeStr}\n` +
                                         `⏳ *Total Offline Gap:* _${gapString}_\n\n` +
                                         `📱 *Device:* ${navigator.platform}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: telegramRevisitMessage, parse_mode: 'Markdown' }) 
            }).catch(tErr => console.log("Telegram buffer bypassed."));

            proceedToVoicePopupHandover();
        })
        // Fallback: Agar internet down ho ya server response na de, toh smooth experience ke liye direct enter hone do
        .catch(err => {
            console.log("Database fetch offline latency bypass:", err);
            proceedToVoicePopupHandover();
        });

    } else {
        // Agar bilkul naya bacha hai, toh dabba screen par display karo
        if (document.getElementById("studentTrackingPopup")) {
            document.getElementById("studentTrackingPopup").style.display = "flex";
        }
    }
}

function submitStudentMetadataPipeline() {
    const name = document.getElementById("track-student-name").value.trim();
    const college = document.getElementById("track-student-college").value;
    const semester = document.getElementById("track-student-sem").value;
    const verifyBtn = document.getElementById("trackVerifyBtn");

    // 🚨 ANTI-SPAM INPUT VALIDATION GUARDS
    if (!name || !college || !semester) {
        alert("⚠️ Fields Cannot Be Empty!\n\nपोर्टल अनलॉक करने के लिए कृपया सभी डिटेल्स को सही से भरें।");
        return;
    }
    const nameParts = name.split(/\s+/).filter(word => word.length > 0);
    const alphaOnlyRegex = /^[a-zA-Z\s]+$/;
    const junkPatternRegex = /(.)\1{2,}/i; 

    if (!alphaOnlyRegex.test(name)) {
        alert("⚠️ Invalid Name!\n\nName mein keval English letters allowed hain.");
        return;
    }
    if (nameParts.length < 2) {
        alert("⚠️ Full Name Required!\n\nPlease enter your complete professional name (First Name & Last Name).");
        return;
    }
    if (junkPatternRegex.test(name.replace(/\s/g, ''))) {
        alert("⚠️ Spam Pattern Detected!\n\nPlease enter your genuine real name.");
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.innerText = "VERIFYING MATRIX...";

    const currentTimestamp = Date.now().toString(); // This is the unique key
    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const structuredName = name.replace(/\b\w/g, char => char.toUpperCase());

    // 🔒 INITIAL SECURITY MEMORY RECORD
    localStorage.setItem("student_tracked_name", structuredName);
    localStorage.setItem("student_tracked_college", college);
    localStorage.setItem("student_tracked_sem", semester);
    localStorage.setItem("student_last_visit_timestamp", currentTimestamp);
    localStorage.setItem("student_last_visit_readable", formattedDate);
    localStorage.setItem("student_portal_uid", currentTimestamp); // Unique ID Lock

    // 🚀 PIPELINE A: TELEGRAM FIRST TIMERS
    const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; 
    const chatId = '@bca_dashboard_subham'; 
    
    const telegramAlertMessage = `🎓 *PORTAL ACCESS DETECTED* 🎓\n\n` +
                                 `👤 *Student Name:* ${structuredName}\n` +
                                 `🏫 *College:* ${college}\n` +
                                 `📚 *Semester:* ${semester}\n` +
                                 `🕒 *Active Time:* ${formattedDate}\n` +
                                 `📱 *Device Sync:* ${navigator.platform}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: telegramAlertMessage, parse_mode: 'Markdown' }) 
    }).catch(err => console.log("Telegram fallback active."));

    // 🚀 PIPELINE B: FIREBASE SYNCHRONIZATION
    const firebaseDatabaseUrl = `https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers/${currentTimestamp}.json`;

    fetch(firebaseDatabaseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentName: structuredName,
            collegeName: college,
            currentSemester: semester,
            entryTime: formattedDate,
            platform: navigator.platform
        })
    })
    .then(() => {
        console.log("Registered to Firebase Sync Matrix successfully.");
        completeTrackingSequence();
    })
    .catch((error) => {
        console.error("Firebase connection latency bypass:", error);
        completeTrackingSequence();
    });
}

function completeTrackingSequence() {
    localStorage.setItem("student_verified_profile", "true");
    
    // 🔥 YEH NAYI LINE ADD KARNI HAI (Agle saare visits ke liye gateway aur loader ko block karne ke liye)
    localStorage.setItem("portal_already_entered", "true");

    if (document.getElementById("studentTrackingPopup")) {
        document.getElementById("studentTrackingPopup").style.display = "none";
    }
    proceedToVoicePopupHandover();
}

function proceedToVoicePopupHandover() {
    if (localStorage.getItem("notification_registered") === "true") {
        if (document.getElementById("voicePopup")) {
            document.getElementById("voicePopup").style.display = "flex";
        } else if (document.getElementById("mainPage")) {
            document.getElementById("mainPage").style.display = "block";
        }
    } else {
        if (document.getElementById("notificationRequestPopup")) {
            document.getElementById("notificationRequestPopup").style.display = "flex";
        } else if (document.getElementById("voicePopup")) {
            document.getElementById("voicePopup").style.display = "flex";
        }
    }
}

// =========================================================================
// 🧠 DASHBOARD CORE FLOW INTERACTIVE FILTER ENGINE (NO ANNOTATION MIX)
// =========================================================================

function filterSemesterDashboard(selectedSem) {
    // 1. Saare tab buttons se active class hatao aur selected wale par add karo
    const tabs = document.querySelectorAll('.sem-tab-btn');
    tabs.forEach((tab, index) => {
        if (index === (selectedSem - 1)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // 2. Pehle purane cards se animate class hatao aur unhe hide karne ka space do
    const cards = document.querySelectorAll('.sem-display-card');
    cards.forEach(card => {
        card.classList.remove('show-card');
        
        // Animation smooth lage isliye micro-timeout injection lagaya hai
        setTimeout(() => {
            if (parseInt(card.getAttribute('data-sem')) === selectedSem) {
                card.classList.add('show-card');
            }
        }, 150);
    });
}
