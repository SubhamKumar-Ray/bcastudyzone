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
				<div class"swal-link-container">
					<a class="swal-link-btn swal-res-cs">2026-2029</a>
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
                <div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2025-2028</a>
				</div>
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
				<div class="swal-link-container"><a class="swal-link-btn swal-res-na">2018-2021</a></div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-na">2019-2022</a></div>
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
					<a href="PYQ/sem3/2024_27.html" target="_blank" class="swal-link-btn swal-pyq-active">2024-2027</a>
                    <a href="${getWaShareLink('Semester 3 PYQ (2024-2027)', 'PYQ/sem3/2024_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
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
					<a href="PYQ/sem4/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2018-2021)', 'PYQ/sem4/2018_21.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2019-2022)', 'PYQ/sem4/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2020-2023)', 'PYQ/sem4/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2021-2024)', 'PYQ/sem4/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2022-2025)', 'PYQ/sem4/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem4/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
					<a href="${getWaShareLink('Semester 4 PYQ (2023-2026)', 'PYQ/sem4/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2024-2027</a>
				</div>
			` 
		};
    } else if(sem === 5) {
        pyqData = { 
		title: '📄 Semester 5 PYQ Papers', 
		html: `
				<div class="swal-link-container">
					<a href="PYQ/sem5/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2016-2019)', 'PYQ/sem5/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-na">2017-2020</a></div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-na">2018-2021</a></div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2019-2022)', 'PYQ/sem5/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2020-2023)', 'PYQ/sem5/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2021-2024)', 'PYQ/sem5/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2022-2025)', 'PYQ/sem5/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem5/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
					<a href="${getWaShareLink('Semester 5 PYQ (2023-2026)', 'PYQ/sem5/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container"><a class="swal-link-btn swal-res-cs">2024-2027</a></div>
			` 
		};
    } else if(sem === 6) {
        pyqData = { 
		title: '📄 Semester 6 PYQ Papers', 
		html: `
				<div class="swal-link-container">
					<a href="PYQ/sem6/2015_18.html" target="_blank" class="swal-link-btn swal-pyq-active">2015-2018</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2015-2018)', 'PYQ/sem6/2015_18.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2016_19.html" target="_blank" class="swal-link-btn swal-pyq-active">2016-2019</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2016-2019)', 'PYQ/sem6/2016_19.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2017_20.html" target="_blank" class="swal-link-btn swal-pyq-active">2017-2020</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2017-2020)', 'PYQ/sem6/2017_20.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2018_21.html" target="_blank" class="swal-link-btn swal-pyq-active">2018-2021</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2018-2021)', 'PYQ/sem6/2018_21.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2019_22.html" target="_blank" class="swal-link-btn swal-pyq-active">2019-2022</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2019-2022)', 'PYQ/sem6/2019_22.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2020_23.html" target="_blank" class="swal-link-btn swal-pyq-active">2020-2023</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2020-2023)', 'PYQ/sem6/2020_23.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2021_24.html" target="_blank" class="swal-link-btn swal-pyq-active">2021-2024</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2021-2024)', 'PYQ/sem6/2021_24.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2022_25.html" target="_blank" class="swal-link-btn swal-pyq-active">2022-2025</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2022-2025)', 'PYQ/sem6/2022_25.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a href="PYQ/sem6/2023_26.html" target="_blank" class="swal-link-btn swal-pyq-active">2023-2026</a>
					<a href="${getWaShareLink('Semester 6 PYQ (2023-2026)', 'PYQ/sem6/2023_26.html')}" target="_blank" class="swal-share-wa-btn"><i class="fab fa-whatsapp"></i></a>
				</div>
				<div class="swal-link-container">
					<a class="swal-link-btn swal-res-cs">2024-2027</a>
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
            
            const telegramRevisitMessage = `🔄 *STUDENT RETURNED (WELCOME BACK)* 🔄\n\n` +
                                         `👤 *Student Name:* ${savedName}\n` +
                                         `🏫 *College:* ${savedCollege}\n` +
                                         `📚 *Semester:* ${savedSem}\n\n` +
                                         `🕒 *Current Return:* ${formattedDate}\n` +
                                         `⏮️ *Last Active Was:* ${lastVisitTimeStr}\n` +
                                         `⏳ *Total Offline Gap:* _${gapString}_\n\n` +
                                         `📱 *Device:* ${navigator.platform}`;

            // 🚀 Secure Google Apps Script Proxy Call
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx761_6FchoKp05elYLPhg8q7muURLuwWGqND3TZKjVwi1YI62vOISFRHmqfG-A4BU3/exec';

            fetch(SCRIPT_URL, { 
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: telegramRevisitMessage }) 
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
    // ❌ वॉइस पॉपअप को पूरी तरह छिपा दिया गया है
    if (document.getElementById("voicePopup")) {
        document.getElementById("voicePopup").style.display = "none";
    }
    
    // 🚀 यूजर सीधे मुख्य वेबसाइट (Main Page) पर पहुँच जाएगा
    if (document.getElementById("mainPage")) {
        document.getElementById("mainPage").style.display = "block";
    }

    // अगर कोई VBU नोटिस अलर्ट पॉपअप है तो वो ट्रिगर हो जाएगा
    if (typeof triggerVbuNoticePopupMetrics === "function") {
        triggerVbuNoticePopupMetrics();
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
// =========================================================================
// 🚀 DYNAMIC COACHING & PROMOTIONAL ADS DATA MATRIX (Call & WhatsApp Only)
// =========================================================================

// 👉 यहाँ आप जितने चाहें उतने Ads जोड़ सकते हैं (प्रत्येक Ad के नीचे उसी का नंबर और WhatsApp रहेगा)
const coachingAdsList = [
    // 1️⃣ POSTER 2: Dosti & Yaadein (Memories)
    {
        id: "bca_memories_poster",
        badge: "❤️ BCA MEMORIES • BATCH 2023-2026",
        badgeStyle: "badge-red",
        poster: "Gallary/poster2.jpeg", //[cite: 6]
        buttons: [
            {
                type: "call",
                text: "Call Subham",
                icon: "fas fa-phone-alt",
                link: "tel:7061637118", //[cite: 6]
                style: "background: linear-gradient(135deg, #2563eb, #1d4ed8);"
            },
            {
                type: "whatsapp",
                text: "Share Memories",
                icon: "fab fa-whatsapp",
                link: "https://wa.me/917061637118?text=" + encodeURIComponent("Hello Subham! I saw the BCA batch memory poster (2023-26) on BCA Study Zone. Great memories! ❤️"),
                style: "background: linear-gradient(135deg, #25d366, #128c7e);"
            }
        ]
    },

    // 2️⃣ POSTER: Official Website Promo
    {
        id: "study_zone_promo",
        badge: "📚 OFFICIAL BCA STUDY PORTAL",
        badgeStyle: "badge-blue",
        poster: "Gallary/Poster.png", //[cite: 6]
        buttons: [
            {
                type: "link",
                text: "Explore Notes",
                icon: "fas fa-book-open",
                link: "#footer", //[cite: 1]
                style: "background: linear-gradient(135deg, #0284c7, #0369a1);"
            },
            {
                type: "whatsapp",
                text: "Get Study Help",
                icon: "fab fa-whatsapp",
                link: "https://wa.me/917061637118?text=" + encodeURIComponent("Hello Subham Sir, I want complete notes and PYQ study resources for BCA."),
                style: "background: linear-gradient(135deg, #25d366, #128c7e);"
            }
        ]
    },

    // 3️⃣ POSTER 1: Official BCA Farewell Celebration
    {
        id: "bca_farewell_celebration",
        badge: "🎓 BCA FAREWELL • 2023-2026",
        badgeStyle: "badge-gold",
        poster: "Gallary/poster1.jpeg", //[cite: 6]
        buttons: [
            {
                type: "call",
                text: "Contact Us",
                icon: "fas fa-phone-alt",
                link: "tel:7061637118", //[cite: 6]
                style: "background: linear-gradient(135deg, #2563eb, #1d4ed8);"
            },
            {
                type: "whatsapp",
                text: "Send Wishes",
                icon: "fab fa-whatsapp",
                link: "https://wa.me/917061637118?text=" + encodeURIComponent("Hello Subham! I saw the BCA Farewell 2023-2026 poster on BCA Study Zone. Best of luck for the future! 🎓"),
                style: "background: linear-gradient(135deg, #25d366, #128c7e);"
            }
        ]
    },

    // 4️⃣ Coaching Ad (Randhir Sir)
    {
        id: "randhir_coaching",
        badge: "🎓 SPECIAL BCA COACHING ADMISSION OPEN", //[cite: 1]
        badgeStyle: "badge-purple",
        poster: "Gallary/randhir_sir_coaching2.png", //[cite: 6]
        buttons: [
            {
                type: "call",
                text: "Call Randhir Sir",
                icon: "fas fa-phone-alt",
                link: "tel:7004700161", //[cite: 1, 6]
                style: "background: linear-gradient(135deg, #2563eb, #1d4ed8);"
            },
            {
                type: "whatsapp",
                text: "WhatsApp",
                icon: "fab fa-whatsapp",
                link: "https://wa.me/917004700161?text=" + encodeURIComponent("Hello Randhir Sir, I saw your coaching poster on BCA Study Zone. I would like to enquire about BCA Coaching classes and admission details."), //[cite: 1, 6]
                style: "background: linear-gradient(135deg, #25d366, #128c7e);"
            }
        ]
    },
	
	{
        id: "randhir_coaching",
        badge: "🎓 SPECIAL BCA COACHING ADMISSION OPEN", //[cite: 1]
        badgeStyle: "badge-purple",
        poster: "Gallary/randhir_sir_coaching3.png", //[cite: 6]
        buttons: [
            {
                type: "call",
                text: "Call Randhir Sir",
                icon: "fas fa-phone-alt",
                link: "tel:7004700161", //[cite: 1, 6]
                style: "background: linear-gradient(135deg, #2563eb, #1d4ed8);"
            },
            {
                type: "whatsapp",
                text: "WhatsApp",
                icon: "fab fa-whatsapp",
                link: "https://wa.me/917004700161?text=" + encodeURIComponent("Hello Randhir Sir, I saw your coaching poster on BCA Study Zone. I would like to enquire about BCA Coaching classes and admission details."), //[cite: 1, 6]
                style: "background: linear-gradient(135deg, #25d366, #128c7e);"
            }
        ]
    }
];

// Firebase Cloud Realtime Database Nodes
const FIREBASE_AD_SETTINGS_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/coachingAdSettings.json";
const FIREBASE_ADMIN_AUTH_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/ownerAdminAuth.json";
const OWNER_RECOVERY_EMAIL = "subham";

/**
 * 🎯 1. SHOW AD POPUP (Dynamic Poster + Same Owner Call & WhatsApp)
 */
function showCoachingAdPopup() {
    fetch(FIREBASE_AD_SETTINGS_URL)
        .then(response => response.json())
        .then(data => {
            if (data && data.enabled === false) {
                console.log("🚫 Promotional Ads are globally DISABLED by Admin.");
                return;
            }

            const coachingModal = document.getElementById("coachingAdModal");
            const badgeElem = document.getElementById("dynamicAdBadge");
            const posterElem = document.getElementById("coachingDynamicPoster");
            const actionGrid = document.getElementById("dynamicActionGrid");

            if (!coachingModal || !posterElem || coachingAdsList.length === 0) return;

            // 1. Pick a random ad
            const randomIndex = Math.floor(Math.random() * coachingAdsList.length);
            const ad = coachingAdsList[randomIndex];

            // 2. Set dynamic badge text & theme color
            if (badgeElem) {
                badgeElem.innerText = ad.badge || "FEATURED PROMOTION";
                badgeElem.className = "coaching-ad-badge " + (ad.badgeStyle || "badge-gold");
            }

            // 3. Set dynamic poster
            posterElem.src = ad.poster;

            // 4. Generate dynamic action buttons
            if (actionGrid && Array.isArray(ad.buttons)) {
                actionGrid.innerHTML = ""; // Purane buttons clear karein
                
                ad.buttons.forEach(btn => {
                    const btnAnchor = document.createElement("a");
                    btnAnchor.href = btn.link;
                    btnAnchor.className = "coaching-btn";
                    btnAnchor.style.cssText = btn.style;
                    if (btn.link.startsWith("http")) {
                        btnAnchor.target = "_blank";
                    }

                    btnAnchor.innerHTML = `<i class="${btn.icon}"></i> ${btn.text}`;
                    actionGrid.appendChild(btnAnchor);
                });
            }

            // 5. Open Modal
            coachingModal.style.display = "flex";
        })
        .catch(err => {
            console.log("Ad sync latency fallback:", err);
        });
}

function closeCoachingAd() {
    const coachingModal = document.getElementById("coachingAdModal");
    if (coachingModal) {
        coachingModal.style.display = "none";
    }
}

/**
 * 🔐 2. OPEN ADMIN CONTROL PANEL & LOGIN
 */
function openAdminControlPanel() {
    // सर्वर से वर्तमान पासवर्ड प्राप्त करें
    fetch(FIREBASE_ADMIN_AUTH_URL)
        .then(res => res.json())
        .then(authData => {
            const currentMasterPin = (authData && authData.pin) ? authData.pin : "1234";
            
            const enteredPin = prompt("🔑 Enter Owner Admin Password:\n(अगर पासवर्ड भूल गए हैं तो 'forget' लिखें)");

            if (enteredPin === null) return; // कैंसिल करने पर रुक जाएं

            // पासवर्ड भूल जाने का केस
            if (enteredPin.trim().toLowerCase() === "forget" || enteredPin.trim().toLowerCase() === "forgot") {
                handleForgotPasswordProcess();
                return;
            }

            // सही पासवर्ड डालने का केस
            if (enteredPin === currentMasterPin) {
                const adminModal = document.getElementById("adminAdControlModal");
                if (adminModal) {
                    fetchAdminAdStatusFromFirebase();
                    adminModal.style.display = "flex";
                }
            } else {
                alert("❌ Incorrect Password!\n\nअगर आप पासवर्ड भूल गए हैं तो पासवर्ड बॉक्स में 'forget' लिखें।");
            }
        })
        .catch(() => {
            alert("⚠️ Connection error! Please verify your internet settings.");
        });
}

function closeAdminControlPanel() {
    const adminModal = document.getElementById("adminAdControlModal");
    if (adminModal) {
        adminModal.style.display = "none";
    }
}

/**
 * 🔑 3. CHANGE PASSWORD FUNCTION (बिना कोड छुए वेबसाइट से ही)
 */
function changeAdminPasswordOnline() {
    fetch(FIREBASE_ADMIN_AUTH_URL)
        .then(res => res.json())
        .then(authData => {
            const currentMasterPin = (authData && authData.pin) ? authData.pin : "1234";
            const oldPinInput = prompt("🔑 पुराना Password डालें:");

            if (oldPinInput === currentMasterPin) {
                const newPinInput = prompt("✨ नया 4-Digit Password लिखें:");
                if (newPinInput && newPinInput.trim().length >= 4) {
                    
                    // नया पासवर्ड सीधे Firebase पर अपडेट करें
                    fetch(FIREBASE_ADMIN_AUTH_URL, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            pin: newPinInput.trim(),
                            updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                        })
                    })
                    .then(() => {
                        alert("🎉 Congratulations!\n\nआपका नया Password सफलतापूर्वक अपडेट हो गया है: " + newPinInput.trim());
                    });

                } else {
                    alert("❌ पासवर्ड कम से कम 4 अंकों का होना चाहिए!");
                }
            } else if (oldPinInput !== null) {
                alert("❌ पुराना पासवर्ड गलत है!");
            }
        });
}

/**
 * 🆘 4. FORGET PASSWORD RECOVERY SYSTEM (पासवर्ड भूल जाने पर)
 */
function handleForgotPasswordProcess() {
    const recoveryKeyInput = prompt("🛡️ Password Recovery Verification:\n\nअपना सीक्रेट ओनर रिकवरी कोड (Username/Key) लिखें:");

    if (recoveryKeyInput && recoveryKeyInput.trim().toLowerCase() === OWNER_RECOVERY_EMAIL.toLowerCase()) {
        const resetNewPin = prompt("✅ Verification Successful!\n\nअपना नया Admin Password सेट करें (Min 4 Digits):");

        if (resetNewPin && resetNewPin.trim().length >= 4) {
            
            fetch(FIREBASE_ADMIN_AUTH_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pin: resetNewPin.trim(),
                    updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                })
            })
            .then(() => {
                alert("🎉 Password Successfully Reset!\n\nआपका नया पासवर्ड है: " + resetNewPin.trim() + "\n\nअब आप इस नए पासवर्ड से लॉगिन कर सकते हैं।");
            });

        } else {
            alert("❌ अमान्य पासवर्ड! पासवर्ड कम से कम 4 अंकों का होना चाहिए।");
        }
    } else if (recoveryKeyInput !== null) {
        alert("❌ अमान्य सिक्योरिटी की (Security Key)! रिकवरी रद्द की गई।");
    }
}

/**
 * 🔄 5. FETCH & UPDATE ADMIN PANEL UI
 */
function fetchAdminAdStatusFromFirebase() {
    const btn = document.getElementById("toggleAdStatusBtn");
    if(btn) btn.innerText = "⏳ Checking Cloud Server Status...";

    fetch(FIREBASE_AD_SETTINGS_URL)
        .then(res => res.json())
        .then(data => {
            const isEnabled = (data && data.enabled !== undefined) ? data.enabled : true;
            updateAdminPanelUI(isEnabled);
        })
        .catch(() => updateAdminPanelUI(true));
}

function updateAdminPanelUI(isEnabled) {
    const btn = document.getElementById("toggleAdStatusBtn");
    const msg = document.getElementById("adminStatusMsg");
    if (!btn || !msg) return;

    if (isEnabled) {
        btn.innerText = "🟢 GLOBAL AD STATUS: ACTIVE (Click to Turn OFF)";
        btn.style.background = "#00c853";
        btn.style.color = "#ffffff";
        msg.innerText = "Ad is currently SHOWING to ALL users globally.";
        msg.style.color = "#00ff88";
    } else {
        btn.innerText = "🔴 GLOBAL AD STATUS: DISABLED (Click to Turn ON)";
        btn.style.background = "#ff3838";
        btn.style.color = "#ffffff";
        msg.innerText = "Ad is currently HIDDEN from ALL users globally.";
        msg.style.color = "#ff4d4d";
    }
}

/**
 * ⚡ 6. TOGGLE GLOBAL AD STATUS (ON/OFF)
 */
function toggleAdStatusFromAdmin() {
    const btn = document.getElementById("toggleAdStatusBtn");
    if(btn) btn.innerText = "⏳ Updating Server Settings...";

    fetch(FIREBASE_AD_SETTINGS_URL)
        .then(res => res.json())
        .then(data => {
            const currentStatus = (data && data.enabled !== undefined) ? data.enabled : true;
            const newStatus = !currentStatus;

            fetch(FIREBASE_AD_SETTINGS_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enabled: newStatus,
                    updatedBy: "Subham Kumar Ray",
                    lastUpdated: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                })
            })
            .then(() => {
                updateAdminPanelUI(newStatus);
                alert(newStatus ? "✅ Coaching Ad is now LIVE for ALL students!" : "🛑 Coaching Ad is now DISABLED for ALL students!");
            });
        });
}

// ⌨️ ESC Key प्रेस करने पर क्लोज
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeCoachingAd();
        closeAdminControlPanel();
    }
});

// ⏱️ 1.5 सेकंड बाद एड ट्रिगर
setTimeout(() => {
    showCoachingAdPopup();
}, 1500);

// =========================================================================
// 🚀 MASTER PRODUCTION ENGINE: GATEWAY, VALIDATION, AUTO-BAN & AUTO-UNBLOCK MATRIX
// =========================================================================

const FIREBASE_USERS_NODE_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers";
const FIREBASE_SEM_CONFIG_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activeSemestersConfig.json";

let globalStudentsCache = [];
let activeSemestersMap = {
    "Semester 1": true,
    "Semester 2": true,
    "Semester 3": true,
    "Semester 4": true,
    "Semester 5": true,
    "Semester 6": true
};

// -------------------------------------------------------------------------
// 🧠 SMART NAME VALIDATION ENGINE (DETECTS SINGLE NAME, JUNK & FAKE PATTERNS)
// -------------------------------------------------------------------------
function validateStudentName(nameInput) {
    if (!nameInput) return { isValid: false, reason: "Full Name is required." };
    
    const cleanName = nameInput.trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);

    // 1. Single Name Check (Must have First + Last Name)
    if (parts.length < 2) {
        return { 
            isValid: false, 
            reason: "Single Name Provided: Both First Name and Last Name are mandatory (e.g., Subham Kumar Ray)." 
        };
    }

    // 2. Alphabets Only Check
    const alphaPattern = /^[a-zA-Z\s]+$/;
    if (!alphaPattern.test(cleanName)) {
        return { 
            isValid: false, 
            reason: "Invalid Characters: Name must contain English alphabets only (No numbers or special symbols)." 
        };
    }

    // 3. Short Word Check
    for (let p of parts) {
        if (p.length < 2) {
            return { 
                isValid: false, 
                reason: "Short Name Segment: Each part of the name must contain at least 2 letters." 
            };
        }
    }

    // 4. Junk & Keyboard Spam Pattern Matching
    const lowerName = cleanName.toLowerCase();
    const junkWords = ["test", "admin", "fake", "user", "abc", "xyz", "asdf", "qwerty", "student", "unknown", "none", "null"];
    for (let word of junkWords) {
        if (lowerName.includes(word)) {
            return { 
                isValid: false, 
                reason: `Fake Name Keyword Detected: Word '${word}' is not permitted.` 
            };
        }
    }

    // 5. Repeated Character Spam (e.g., "Aaaaaa", "Ssssss")
    const repeatPattern = /(.)\1{3,}/i;
    if (repeatPattern.test(cleanName.replace(/\s/g, ''))) {
        return { 
            isValid: false, 
            reason: "Spam Pattern Detected: Repeated character sequence in name." 
        };
    }

    return { isValid: true, reason: "" };
}

// -------------------------------------------------------------------------
// ⚙️ ADMIN SEMESTER CONFIGURATION (FETCH & SAVE TO FIREBASE)
// -------------------------------------------------------------------------
window.fetchActiveSemestersConfig = function() {
    fetch(FIREBASE_SEM_CONFIG_URL)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data === 'object') {
                activeSemestersMap = data;
            }
            window.syncSemesterDropdownsUI();
        })
        .catch(err => console.log("Sem config sync active..."));
};

window.syncSemesterDropdownsUI = function() {
    const semDropdowns = [
        document.getElementById("track-student-sem"),
        document.getElementById("bannedUpdateSem"),
        document.getElementById("adminSemFilter")
    ];

    semDropdowns.forEach(dropdown => {
        if (!dropdown) return;
        
        // Populate Admin Config into checkboxes if modal is open
        for (let i = 1; i <= 6; i++) {
            const chk = document.getElementById(`adminSemCheck${i}`);
            if (chk) {
                chk.checked = activeSemestersMap[`Semester ${i}`] !== false;
            }
        }

        // Disable or enable options in user forms
        if (dropdown.id !== "adminSemFilter") {
            Array.from(dropdown.options).forEach(option => {
                if (option.value && option.value.startsWith("Semester")) {
                    const isActive = activeSemestersMap[option.value] !== false;
                    option.disabled = !isActive;
                    if (!isActive) {
                        if (!option.text.includes("(Inactive)")) {
                            option.text = `${option.value} (Inactive / Disabled)`;
                        }
                    } else {
                        option.text = option.value;
                    }
                }
            });
        }
    });
};

window.saveActiveSemestersConfig = function() {
    const newConfig = {};
    for (let i = 1; i <= 6; i++) {
        const chk = document.getElementById(`adminSemCheck${i}`);
        newConfig[`Semester ${i}`] = chk ? chk.checked : true;
    }

    activeSemestersMap = newConfig;
    window.syncSemesterDropdownsUI();

    const statusElem = document.getElementById("semSaveStatus");
    if (statusElem) statusElem.innerText = "⏳ Saving settings...";

    fetch(FIREBASE_SEM_CONFIG_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
    })
    .then(() => {
        if (statusElem) statusElem.innerText = "✅ Saved successfully!";
        setTimeout(() => { if (statusElem) statusElem.innerText = ""; }, 2000);
    });
};

// -------------------------------------------------------------------------
// 🎯 1. ENTER PORTAL BUTTON HANDSHAKE
// -------------------------------------------------------------------------
window.startPortalHandshakeSequence = function() {
    const gatewayScreen = document.getElementById("brand-gateway-screen");
    const loaderNode = document.getElementById("loader");

    if (!gatewayScreen) return;

    localStorage.removeItem("portal_already_entered");

    gatewayScreen.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    gatewayScreen.style.opacity = "0";
    gatewayScreen.style.transform = "scale(1.03)";

    setTimeout(() => {
        gatewayScreen.style.display = "none";
        
        if (typeof executeDynamicGatewayLoader === "function") {
            executeDynamicGatewayLoader();
        } else if (loaderNode) {
            loaderNode.style.display = "none";
            window.initIdentityTrackingVerification();
        } else {
            window.initIdentityTrackingVerification();
        }
    }, 400);
};

// -------------------------------------------------------------------------
// 🎯 2. SCREEN HANDOVER HELPER
// -------------------------------------------------------------------------
window.proceedToVoicePopupHandover = function() {
    const voicePopup = document.getElementById("voicePopup");
    const mainPage = document.getElementById("mainPage");

    if (voicePopup) voicePopup.style.display = "none";
    if (mainPage) mainPage.style.display = "block";

    if (typeof triggerVbuNoticePopupMetrics === "function") {
        triggerVbuNoticePopupMetrics();
    }
};

// -------------------------------------------------------------------------
// 🎯 3. UNIQUE UID SECURITY CHECKER & BANNED SCREEN DATA BINDING
// -------------------------------------------------------------------------
window.verifyStudentAccessStatus = function() {
    const studentUID = localStorage.getItem("student_portal_uid");
    
    if (!studentUID) return;

    fetch(`${FIREBASE_USERS_NODE_URL}.json`)
        .then(res => res.json())
        .then(allData => {
            if (!allData) return;

            const userData = allData[studentUID];
            const banScreen = document.getElementById("bannedAccessScreen");
            const gateway = document.getElementById("brand-gateway-screen");
            const mainPage = document.getElementById("mainPage");

            if (userData && userData.status === "banned") {
                const allKeys = Object.keys(allData).sort();
                const queuePosition = allKeys.indexOf(studentUID) + 1;

                const uidElem = document.getElementById("banDisplayUid");
                const queueElem = document.getElementById("banDisplayQueue");
                const nameElem = document.getElementById("banDisplayName");
                const collegeElem = document.getElementById("banDisplayCollege");
                const semElem = document.getElementById("banDisplaySem");
                const reasonElem = document.getElementById("displayBanReasonText");

                if (uidElem) uidElem.innerText = studentUID;
                if (queueElem) queueElem.innerText = `#${queuePosition} of ${allKeys.length}`;
                if (nameElem) nameElem.innerText = userData.studentName || "-";
                if (collegeElem) collegeElem.innerText = userData.collegeName || "-";
                if (semElem) semElem.innerText = userData.currentSemester || "-";
                if (reasonElem) reasonElem.innerText = userData.banReason || "Incorrect identity submission or policy violation.";

                window.updateWhatsAppAppealLink(userData, studentUID, queuePosition);

                if (banScreen) banScreen.style.display = "flex";
                document.body.style.overflow = "hidden";
                if (gateway) gateway.style.display = "none";
                if (mainPage) mainPage.style.display = "none";
            } else {
                if (banScreen) banScreen.style.display = "none";
                document.body.style.overflow = "auto";
                if (mainPage && localStorage.getItem("student_verified_profile") === "true") {
                    mainPage.style.display = "block";
                }
            }
        })
        .catch(err => console.log("Security sync active..."));
};

// -------------------------------------------------------------------------
// 🎯 3B. GENERATE DYNAMIC WHATSAPP APPEAL LINK
// -------------------------------------------------------------------------
window.updateWhatsAppAppealLink = function(userData, studentUID, queuePosition) {
    const waLinkElem = document.getElementById("whatsappAppealDynamicLink");
    if (!waLinkElem) return;

    const oldName = userData.originalName || userData.studentName || "N/A";
    const oldCollege = userData.originalCollege || userData.collegeName || "N/A";
    const oldSem = userData.originalSem || userData.currentSemester || "N/A";

    const currentName = userData.studentName || "N/A";
    const currentCollege = userData.collegeName || "N/A";
    const currentSem = userData.currentSemester || "N/A";

    const isUpdated = userData.isProfileUpdated ? "YES (Updated)" : "NO (Pending Correction)";

    const waText = `🚨 *BCA STUDY ZONE - UNBLOCK APPEAL REQUEST* 🚨\n\n` +
                   `🆔 *User ID:* ${studentUID}\n` +
                   `📊 *Registration Queue Number:* #${queuePosition}\n\n` +
                   `📌 *OLD RECORD (Before Update):*\n` +
                   `• Name: ${oldName}\n` +
                   `• College: ${oldCollege}\n` +
                   `• Semester: ${oldSem}\n\n` +
                   `✨ *NEW RECORD (Updated Profile):*\n` +
                   `• Name: ${currentName}\n` +
                   `• College: ${currentCollege}\n` +
                   `• Semester: ${currentSem}\n\n` +
                   `📝 *Profile Updated Status:* ${isUpdated}\n` +
                   `⚠️ *Ban Reason:* ${userData.banReason || "Policy Violation"}\n\n` +
                   `Hello Subham Kumar Ray Sir, I have updated my profile details accurately. Please review my record and unblock my access.`;

    waLinkElem.href = `https://wa.me/917061637118?text=${encodeURIComponent(waText)}`;
};

// -------------------------------------------------------------------------
// 🎯 3C. BANNED PROFILE UPDATE HANDLER (WITH AUTOMATIC UNBLOCK EVALUATION)
// -------------------------------------------------------------------------
window.submitBannedProfileUpdate = function() {
    const studentUID = localStorage.getItem("student_portal_uid");
    const nameInput = document.getElementById("bannedUpdateName");
    const collegeSelect = document.getElementById("bannedUpdateCollege");
    const semSelect = document.getElementById("bannedUpdateSem");
    const updateBtn = document.getElementById("bannedUpdateBtn");

    if (!studentUID || !nameInput || !collegeSelect || !semSelect) return;

    const newName = nameInput.value.trim();
    const newCollege = collegeSelect.value;
    const newSem = semSelect.value;

    if (!newName || !newCollege || !newSem) {
        alert("⚠️ Please fill all fields correctly!\n\nसारे विवरण सही-सही भरें।");
        return;
    }

    // Check Name Validity
    const nameValidation = validateStudentName(newName);
    
    // Check Semester Activity
    const isSemActive = activeSemestersMap[newSem] !== false;

    if (updateBtn) {
        updateBtn.disabled = true;
        updateBtn.innerText = "Evaluating Profile & Syncing...";
    }

    fetch(`${FIREBASE_USERS_NODE_URL}/${studentUID}.json`)
        .then(res => res.json())
        .then(oldData => {
            const originalName = oldData.originalName || oldData.studentName || "N/A";
            const originalCollege = oldData.originalCollege || oldData.collegeName || "N/A";
            const originalSem = oldData.originalSem || oldData.currentSemester || "N/A";

            const formattedNewName = newName.replace(/\b\w/g, char => char.toUpperCase());
            const updateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            let newStatus = "banned";
            let autoBanReason = "";

            // AUTO-UNBLOCK EVALUATION LOGIC
            if (!nameValidation.isValid) {
                newStatus = "banned";
                autoBanReason = `Auto-BAN: ${nameValidation.reason}`;
            } else if (!isSemActive) {
                newStatus = "banned";
                autoBanReason = `Auto-BAN: Selected Semester (${newSem}) is currently inactive/disabled by Admin.`;
            } else {
                newStatus = "active";
                autoBanReason = ""; // Clear ban reason upon successful unblock
            }

            const payload = {
                studentName: formattedNewName,
                collegeName: newCollege,
                currentSemester: newSem,
                originalName: originalName,
                originalCollege: originalCollege,
                originalSem: originalSem,
                isProfileUpdated: true,
                status: newStatus,
                banReason: autoBanReason,
                lastUpdatedTime: updateTime
            };

            return fetch(`${FIREBASE_USERS_NODE_URL}/${studentUID}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(() => {
                localStorage.setItem("student_tracked_name", formattedNewName);
                localStorage.setItem("student_tracked_college", newCollege);
                localStorage.setItem("student_tracked_sem", newSem);

                const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
                const chatId = '@bca_dashboard_subham';

                const telegramUpdateLog = `🔄 *PROFILE UPDATE & AUTO-EVALUATION* 🔄\n\n` +
                                          `🆔 *User ID:* \`${studentUID}\`\n` +
                                          `📊 *New Status:* ${newStatus === "active" ? "🟢 UNBLOCKED (Active)" : "🚫 BANNED"}\n` +
                                          `🕒 *Time:* ${updateTime}\n\n` +
                                          `❌ *OLD RECORD:*\n` +
                                          `• Name: ${originalName}\n` +
                                          `• College: ${originalCollege}\n` +
                                          `• Semester: ${originalSem}\n\n` +
                                          `✅ *NEW SUBMISSION:*\n` +
                                          `• Name: ${formattedNewName}\n` +
                                          `• College: ${newCollege}\n` +
                                          `• Semester: ${newSem}\n\n` +
                                          `📌 *Reason/Log:* ${autoBanReason || "Verified & Auto-Unblocked"}`;

                fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: telegramUpdateLog, parse_mode: 'Markdown' })
                }).catch(err => console.log("Telegram update log bypassed."));

                if (newStatus === "active") {
                    alert("🎉 Profile Verified Successfully!\n\nसारे विवरण सही पाए गए हैं। आपका खाता स्वचालित रूप से UNBLOCK (सक्रिय) कर दिया गया है!");
                } else {
                    alert(`⚠️ Profile Submission Rejected!\n\n${autoBanReason}\n\nकृपया विवरण सही करके पुनः प्रयास करें।`);
                }
                
                if (updateBtn) {
                    updateBtn.disabled = false;
                    updateBtn.innerText = "Save & Update Details 💾";
                }

                window.verifyStudentAccessStatus();
            });
        })
        .catch(err => {
            alert("❌ Connection Error! Unable to update profile.");
            if (updateBtn) {
                updateBtn.disabled = false;
                updateBtn.innerText = "Save & Update Details 💾";
            }
        });
};

// -------------------------------------------------------------------------
// 🎯 4. REAL-TIME WELCOME BACK & GAP CALCULATOR
// -------------------------------------------------------------------------
window.initIdentityTrackingVerification = function() {
    const studentUID = localStorage.getItem("student_portal_uid");

    if (localStorage.getItem("student_verified_profile") === "true" && studentUID) {
        
        fetch(`${FIREBASE_USERS_NODE_URL}/${studentUID}.json`)
        .then(response => response.json())
        .then(dbData => {
            if (!dbData) {
                localStorage.clear();
                const gatewayScreen = document.getElementById("brand-gateway-screen");
                if (gatewayScreen) {
                    gatewayScreen.style.display = "flex";
                    gatewayScreen.style.opacity = "1";
                }
                const trackingPopup = document.getElementById("studentTrackingPopup");
                if (trackingPopup) trackingPopup.style.display = "flex";
                return;
            }

            if (dbData.status === "banned") {
                window.verifyStudentAccessStatus();
                return;
            }

            const savedName = dbData.studentName || "Existing Student";
            const savedCollege = dbData.collegeName || "Saved College";
            const savedSem = dbData.currentSemester || "Saved Semester";
            
            const currentTimestamp = Date.now();
            const formattedCurrentDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            let lastVisitTs = parseInt(localStorage.getItem("student_last_visit_timestamp"));
            if (!lastVisitTs || isNaN(lastVisitTs)) {
                lastVisitTs = dbData.timestamp || currentTimestamp;
            }

            const lastVisitTimeStr = localStorage.getItem("student_last_visit_readable") || dbData.entryTime || "Initial Registration";

            const diffInMilliseconds = Math.max(0, currentTimestamp - lastVisitTs);
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
            localStorage.setItem("student_last_visit_readable", formattedCurrentDate);

            const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; 
            const chatId = '@bca_dashboard_subham'; 
            
            const telegramRevisitMessage = `🔄 *STUDENT RETURNED (WELCOME BACK)* 🔄\n\n` +
                                         `👤 *Student Name:* ${savedName}\n` +
                                         `🏫 *College:* ${savedCollege}\n` +
                                         `📚 *Semester:* ${savedSem}\n\n` +
                                         `🕒 *Current Return:* ${formattedCurrentDate}\n` +
                                         `⏮️ *Last Active Was:* ${lastVisitTimeStr}\n` +
                                         `⏳ *Total Offline Gap:* _${gapString}_\n\n` +
                                         `📱 *Device:* ${navigator.platform}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: telegramRevisitMessage, parse_mode: 'Markdown' }) 
            }).catch(tErr => console.log("Telegram alert bypassed."));

            window.proceedToVoicePopupHandover();
        })
        .catch(err => window.proceedToVoicePopupHandover());

    } else {
        const popup = document.getElementById("studentTrackingPopup");
        if (popup) popup.style.display = "flex";
    }
};

// -------------------------------------------------------------------------
// 🎯 5. NEW STUDENT ENTRY SUBMISSION (WITH AUTO-BAN FILTER)
// -------------------------------------------------------------------------
window.submitStudentMetadataPipeline = function() {
    const nameInput = document.getElementById("track-student-name");
    const collegeSelect = document.getElementById("track-student-college");
    const semSelect = document.getElementById("track-student-sem");
    const verifyBtn = document.getElementById("trackVerifyBtn");

    if (!nameInput || !collegeSelect || !semSelect) return;

    const name = nameInput.value.trim();
    const college = collegeSelect.value;
    const semester = semSelect.value;

    if (!name || !college || !semester) {
        alert("⚠️ Please fill all details to proceed!\n\nपोर्टल अनलॉक करने के लिए कृपया नाम, कॉलेज और सेमेस्टर चुनें।");
        return;
    }

    // Check Name Validity
    const nameValidation = validateStudentName(name);

    // Check Active Semester Status
    const isSemActive = activeSemestersMap[semester] !== false;

    let initialStatus = "active";
    let autoBanReason = "";

    if (!nameValidation.isValid) {
        initialStatus = "banned";
        autoBanReason = `Auto-BAN: ${nameValidation.reason}`;
    } else if (!isSemActive) {
        initialStatus = "banned";
        autoBanReason = `Auto-BAN: Selected Semester (${semester}) is currently inactive/disabled by Admin.`;
    }

    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerText = "VERIFYING ACCESS...";
    }

    const currentTs = Date.now();
    const currentTimestampStr = currentTs.toString();
    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const structuredName = name.replace(/\b\w/g, char => char.toUpperCase());

    localStorage.setItem("student_tracked_name", structuredName);
    localStorage.setItem("student_tracked_college", college);
    localStorage.setItem("student_tracked_sem", semester);
    localStorage.setItem("student_portal_uid", currentTimestampStr);
    localStorage.setItem("student_verified_profile", "true");
    localStorage.setItem("student_last_visit_timestamp", currentTs.toString());
    localStorage.setItem("student_last_visit_readable", formattedDate);

    const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; 
    const chatId = '@bca_dashboard_subham'; 
    
    const telegramAlertMessage = `🎓 *NEW PORTAL ACCESS ENTRY* 🎓\n\n` +
                                 `👤 *Student Name:* ${structuredName}\n` +
                                 `🏫 *College:* ${college}\n` +
                                 `📚 *Semester:* ${semester}\n` +
                                 `📊 *Initial Status:* ${initialStatus === "active" ? "🟢 ACTIVE" : "🚫 AUTO-BANNED"}\n` +
                                 `📌 *Log Reason:* ${autoBanReason || "Passed Verification"}\n` +
                                 `🕒 *Active Time:* ${formattedDate}\n` +
                                 `📱 *Device Sync:* ${navigator.platform}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: telegramAlertMessage, parse_mode: 'Markdown' }) 
    }).catch(err => console.log("Telegram alert bypassed."));

    fetch(`${FIREBASE_USERS_NODE_URL}/${currentTimestampStr}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentName: structuredName,
            collegeName: college,
            currentSemester: semester,
            originalName: structuredName,
            originalCollege: college,
            originalSem: semester,
            entryTime: formattedDate,
            timestamp: currentTs,
            status: initialStatus,
            banReason: autoBanReason,
            platform: navigator.platform
        })
    })
    .then(() => completeStudentEntrySequence(initialStatus))
    .catch(() => completeStudentEntrySequence(initialStatus));
};

function completeStudentEntrySequence(status) {
    const popup = document.getElementById("studentTrackingPopup");
    if (popup) popup.style.display = "none";

    if (status === "banned") {
        window.verifyStudentAccessStatus();
    } else {
        const mainPage = document.getElementById("mainPage");
        if (mainPage) mainPage.style.display = "block";

        if (typeof triggerVbuNoticePopupMetrics === "function") {
            triggerVbuNoticePopupMetrics();
        }
    }
}

// -------------------------------------------------------------------------
// 🎯 6. ADMIN DIRECTORY & MODAL CONTROLLERS
// -------------------------------------------------------------------------
window.openAdminUserMatrixDirectly = function() {
    if (typeof closeAdminControlPanel === "function") closeAdminControlPanel();
    openAdminUserMatrix();
};

window.openAdminUserMatrix = function() {
    const userModal = document.getElementById("adminUserMatrixModal");
    if (userModal) userModal.style.display = "flex";
    loadLiveStudentsList();
};

window.closeAdminUserMatrix = function() {
    const userModal = document.getElementById("adminUserMatrixModal");
    if (userModal) userModal.style.display = "none";
};

window.loadLiveStudentsList = function() {
    const container = document.getElementById("adminStudentCardsContainer");
    const countSpan = document.getElementById("totalStudentsCount");

    if (!container) return;
    container.innerHTML = `<p style="color: #00f7ff; font-size: 1.3rem;">⏳ Fetching live student records...</p>`;

    fetch(`${FIREBASE_USERS_NODE_URL}.json`)
        .then(res => res.json())
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                container.innerHTML = `<p style="color: #94a3b8; font-size: 1.3rem;">No registered students found in database.</p>`;
                if (countSpan) countSpan.innerText = "0";
                return;
            }

            const sortedKeys = Object.keys(data).sort();

            globalStudentsCache = [];
            sortedKeys.forEach((uid, index) => {
                const record = data[uid];
                if (record && typeof record === 'object') {
                    globalStudentsCache.push({
                        uid: uid,
                        queuePos: index + 1,
                        studentName: record.studentName || record.NAME || "Registered Student",
                        collegeName: record.collegeName || record.COLLEGE || "N/A",
                        currentSemester: record.currentSemester || record.SEMESTER || "N/A",
                        originalName: record.originalName || record.studentName || "N/A",
                        originalCollege: record.originalCollege || record.collegeName || "N/A",
                        originalSem: record.originalSem || record.currentSemester || "N/A",
                        isProfileUpdated: record.isProfileUpdated || false,
                        entryTime: record.entryTime || "N/A",
                        status: record.status || "active",
                        banReason: record.banReason || ""
                    });
                }
            });

            if (countSpan) countSpan.innerText = globalStudentsCache.length.toString();
            renderStudentCards(globalStudentsCache);
        })
        .catch(err => {
            container.innerHTML = `<p style="color: #ff3838; font-size: 1.3rem;">❌ Failed to load directory. Check connection.</p>`;
        });
};

// -------------------------------------------------------------------------
// 🎯 6B. RENDER STUDENT CARDS
// -------------------------------------------------------------------------
function renderStudentCards(studentsList) {
    const container = document.getElementById("adminStudentCardsContainer");
    if (!container) return;

    if (studentsList.length === 0) {
        container.innerHTML = `<p style="color: #94a3b8; font-size: 1.3rem;">No matching students found.</p>`;
        return;
    }

    let html = "";
    studentsList.slice().reverse().forEach(student => {
        const isBanned = student.status === "banned";
        const cardBg = isBanned ? "rgba(255, 56, 56, 0.15)" : "#1e293b";
        const borderCol = isBanned ? "#ff3838" : "#334155";
        
        const statusBadge = isBanned 
            ? `<span style="background: #ff3838; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 1rem; font-weight: bold;">BANNED 🚫</span>`
            : `<span style="background: #00c853; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 1rem; font-weight: bold;">ACTIVE 🟢</span>`;

        const updateBadge = student.isProfileUpdated 
            ? `<span style="background: #00f7ff; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 0.95rem; font-weight: bold; margin-left: 5px;">UPDATED ✏️</span>` 
            : ``;

        const banBtn = isBanned
            ? `<button onclick="toggleUserBanStatus('${student.uid}', 'active')" style="padding: 8px 12px; font-size: 1.15rem; font-weight: bold; background: #00c853; color: #fff; border: none; border-radius: 8px; cursor: pointer;">🟢 UNBLOCK</button>`
            : `<button onclick="toggleUserBanStatus('${student.uid}', 'banned')" style="padding: 8px 12px; font-size: 1.15rem; font-weight: bold; background: #ff3838; color: #fff; border: none; border-radius: 8px; cursor: pointer;">🚫 BAN</button>`;

        const deleteBtn = `<button onclick="deleteUserPermanently('${student.uid}', '${student.studentName}')" style="padding: 8px 12px; font-size: 1.15rem; font-weight: bold; background: #dc2626; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-left: 6px;">🗑️ DELETE</button>`;

        const reasonDisplay = isBanned && student.banReason 
            ? `<p style="color: #ffd700; font-size: 1.1rem; margin: 4px 0 0 0;">⚠️ Ban Reason: ${student.banReason}</p>` 
            : ``;

        let oldRecordDisplay = "";
        if (student.isProfileUpdated) {
            oldRecordDisplay = `<p style="color: #94a3b8; font-size: 1.05rem; margin: 3px 0 0 0; font-style: italic;">⏮️ Old Record: ${student.originalName} | ${student.originalCollege} | ${student.originalSem}</p>`;
        }

        html += `
            <div class="student-matrix-card" style="background: ${cardBg}; border: 1px solid ${borderCol}; padding: 14px; border-radius: 12px; text-align: left; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
                        <span style="color: #ffd700; font-size: 1.2rem; font-weight: 800;">#${student.queuePos}</span>
                        <h4 style="color: #fff; font-size: 1.45rem; margin: 0; font-weight: 700;">${student.studentName}</h4>
                        ${statusBadge}
                        ${updateBadge}
                    </div>
                    <p style="color: #00f7ff; font-size: 1.2rem; margin: 0 0 4px 0;">🏫 ${student.collegeName} • 📚 ${student.currentSemester}</p>
                    <p style="color: #94a3b8; font-size: 1.05rem; margin: 0;">🕒 Joined: ${student.entryTime} | ID: ${student.uid}</p>
                    ${oldRecordDisplay}
                    ${reasonDisplay}
                </div>
                <div style="display: flex; align-items: center; gap: 4px; flex-wrap: nowrap;">
                    ${banBtn}
                    ${deleteBtn}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// -------------------------------------------------------------------------
// 🎯 7. ADMIN MANUAL BAN / UNBAN
// -------------------------------------------------------------------------
window.toggleUserBanStatus = function(targetUID, newStatus) {
    let banReason = "";

    if (newStatus === "banned") {
        banReason = prompt("⚠️ Please enter the reason for banning this student:\n(छात्र को ब्लॉक करने का कारण लिखें):", "Manual Admin Ban: Policy violation");
        
        if (banReason === null) return; 
        if (banReason.trim() === "") banReason = "Manual Admin Ban: Policy violation";
    }

    const actionText = newStatus === "banned" ? "Block/Ban" : "Unblock";
    if (!confirm(`Are you sure you want to ${actionText} Student ID: ${targetUID}?`)) return;

    fetch(`${FIREBASE_USERS_NODE_URL}/${targetUID}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: newStatus,
            banReason: banReason,
            updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        })
    })
    .then(() => {
        alert(`🎉 Student ID [${targetUID}] has been successfully ${newStatus === "banned" ? "BLOCKED" : "UNBLOCKED"}!`);
        if (typeof loadLiveStudentsList === "function") loadLiveStudentsList();
        window.verifyStudentAccessStatus();
    })
    .catch(err => alert("❌ Network Error! Unable to update student status."));
};

// -------------------------------------------------------------------------
// 🎯 7B. PERMANENT DELETE USER RECORD
// -------------------------------------------------------------------------
window.deleteUserPermanently = function(targetUID, studentName) {
    if (!confirm(`🚨 PERMANENT DELETE WARNING!\n\nKya aap truly Student "${studentName}" (ID: ${targetUID}) ko Database se permanently delete karna chahte hain?`)) {
        return;
    }

    fetch(`${FIREBASE_USERS_NODE_URL}/${targetUID}.json`, {
        method: 'DELETE'
    })
    .then(() => {
        alert(`🗑️ Student "${studentName}" (ID: ${targetUID}) has been PERMANENTLY DELETED!`);
        if (typeof loadLiveStudentsList === "function") loadLiveStudentsList();
        window.verifyStudentAccessStatus();
    })
    .catch(err => alert("❌ Network Error! Unable to delete record."));
};

// -------------------------------------------------------------------------
// 🎯 8. MULTI-FILTER ENGINE
// -------------------------------------------------------------------------
window.filterStudentUserMatrix = function() {
    const searchVal = document.getElementById("adminStudentSearch");
    const collegeVal = document.getElementById("adminCollegeFilter");
    const semVal = document.getElementById("adminSemFilter");

    const nameQuery = searchVal ? searchVal.value.toLowerCase().trim() : "";
    const selectedCollege = collegeVal ? collegeVal.value : "";
    const selectedSem = semVal ? semVal.value : "";

    const filteredList = globalStudentsCache.filter(student => {
        const matchesName = (student.studentName || "").toLowerCase().includes(nameQuery) || (student.uid || "").toLowerCase().includes(nameQuery);
        const matchesCollege = selectedCollege === "" || (student.collegeName || "") === selectedCollege;
        const matchesSem = selectedSem === "" || (student.currentSemester || "") === selectedSem;

        return matchesName && matchesCollege && matchesSem;
    });

    const countSpan = document.getElementById("totalStudentsCount");
    if (countSpan) {
        countSpan.innerText = filteredList.length.toString();
    }

    renderStudentCards(filteredList);
};

// Local Testing Reset Helper
window.clearLocalTestingSession = function() {
    localStorage.clear();
    location.reload();
};

// -------------------------------------------------------------------------
// 🧠 INITIALIZATION & AUTOMATIC POLLING
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const enterBtn = document.querySelector("#brand-gateway-screen button");
    if (enterBtn) {
        enterBtn.onclick = function(e) {
            e.preventDefault();
            window.startPortalHandshakeSequence();
        };
    }
    
    window.fetchActiveSemestersConfig();
    window.verifyStudentAccessStatus();
});

setInterval(window.verifyStudentAccessStatus, 1500);




// =========================================================================
// 🚀 SMART FEATURE 1: BROKEN LINK / 404 REAL-TIME ERROR DETECTOR
// =========================================================================

const TELEGRAM_ALERT_TOKEN = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
const TELEGRAM_ALERT_CHAT_ID = '@bca_dashboard_subham';

// Smart Link Click Inspector
async function handleResourceLinkClick(event, resourceTitle, targetUrl) {
    if (!targetUrl || targetUrl.trim() === "" || targetUrl === "#") return;

    if (targetUrl.startsWith("http") && !targetUrl.includes("github.io/bcastudyzone")) {
        return;
    }

    try {
        const response = await fetch(targetUrl, { method: 'HEAD' });
        
        if (response.status === 404 || response.status >= 500) {
            event.preventDefault(); // Broken link ko open hone se rokein
            
            const studentName = localStorage.getItem("student_tracked_name") || "Guest / Unverified Student";
            const studentCollege = localStorage.getItem("student_tracked_college") || "Unknown College";
            const studentSem = localStorage.getItem("student_tracked_sem") || "Unknown Sem";
            const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            // 1. Student Friendly Popup
            Swal.fire({
                title: 'Resource Updating',
                text: 'This study resource is currently being updated by Subham Sir. Please check back in a few minutes.',
                icon: 'info',
                confirmButtonColor: '#009dff',
                confirmButtonText: 'Understood'
            });

            // 2. Telegram Instant Broken Alert
            const errorAlertMessage = `⚠️ *BROKEN LINK / 404 ERROR DETECTED* ⚠️\n\n` +
                                     `👤 *Student Name:* ${studentName}\n` +
                                     `🏫 *College:* ${studentCollege}\n` +
                                     `📚 *Semester:* ${studentSem}\n\n` +
                                     `📖 *Resource Title:* ${resourceTitle}\n` +
                                     `🔗 *Broken URL:* \`${targetUrl}\`\n` +
                                     `❌ *Error Code:* HTTP ${response.status} Not Found\n` +
                                     `🕒 *Time:* ${formattedTime}\n` +
                                     `📱 *Device:* ${navigator.platform}`;

            fetch(`https://api.telegram.org/bot${TELEGRAM_ALERT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_ALERT_CHAT_ID,
                    text: errorAlertMessage,
                    parse_mode: 'Markdown'
                })
            }).catch(() => {});
        }
    } catch (err) {
        console.log("Resource pre-check bypass:", err);
    }
}

// SweetAlert ke links par click listener
document.addEventListener("click", function(e) {
    const targetAnchor = e.target.closest("a.swal-link-btn");
    if (targetAnchor && targetAnchor.getAttribute("href")) {
        const url = targetAnchor.getAttribute("href");
        const title = targetAnchor.innerText.replace("✓", "").trim();
        
        // Activity count karein
        trackDailyAnalyticsEvent(url.includes("PYQ") ? "pyq_views" : "notes_views", title);

        // Pre-validate broken link
        handleResourceLinkClick(e, title, url);
    }
});


// =========================================================================
// 📊 SMART FEATURE 2: 24-HOUR AUTOMATED DAILY REPORT ENGINE (12:00 AM SYNC)
// =========================================================================

const FIREBASE_ANALYTICS_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/dailyAnalytics";

// Date formatted as YYYY-MM-DD
function getFormattedDateKey(d) {
    const target = d || new Date();
    return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(target.getDate()).padStart(2, '0')}`;
}

// Track Clicks in Firebase under Date Folder
function trackDailyAnalyticsEvent(eventType, itemName) {
    const todayKey = getFormattedDateKey();
    const cleanItemKey = itemName ? itemName.replace(/[\.\#\$\[\]\/]/g, "_") : "general";
    
    fetch(`${FIREBASE_ANALYTICS_URL}/${todayKey}/${eventType}/${cleanItemKey}.json`)
        .then(res => res.json())
        .then(currentCount => {
            const newCount = (currentCount || 0) + 1;
            fetch(`${FIREBASE_ANALYTICS_URL}/${todayKey}/${eventType}/${cleanItemKey}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCount)
            });
        })
        .catch(() => {});
}

// 🕛 Auto-generate 24-Hour Report (Triggers at 12:00 AM Midnight)
function processMidnightDailyAnalyticsReport() {
    const now = new Date();
    const todayKey = getFormattedDateKey(now);

    // Kal ka date key (Yesterday)
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = getFormattedDateKey(yesterday);

    // Check agar kal ka report ja chuka hai ya nahi
    const lastSentReportDate = localStorage.getItem("bca_last_sent_report_date");

    if (lastSentReportDate !== yesterdayKey) {
        // Firebase se yesterday ka data fetch karein
        fetch(`${FIREBASE_ANALYTICS_URL}/${yesterdayKey}.json`)
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    // Agar kal koi activity nahi thi
                    localStorage.setItem("bca_last_sent_report_date", yesterdayKey);
                    return;
                }

                let totalNotesViews = 0;
                let topNoteName = "None";
                let topNoteCount = 0;

                if (data.notes_views) {
                    for (let note in data.notes_views) {
                        const count = data.notes_views[note];
                        totalNotesViews += count;
                        if (count > topNoteCount) {
                            topNoteCount = count;
                            topNoteName = note;
                        }
                    }
                }

                let totalPyqViews = 0;
                if (data.pyq_views) {
                    for (let pyq in data.pyq_views) {
                        totalPyqViews += data.pyq_views[pyq];
                    }
                }

                const dailySummaryTelegramText = 
                    `📊 *BCA STUDY ZONE - 24 HOURS DAILY REPORT* 📊\n\n` +
                    `📅 *Report Date:* ${yesterdayKey}\n` +
                    `⏱️ *Time Window:* Full 24 Hours (12:00 AM to 11:59 PM)\n\n` +
                    `📘 *Total Notes Opened:* ${totalNotesViews}\n` +
                    `🔥 *Most Read Note:* ${topNoteName} (${topNoteCount} views)\n` +
                    `📄 *Total PYQs Accessed:* ${totalPyqViews}\n\n` +
                    `✅ *System Status:* All Cloud Database Matrix Synced Successfully.`;

                fetch(`https://api.telegram.org/bot${TELEGRAM_ALERT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_ALERT_CHAT_ID,
                        text: dailySummaryTelegramText,
                        parse_mode: 'Markdown'
                    })
                }).then(() => {
                    // Lock taaki kal ka report dubara send na ho
                    localStorage.setItem("bca_last_sent_report_date", yesterdayKey);
                });
            })
            .catch(() => {});
    }
}

// Har 1 minute me auto-check karega (Jaise hi 12:00 AM honge, report send ho jayegi)
setInterval(processMidnightDailyAnalyticsReport, 60000);
document.addEventListener("DOMContentLoaded", processMidnightDailyAnalyticsReport);






// =========================================================================
// 💻 MULTI-PART CODING LAB VAULT (AUTOMATIC LIST & DOWNLOAD ENGINE)
// =========================================================================

const programmingPdfVault = {
    c: {
        name: "C Language Master Code",
        icon: "fab fa-cuttlefish",
        themeClass: "vault-theme-c",
        files: [
            {
                title: "Part 1: Basic Level to High Level code With Output (Q1 - Q79)",
                path: "Program/c_part1.pdf" // ✅ Ready (Download Link)
            },
            {
                title: "Part 2: Basic Level to High Level code With Output (Q79 - Q150)",
                path: "" // ⏳ Khali path = Automatic Coming Soon
            },
            {
                title: "Part 3: Basic Level to High Level code With Output (Q150 - Q250)",
                path: "" // ⏳ Khali path = Automatic Coming Soon
            },
            {
                title: "Part 4: Basic Level to High Level code With Output (Q250 - Q350)",
                path: "" // ⏳ Khali path = Automatic Coming Soon
            }
        ],
        desc: "इन PDFs में VBU BCA सेमेस्टर के सभी 300+ महत्वपूर्ण लैब प्रोग्राम्स टॉपिक-वाइज और आउटपुट के साथ दिए गए हैं।"
    },
    cpp: {
        name: "C++ & OOP Lab Codes",
        icon: "fas fa-code",
        themeClass: "vault-theme-cpp",
        files: [
		],
        desc: "Class, Object, Inheritance, Polymorphism aur Operator Overloading ke complete mix lab practical codes."
    },
    ds: {
        name: "Data Structures in C",
        icon: "fas fa-project-diagram",
        themeClass: "vault-theme-ds",
        files: [],
        desc: "Stack, Queue, Linked List, Tree Traversal aur All Searching/Sorting Algorithms ke complete solutions."
    },
    java: {
        name: "Java Master Programming",
        icon: "fab fa-java",
        themeClass: "vault-theme-java",
        files: [],
        desc: "Core Java OOPs, Multithreading, Exception Handling, Applet aur Swing UI practical programs."
    },
    web: {
        name: "Web Design (HTML/CSS/JS)",
        icon: "fab fa-html5",
        themeClass: "vault-theme-web",
        files: [],
        desc: "Complete HTML5 Semantic Layouts, CSS3 Styling aur JavaScript Form Validation Projects."
    },
    python: {
        name: "Python & Linux Shell",
        icon: "fab fa-python",
        themeClass: "vault-theme-python",
        files: [],
        desc: "Python Core Programming Data Structures aur Linux Bash Shell Scripting ke ready-to-run lab codes."
    }
};

// 1. Language Selection Menu Screen
function openCodingVaultModal() {
    let listHtml = "";

    for (let key in programmingPdfVault) {
        let item = programmingPdfVault[key];
        let hasFiles = item.files && item.files.length > 0;

        let badgeContent = hasFiles 
            ? `<span class="vault-badge-status badge-active"><i class="fas fa-check-circle"></i> AVAILABLE</span>`
            : `<span class="vault-badge-status badge-pending"><i class="fas fa-hourglass-half"></i> SOON</span>`;

        listHtml += `
            <div onclick="openLanguagePdfList('${key}')" class="vault-program-item ${item.themeClass}">
                <div class="vault-item-left">
                    <div class="vault-icon-circle">
                        <i class="${item.icon}"></i>
                    </div>
                    <span class="vault-title-text">${item.name}</span>
                </div>
                ${badgeContent}
            </div>
        `;
    }

    Swal.fire({
        title: '<span style="font-size:1.55rem; font-weight:800; color:#ffffff !important;">💻 Programming Lab Vault</span>',
        html: `
            <p style="font-size: 1.15rem; color: #94a3b8; margin: 0 0 14px 0; font-weight: 500;">
                Subject select karein aur complete topic-wise mix code file prapt karein 📥
            </p>
            <div class="vault-cards-container">
                ${listHtml}
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '460px',
        padding: '16px',
        background: '#1e293b',
        color: '#ffffff'
    });
}

// 2. Language Detail & Multi-PDF Download Screen (CLEAN & FREE VERSION)
function openLanguagePdfList(langKey) {
    let data = programmingPdfVault[langKey];
    if (!data) return;

    let hasAnyFile = data.files && data.files.length > 0;
    let contentHtml = "";

    if (hasAnyFile) {
        let pdfLinksHtml = "";
        
        data.files.forEach((pdf) => {
            const isReady = pdf.path && pdf.path.trim() !== "";

            if (isReady) {
                // ✅ READY FILE: Clean Dark-Cyan Theme + White Bold Text
                pdfLinksHtml += `
                    <div class="swal-link-container" style="margin-bottom: 10px;">
                        <a href="${pdf.path}" target="_blank" class="vault-clean-download-btn">
                            <span class="vault-btn-title"><i class="fas fa-file-pdf"></i> ${pdf.title}</span>
                            <span class="vault-btn-icon"><i class="fas fa-download"></i></span>
                        </a>
                        <a href="${getWaShareLink(pdf.title, pdf.path)}" target="_blank" class="swal-share-wa-btn" title="Share on WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                `;
            } else {
                // ⏳ COMING SOON FILE: Dark Background + Gold Badge
                pdfLinksHtml += `
                    <div class="swal-link-container" style="margin-bottom: 10px;">
                        <div class="vault-clean-cs-btn">
                            <span class="vault-btn-title" style="color: #94a3b8 !important;">
                                <i class="fas fa-clock" style="margin-right: 6px; color: #ffd700;"></i> ${pdf.title}
                            </span>
                            <span class="vault-cs-badge">COMING SOON</span>
                        </div>
                    </div>
                `;
            }
        });

        contentHtml = `
            <div style="max-height: 270px; overflow-y: auto; padding-right: 4px; margin-top: 8px;">
                ${pdfLinksHtml}
            </div>
            
            <div style="background: rgba(0, 255, 136, 0.08); border: 1px dashed #00ff88; padding: 12px; border-radius: 12px; margin-top: 14px; text-align: center;">
                <p style="font-size: 1.25rem; color: #00ff88; font-weight: 700; margin: 0 0 5px 0;">
                    🎉 ${data.name} Lab Files
                </p>
                <p style="font-size: 1.1rem; color: #cbd5e1; margin: 0; line-height: 1.5;">
                    ${data.desc}
                </p>
            </div>
        `;
    } else {
        contentHtml = `
            <div class="swal-link-container" style="margin-top: 10px;">
                <div class="vault-clean-cs-btn" style="width:100%; justify-content:center; padding:14px;">
                    <i class="fas fa-clock" style="margin-right: 8px; color: #ffd700;"></i> ${data.name} Complete File (Coming Soon)
                </div>
            </div>
        `;
    }

    Swal.fire({
        title: `<span style="font-size:1.55rem; font-weight:800; color:#ffffff !important;">📘 ${data.name}</span>`,
        html: `
            <div style="padding: 2px 0;">
                ${contentHtml}
            </div>
            <div style="margin-top: 18px; text-align: center;">
                <button onclick="openCodingVaultModal()" class="vault-back-btn">
                    <i class="fas fa-arrow-left"></i> Back to Languages
                </button>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '480px',
        padding: '18px',
        background: '#0f172a',
        color: '#ffffff'
    });
}

// 3. Mini Program Request Popup Form
function openProgramRequestForm(subjectName) {
    // Student identity details auto-fetch
    const defaultName = localStorage.getItem("student_tracked_name") || "";
    const defaultCollege = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const defaultSem = localStorage.getItem("student_tracked_sem") || "Semester 1";

    Swal.fire({
        title: '📝 Request Missing Program',
        html: `
            <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 12px;">
                Subject: <b style="color: #00f7ff;">${subjectName}</b>
            </p>
            
            <div style="text-align: left; display: flex; flex-direction: column; gap: 10px;">
                <div>
                    <label style="font-size: 1.1rem; color: #cbd5e1; font-weight: 600;">Student Name:</label>
                    <input type="text" id="req-student-name" value="${defaultName}" placeholder="Your Full Name" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 1.25rem; box-sizing: border-box;">
                </div>
                
                <div>
                    <label style="font-size: 1.1rem; color: #cbd5e1; font-weight: 600;">WhatsApp Number (Solution lene ke liye):</label>
                    <input type="tel" id="req-student-wa" placeholder="10-digit Mobile Number" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 1.25rem; box-sizing: border-box;">
                </div>

                <div>
                    <label style="font-size: 1.1rem; color: #cbd5e1; font-weight: 600;">Program Topic / Question:</label>
                    <textarea id="req-student-topic" rows="3" placeholder="Jaise: Write a C program for Tower of Hanoi using Recursion with Output" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 1.25rem; box-sizing: border-box; resize: none;"></textarea>
                </div>
            </div>

            <button onclick="submitProgramRequestTelegram('${subjectName}', '${defaultCollege}', '${defaultSem}')" id="reqSubmitBtn" style="margin-top: 15px; width: 100%; padding: 12px; font-size: 1.35rem; font-weight: 700; color: #000; background: linear-gradient(135deg, #00f7ff, #009dff); border: none; border-radius: 10px; cursor: pointer;">
                Send Request 🚀
            </button>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        background: '#1e293b',
        color: '#ffffff'
    });
}

// 4. Send Request directly to Telegram with 1-Click WhatsApp Reply Link[cite: 6]
function submitProgramRequestTelegram(subjectName, college, sem) {
    const nameInput = document.getElementById("req-student-name").value.trim();
    const waInput = document.getElementById("req-student-wa").value.trim();
    const topicInput = document.getElementById("req-student-topic").value.trim();
    const submitBtn = document.getElementById("reqSubmitBtn");

    if (!nameInput || !waInput || !topicInput) {
        alert("⚠️ Kripya Name, WhatsApp Number aur Program Topic sabhi bharein!");
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(waInput)) {
        alert("⚠️ Kripya 10-digit ka valid mobile number dalein!");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending to Subham...";

    const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; //[cite: 5, 6]
    const chatId = '@bca_dashboard_subham'; //[cite: 6]

    // Pre-filled WhatsApp reply link for you
    const waReplyDirectLink = `https://wa.me/91${waInput}?text=` + encodeURIComponent(`Hello ${nameInput}! Main Subham Kumar Ray BCA Study Zone se. Aapne '${topicInput}' ka program request kiya tha. Yeh raha aapka required code solution:`); //

    const telegramReqMessage = 
        `🚨 *NEW PROGRAM CODE REQUEST* 🚨\n\n` +
        `👤 *Student Name:* ${nameInput}\n` +
        `🏫 *College:* ${college}\n` +
        `📚 *Semester:* ${sem}\n\n` +
        `💻 *Subject:* ${subjectName}\n` +
        `📝 *Requested Topic:* \n"${topicInput}"\n\n` +
        `📱 *Student WhatsApp:* \`+91${waInput}\`\n` +
        `🕒 *Time:* ${formattedTime}\n\n` +
        `👉 [Click Here to Send Solution on WhatsApp](${waReplyDirectLink})`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramReqMessage,
            parse_mode: 'Markdown'
        })
    })
    .then(() => {
        Swal.fire({
            title: 'Request Sent Successfully! 🎉',
            html: `<p style="font-size:1.3rem; color:#cbd5e1;">Aapki request Subham Kumar Ray ke paas chali gayi hai. Code verify hote hi aapke WhatsApp par solution bhej diya jayega! 📲</p>`,
            icon: 'success',
            confirmButtonColor: '#009dff',
            confirmButtonText: 'Great, Thank You!',
            background: '#0f172a',
            color: '#ffffff'
        });
    })
    .catch(() => {
        alert("⚠️ Connection error. Kripya dobara try karein.");
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Request 🚀";
    });
}



// =========================================================================
// 🚀 AUTO-FETCH PROGRAM REQUEST ENGINE (ONLY WHATSAPP, TOPIC & PHOTO)
// =========================================================================

function openDirectProgramRequestModal() {
    // 🧠 Student ka pehle se saved data automatically fetch karein
    const studentName = localStorage.getItem("student_tracked_name") || "Student";
    const studentCollege = localStorage.getItem("student_tracked_college") || "VBU BCA College";
    const studentSem = localStorage.getItem("student_tracked_sem") || "Semester 1";

    Swal.fire({
        title: '<span style="font-size:1.55rem; font-weight:800; color:#ffffff !important;">📸 Request BCA Program</span>',
        html: `
            <!-- Auto-detected Verified Student Badge -->
            <div style="background: rgba(0, 247, 255, 0.08); border: 1px solid rgba(0, 247, 255, 0.25); border-radius: 8px; padding: 6px 12px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; text-align: left;">
                <span style="font-size: 1.1rem; color: #00f7ff; font-weight: 700;">
                    <i class="fas fa-user-check"></i> ${studentName}
                </span>
                <span style="font-size: 1.0rem; color: #94a3b8; font-weight: 600;">
                    ${studentCollege} | ${studentSem}
                </span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; text-align: left;">
                
                <!-- 1. WhatsApp Number (Mandatory) -->
                <div>
                    <label style="font-size: 1.05rem; color: #cbd5e1; font-weight: 600; display: block; margin-bottom: 3px;">
                        WhatsApp Number <span style="color: #ff3366;">* (जरूरी है)</span>:
                    </label>
                    <input type="tel" id="direct-req-wa" maxlength="10" placeholder="10-digit WhatsApp Number" class="vault-compact-input" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 1.25rem; box-sizing: border-box; outline: none;">
                </div>

                <!-- 2. Question Topic (Agar Photo Nahi Hai) -->
                <div>
                    <label style="font-size: 1.05rem; color: #cbd5e1; font-weight: 600; display: block; margin-bottom: 3px;">
                        Question Topic (Agar photo nahi hai):
                    </label>
                    <input type="text" id="direct-req-topic" placeholder="Jaise: Pascal Triangle using malloc" class="vault-compact-input" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 1.2rem; box-sizing: border-box; outline: none;">
                </div>

                <!-- 3. Question Paper Photo Upload (Optional) -->
                <div style="margin-top: 2px;">
                    <label style="font-size: 1.05rem; color: #00f7ff; font-weight: 600; display: block; margin-bottom: 4px;">
                        📷 Question Paper Photo (Optional):
                    </label>
                    
                    <div class="vault-slim-upload-box" onclick="document.getElementById('direct-req-file').click()" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border: 1.5px dashed rgba(0, 247, 255, 0.6); border-radius: 8px; background: rgba(0, 247, 255, 0.05); cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-camera" style="color: #00f7ff; font-size: 1.3rem;"></i>
                            <span id="vaultUploadStatusText" style="color: #ffffff !important; font-weight: 600; font-size: 1.1rem;">Choose or Capture Photo</span>
                        </div>
                        <span style="font-size: 0.95rem; color: #64748b;">(Max 5MB)</span>
                        <input type="file" id="direct-req-file" accept="image/*" style="display: none;" onchange="handleQuestionPhotoSelection(this)">
                    </div>

                    <!-- Mini Compact Image Preview -->
                    <div id="vaultPhotoPreviewWrap" class="vault-mini-preview" style="display: none; align-items: center; justify-content: space-between; margin-top: 6px; padding: 4px 8px; background: rgba(15, 23, 42, 0.8); border-radius: 6px; border: 1px solid #00f7ff;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img id="vaultPhotoPreviewImg" src="" alt="Thumb" style="height: 38px; width: 38px; object-fit: cover; border-radius: 4px;">
                            <span id="vaultPhotoName" style="color: #00ff88; font-size: 0.95rem; font-weight: 600; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></span>
                        </div>
                        <button type="button" onclick="clearSelectedPhoto()" style="background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer;">✕</button>
                    </div>
                </div>
            </div>

            <button onclick="submitDirectProgramRequest('${studentName}', '${studentCollege}', '${studentSem}')" id="directReqSubmitBtn" style="margin-top: 14px; width: 100%; padding: 11px; font-size: 1.3rem; font-weight: 800; color: #000; background: linear-gradient(135deg, #00f7ff, #009dff); border: none; border-radius: 8px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;">
                Send to Subham 🚀
            </button>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '440px',
        padding: '16px',
        background: '#1e293b',
        color: '#ffffff'
    });
}

// 🚀 Request Submission Engine
function submitDirectProgramRequest(studentName, studentCollege, studentSem) {
    const wa = document.getElementById("direct-req-wa").value.trim();
    let topic = document.getElementById("direct-req-topic").value.trim();
    const fileInput = document.getElementById("direct-req-file");
    const submitBtn = document.getElementById("directReqSubmitBtn");

    const hasPhoto = fileInput && fileInput.files && fileInput.files.length > 0;

    // 1. Mandatory WhatsApp Number Check
    if (!wa) {
        alert("⚠️ Solution paane ke liye WhatsApp Number daalna zaroori hai!");
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(wa)) {
        alert("⚠️ Kripya 10-digit ka valid WhatsApp number dalein jo 6, 7, 8 ya 9 se shuru hota ho!");
        return;
    }

    // 2. Either Topic or Photo Mandatory
    if (!topic && !hasPhoto) {
        alert("⚠️ Kripya ya toh Question Topic likhein ya Question ki Photo upload karein!");
        return;
    }

    // 3. Format Topic
    if (topic) {
        topic = topic.replace(/\b\w/g, c => c.toUpperCase());
    } else {
        topic = "Question Attached in Uploaded Photo 📸";
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Transmitting to Telegram...";

    const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
    const chatId = '@bca_dashboard_subham';

    // 1-Click WhatsApp direct solution chat link
    const waReplyDirectLink = `https://wa.me/91${wa}?text=` + encodeURIComponent(`Hello ${studentName}! Main Subham Kumar Ray BCA Study Zone se. Aapne '${topic}' ka program manga tha. Yeh raha aapka required code solution:`);

    if (hasPhoto) {
        // 📸 CASE A: TELEGRAM PHOTO
        const photoFile = fileInput.files[0];
        const captionText = 
            `📸 *NEW CODING QUESTION PHOTO* 🚨\n\n` +
            `👤 *Student Name:* ${studentName}\n` +
            `🏫 *College:* ${studentCollege}\n` +
            `📚 *Semester:* ${studentSem}\n\n` +
            `📝 *Topic / Note:* \n"${topic}"\n\n` +
            `📱 *WhatsApp:* \`+91${wa}\`\n` +
            `🕒 *Time:* ${formattedTime}\n\n` +
            `👉 [Send Solution on WhatsApp](${waReplyDirectLink})`;

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", photoFile);
        formData.append("caption", captionText);
        formData.append("parse_mode", "Markdown");

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                showSuccessAlert();
            } else {
                throw new Error("Telegram API rejection");
            }
        })
        .catch(() => {
            alert("⚠️ Photo upload failed. Kripya image dobara try karein.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send to Subham 🚀";
        });

    } else {
        // 📝 CASE B: TELEGRAM TEXT
        const textMessage = 
            `🚨 *NEW PROGRAM CODE REQUEST* 🚨\n\n` +
            `👤 *Student Name:* ${studentName}\n` +
            `🏫 *College:* ${studentCollege}\n` +
            `📚 *Semester:* ${studentSem}\n\n` +
            `📝 *Requested Topic:* \n"${topic}"\n\n` +
            `📱 *WhatsApp:* \`+91${wa}\`\n` +
            `🕒 *Time:* ${formattedTime}\n\n` +
            `👉 [Send Solution on WhatsApp](${waReplyDirectLink})`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: textMessage,
                parse_mode: 'Markdown'
            })
        })
        .then(() => showSuccessAlert())
        .catch(() => {
            alert("⚠️ Connection error. Kripya dobara try karein.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send to Subham 🚀";
        });
    }

    function showSuccessAlert() {
        Swal.fire({
            title: 'Request Sent! 🎉',
            html: `<p style="font-size:1.25rem; color:#cbd5e1;">Aapka question Shubham Kumar Ray ke paas chala gaya hai. Solution verify hote hi aapke WhatsApp par bhej diya jayega! 📲</p>`,
            icon: 'success',
            confirmButtonColor: '#009dff',
            confirmButtonText: 'OK',
            background: '#0f172a',
            color: '#ffffff'
        });
    }
}


// =========================================================================
// 📸 DEDICATED PROGRAM CODE REQUEST ENGINE (PHOTO UPLOAD + TELEGRAM SENDPHOTO)
// =========================================================================

function openDirectProgramRequestModal() {
    const defaultName = localStorage.getItem("student_tracked_name") || "";
    const defaultCollege = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const defaultSem = localStorage.getItem("student_tracked_sem") || "Semester 1";

    Swal.fire({
        title: '<span style="font-size:1.6rem; font-weight:800;">📸 Request BCA Program</span>',
        html: `
            <p style="font-size: 1.1rem; color: #94a3b8; margin: -5px 0 12px 0;">
                Topic likhein ya assignment paper ki photo upload karein 📥
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 0px;">
                <!-- Row 1: Subject Selection (Full Width) -->
                <div class="vault-compact-field">
                    <label class="vault-compact-label">Subject / Language:</label>
                    <select id="direct-req-subject" class="vault-compact-input">
                        <option value="C Programming">C Programming (C1005)</option>
                        <option value="C++ & OOP">C++ & OOP (C2004)</option>
                        <option value="Data Structures in C">Data Structures in C (C3001)</option>
                        <option value="Java Programming">Java Programming (C3002)</option>
                        <option value="Web Design (HTML/CSS/JS)">Web Design (HTML/CSS/JS)</option>
                        <option value="Python / Linux">Python / Linux Shell</option>
                        <option value="Other Subject">Other Subject / Topic</option>
                    </select>
                </div>

                <!-- Row 2: Name & WhatsApp (2-Column Rectangle Grid) -->
                <div class="vault-compact-grid">
                    <div class="vault-compact-field">
                        <label class="vault-compact-label">Full Name:</label>
                        <input type="text" id="direct-req-name" value="${defaultName}" placeholder="Your Name" class="vault-compact-input">
                    </div>
                    <div class="vault-compact-field">
                        <label class="vault-compact-label">WhatsApp Number:(Answer lene ke liye)</label>
                        <input type="tel" id="direct-req-wa" maxlength="10" placeholder="10-digit Number" class="vault-compact-input">
                    </div>
                </div>

                <!-- Row 3: Question Topic (Single Line / Compact) -->
                <div class="vault-compact-field">
                    <label class="vault-compact-label">Question Topic (Agar photo nahi hai):</label>
                    <input type="text" id="direct-req-topic" placeholder="Hint: Write a program of two number using C( Any Question)" class="vault-compact-input">
                </div>

                <!-- Row 4: Slim Rectangular Photo Upload Strip -->
                <div class="vault-compact-field" style="margin-top: 2px;">
                    <label class="vault-compact-label" style="color: #00f7ff;">📷 Question Paper Photo (Optional):</label>
                    <div class="vault-slim-upload-box" onclick="document.getElementById('direct-req-file').click()">
                        <div class="vault-slim-upload-left">
                            <i class="fas fa-camera" style="color: #00f7ff; font-size: 1.3rem;"></i>
                            <span id="vaultUploadStatusText">Choose or Capture Photo</span>
                        </div>
                        <span style="font-size: 0.95rem; color: #64748b;">(Max 5MB)</span>
                        <input type="file" id="direct-req-file" accept="image/*" style="display: none;" onchange="handleQuestionPhotoSelection(this)">
                    </div>

                    <!-- Mini Compact Image Preview -->
                    <div id="vaultPhotoPreviewWrap" class="vault-mini-preview">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img id="vaultPhotoPreviewImg" src="" alt="Thumb">
                            <span id="vaultPhotoName" style="color: #00ff88; font-size: 0.95rem; font-weight: 600; max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></span>
                        </div>
                        <button type="button" onclick="clearSelectedPhoto()" style="background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer;">✕</button>
                    </div>
                </div>
            </div>

            <button onclick="submitDirectProgramRequest('${defaultCollege}', '${defaultSem}')" id="directReqSubmitBtn" style="margin-top: 10px; width: 100%; padding: 10px; font-size: 1.25rem; font-weight: 800; color: #000; background: linear-gradient(135deg, #00f7ff, #009dff); border: none; border-radius: 8px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;">
                Send to Subham 🚀
            </button>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '460px', // 🎯 Perfect Clean Rectangular Width
        padding: '16px',
        background: '#1e293b',
        color: '#ffffff'
    });
}

// 🖼️ Slim Thumbnail Preview & Reset Functions
function handleQuestionPhotoSelection(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert("⚠️ File size 5MB se chhota hona chahiye!");
            input.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("vaultPhotoPreviewImg").src = e.target.result;
            document.getElementById("vaultPhotoName").innerText = file.name;
            document.getElementById("vaultPhotoPreviewWrap").style.display = "flex";
            document.getElementById("vaultUploadStatusText").innerText = "✓ Photo Attached";
        };
        reader.readAsDataURL(file);
    }
}

function clearSelectedPhoto() {
    const fileInput = document.getElementById('direct-req-file');
    if (fileInput) fileInput.value = "";
    document.getElementById("vaultPhotoPreviewWrap").style.display = "none";
    document.getElementById("vaultUploadStatusText").innerText = "Choose or Capture Photo";
}

// 🚀 Request Submission Engine (Handles both Image & Text)
function submitDirectProgramRequest(college, sem) {
    const subject = document.getElementById("direct-req-subject").value;
    let name = document.getElementById("direct-req-name").value.trim();
    const wa = document.getElementById("direct-req-wa").value.trim();
    let topic = document.getElementById("direct-req-topic").value.trim();
    const fileInput = document.getElementById("direct-req-file");
    const submitBtn = document.getElementById("directReqSubmitBtn");

    const hasPhoto = fileInput && fileInput.files && fileInput.files.length > 0;

    // 1. Mandatory Input Validation
    if (!name || !wa) {
        alert("⚠️ Kripya Name aur WhatsApp Number zaroor bharein!");
        return;
    }

    if (!topic && !hasPhoto) {
        alert("⚠️ Kripya ya toh Topic likhein ya Question ki Photo upload karein!");
        return;
    }

    // 2. Strict Indian Mobile Number Validation
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(wa)) {
        alert("⚠️ Kripya 10-digit ka valid WhatsApp number dalein jo 6, 7, 8, ya 9 se shuru hota ho!");
        return;
    }

    // 3. Auto-Capitalization Formatter[cite: 5]
    name = name.replace(/\b\w/g, c => c.toUpperCase());
    if (topic) {
        topic = topic.replace(/\b\w/g, c => c.toUpperCase());
    } else {
        topic = "Question Attached in Uploaded Photo 📸";
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Transmitting to Telegram...";

    const formattedTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const botToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
    const chatId = '@bca_dashboard_subham';

    // 1-Click WhatsApp direct solution chat link
    const waReplyDirectLink = `https://wa.me/91${wa}?text=` + encodeURIComponent(`Hello ${name}! Main Subham Kumar Ray BCA Study Zone se. Aapne '${subject}' ke topic '${topic}' ka program manga tha. Yeh raha aapka required code solution:`);

    if (hasPhoto) {
        // ==========================================
        // 📸 CASE A: TELEGRAM SENDPHOTO (IMAGE + DATA)
        // ==========================================
        const photoFile = fileInput.files[0];
        const captionText = 
            `📸 *NEW CODING QUESTION PHOTO RECEIVED!* 🚨\n\n` +
            `👤 *Student Name:* ${name}\n` +
            `🏫 *College:* ${college}\n` +
            `📚 *Semester:* ${sem}\n` +
            `💻 *Subject:* ${subject}\n\n` +
            `📝 *Topic / Note:* \n"${topic}"\n\n` +
            `📱 *WhatsApp:* \`+91${wa}\`\n` +
            `🕒 *Time:* ${formattedTime}\n\n` +
            `👉 [Send Solution on WhatsApp](${waReplyDirectLink})`;

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", photoFile);
        formData.append("caption", captionText);
        formData.append("parse_mode", "Markdown");

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                showSuccessAlert();
            } else {
                throw new Error("Telegram API rejection");
            }
        })
        .catch(() => {
            alert("⚠️ Photo upload failed. Kripya image size chhota karke dobara try karein.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send to Subham 🚀";
        });

    } else {
        // ==========================================
        // 📝 CASE B: TELEGRAM SENDMESSAGE (TEXT ONLY)
        // ==========================================
        const textMessage = 
            `🚨 *NEW PROGRAM CODE REQUEST* 🚨\n\n` +
            `👤 *Student Name:* ${name}\n` +
            `🏫 *College:* ${college}\n` +
            `📚 *Semester:* ${sem}\n` +
            `💻 *Subject:* ${subject}\n\n` +
            `📝 *Requested Topic:* \n"${topic}"\n\n` +
            `📱 *WhatsApp:* \`+91${wa}\`\n` +
            `🕒 *Time:* ${formattedTime}\n\n` +
            `👉 [Send Solution on WhatsApp](${waReplyDirectLink})`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: textMessage,
                parse_mode: 'Markdown'
            })
        })
        .then(() => showSuccessAlert())
        .catch(() => {
            alert("⚠️ Connection error. Kripya dobara try karein.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send to Subham 🚀";
        });
    }

    function showSuccessAlert() {
        Swal.fire({
            title: 'Request Transmitted! 🎉',
            html: `<p style="font-size:1.3rem; color:#cbd5e1;">Aapka program question Shubham Kumar Ray ke paas successfully deliver ho gaya hai. Solution verify hote hi aapke WhatsApp par send kar diya jayega! 📲</p>`,
            icon: 'success',
            confirmButtonColor: '#009dff',
            confirmButtonText: 'Great, Thank You!',
            background: '#0f172a',
            color: '#ffffff'
        });
    }
}
