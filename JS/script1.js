// =========================================================================
// 👑 COMPLETE PROFILE MANAGER & RE-LOGIN CONTROLLER (script1.js)
// =========================================================================

const TELEGRAM_BOT_TOKEN = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
const TELEGRAM_CHAT_ID = '@bca_dashboard_subham';
const FIREBASE_ACTIVE_USERS_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers";

// 1. Header & Modal UI Renderer (Displays Photo or Letter)
function updateStudentHeaderProfile() {
    const isVerified = localStorage.getItem("student_verified_profile") === "true";
    const name = localStorage.getItem("student_tracked_name") || "Student Name";
    const college = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const sem = localStorage.getItem("student_tracked_sem") || "Semester 6";
    const photoBase64 = localStorage.getItem("student_profile_photo_data");

    const triggerBtn = document.getElementById("customProfileTrigger");
    if (!triggerBtn) return;

    if (isVerified) {
        triggerBtn.style.display = "inline-flex";

        const headerInit = document.getElementById("headerAvatarInitial");
        const headerImg = document.getElementById("headerAvatarImg");
        const modalInit = document.getElementById("modalAvatarBig");
        const modalImg = document.getElementById("modalAvatarBigImg");

        // Photo Check
        if (photoBase64 && photoBase64.startsWith("data:image")) {
            if (headerImg) { headerImg.src = photoBase64; headerImg.style.display = "block"; }
            if (headerInit) headerInit.style.display = "none";

            if (modalImg) { modalImg.src = photoBase64; modalImg.style.display = "block"; }
            if (modalInit) modalInit.style.display = "none";
        } else {
            const firstLetter = name.trim().charAt(0).toUpperCase() || "S";
            if (headerInit) { headerInit.innerText = firstLetter; headerInit.style.display = "block"; }
            if (headerImg) headerImg.style.display = "none";

            if (modalInit) { modalInit.innerText = firstLetter; modalInit.style.display = "block"; }
            if (modalImg) modalImg.style.display = "none";
        }

        const modalName = document.getElementById("modalStudentName");
        const modalCollege = document.getElementById("modalStudentCollege");
        const modalSem = document.getElementById("modalStudentSem");

        if (modalName) modalName.innerText = name;
        if (modalCollege) modalCollege.innerText = college;
        if (modalSem) modalSem.innerText = sem;
    } else {
        triggerBtn.style.display = "none";
    }
}

// 2. Open / Close Profile Popup Modal
function toggleProfilePopupModal() {
    const modal = document.getElementById("profilePopupModal");
    const overlay = document.getElementById("profileModalOverlay");
    if (!modal) return;

    if (modal.style.display === "flex") {
        closeProfilePopupModal();
    } else {
        modal.style.display = "flex";
        if (overlay) overlay.style.display = "block";
    }
}

function closeProfilePopupModal() {
    const modal = document.getElementById("profilePopupModal");
    const overlay = document.getElementById("profileModalOverlay");
    if (modal) modal.style.display = "none";
    if (overlay) overlay.style.display = "none";
}

// 3. EDIT PROFILE (With Photo, Old vs New Comparison)
function openEditProfileModal() {
    closeProfilePopupModal();

    const oldName = localStorage.getItem("student_tracked_name") || "";
    const oldCollege = localStorage.getItem("student_tracked_college") || "";
    const oldSem = localStorage.getItem("student_tracked_sem") || "";
    const studentUID = localStorage.getItem("student_portal_uid");

    Swal.fire({
        title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">✏️ Edit Profile / प्रोफ़ाइल बदलें</span>',
        html: `
            <div style="display: flex; flex-direction: column; gap: 12px; text-align: left; margin-top: 10px;">
                <div>
                    <label style="color:#cbd5e1; font-size:1.1rem; font-weight:600; display:block; margin-bottom:4px;">Full Name (पूरा नाम):</label>
                    <input type="text" id="edit-swal-name" value="${oldName}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.25rem; box-sizing:border-box;">
                </div>

                <div>
                    <label style="color:#cbd5e1; font-size:1.1rem; font-weight:600; display:block; margin-bottom:4px;">College Name (कॉलेज का नाम):</label>
                    <select id="edit-swal-college" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.25rem; box-sizing:border-box;">
                        <option value="Annada College, Hazaribag">Annada College, Hazaribag</option>
                        <option value="St. Columba's College, Hazaribag">St. Columba's College, Hazaribag</option>
                        <option value="Chatra College, Chatra">Chatra College, Chatra</option>
                        <option value="Ramgarh College, Ramgarh">Ramgarh College, Ramgarh</option>
                        <option value="J.J College, Jhumritelaiya, Koderma">J.J College, Jhumritelaiya, Koderma</option>
                        <option value="K.B. Women's College, Hazaribag">K.B. Women's College, Hazaribag</option>
                        <option value="Markham College of Commerce, Hazaribag">Markham College of Commerce, Hazaribag</option>
                        <option value="VBU University Department, Hazaribag">VBU University Department</option>
                        <option value="Other College">Other College (अन्य कॉलेज)</option>
                    </select>
                </div>

                <div>
                    <label style="color:#cbd5e1; font-size:1.1rem; font-weight:600; display:block; margin-bottom:4px;">Semester (सेमेस्टर):</label>
                    <select id="edit-swal-sem" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.25rem; box-sizing:border-box;">
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4</option>
                        <option value="Semester 5">Semester 5</option>
                        <option value="Semester 6">Semester 6</option>
                    </select>
                </div>

                <div>
                    <label style="color:#00f7ff; font-size:1.1rem; font-weight:600; display:block; margin-bottom:4px;">📷 Change Photo (फोटो बदलें):</label>
                    <input type="file" id="edit-swal-photo" accept="image/*" style="width:100%; padding:8px; border:1.5px dashed #00f7ff; border-radius:8px; background:#0f172a; color:#cbd5e1; font-size:1.1rem; box-sizing:border-box;">
                </div>
            </div>
        `,
        didOpen: () => {
            if (oldCollege) document.getElementById("edit-swal-college").value = oldCollege;
            if (oldSem) document.getElementById("edit-swal-sem").value = oldSem;
        },
        showCancelButton: true,
        confirmButtonText: 'Save Changes / सेव करें 💾',
        cancelButtonText: 'Cancel / रद्द करें',
        confirmButtonColor: '#009dff',
        cancelButtonColor: '#475569',
        background: '#0b1329',
        color: '#ffffff',
        preConfirm: () => {
            const newName = document.getElementById("edit-swal-name").value.trim();
            const newCollege = document.getElementById("edit-swal-college").value;
            const newSem = document.getElementById("edit-swal-sem").value;
            const photoInput = document.getElementById("edit-swal-photo");

            if (!newName || !newCollege || !newSem) {
                Swal.showValidationMessage("Please fill all required details! (सभी जानकारी भरें)");
                return false;
            }

            const formattedName = newName.replace(/\b\w/g, c => c.toUpperCase());
            const file = (photoInput && photoInput.files && photoInput.files[0]) ? photoInput.files[0] : null;

            return { name: formattedName, college: newCollege, sem: newSem, file: file };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const data = result.value;
            const updateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            // 1. Text LocalStorage Update
            localStorage.setItem("student_tracked_name", data.name);
            localStorage.setItem("student_tracked_college", data.college);
            localStorage.setItem("student_tracked_sem", data.sem);

            // 2. Firebase Update (ONLY TEXT DATA - NO PHOTO!)
            if (studentUID) {
                fetch(`${FIREBASE_ACTIVE_USERS_URL}/${studentUID}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: data.name,
                        collegeName: data.college,
                        currentSemester: data.sem,
                        isProfileUpdated: true,
                        lastUpdatedTime: updateTime
                    })
                }).catch(() => {});
            }

            // 3. Telegram Comparison Alert
            const telegramCaption = 
                `🔄 *STUDENT PROFILE UPDATED* 🔄\n\n` +
                `🆔 *Student ID:* \`${studentUID || "N/A"}\`\n\n` +
                `❌ *OLD RECORD (पुराना डेटा):*\n` +
                `• Name: ${oldName}\n` +
                `• College: ${oldCollege}\n` +
                `• Semester: ${oldSem}\n\n` +
                `✨ *NEW RECORD (नया डेटा):*\n` +
                `• Name: ${data.name}\n` +
                `• College: ${data.college}\n` +
                `• Semester: ${data.sem}\n` +
                `• Photo: ${data.file ? "New Photo Attached 📸" : "Unchanged"}\n\n` +
                `🕒 *Time:* ${updateTime}\n` +
                `📱 *Device:* ${navigator.platform}`;

            if (data.file) {
                // Device Local Storage
                const reader = new FileReader();
                reader.onload = function(e) {
                    localStorage.setItem("student_profile_photo_data", e.target.result);
                    updateStudentHeaderProfile();
                };
                reader.readAsDataURL(data.file);

                // Telegram Photo
                const formData = new FormData();
                formData.append("chat_id", TELEGRAM_CHAT_ID);
                formData.append("photo", data.file);
                formData.append("caption", telegramCaption);
                formData.append("parse_mode", "Markdown");

                fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                }).catch(() => {});
            } else {
                fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: telegramCaption,
                        parse_mode: 'Markdown'
                    })
                }).catch(() => {});

                updateStudentHeaderProfile();
            }

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated! 🎉',
                text: 'आपकी डिटेल्स सफलता से अपडेट हो गई हैं।',
                confirmButtonColor: '#009dff',
                background: '#0b1329',
                color: '#ffffff'
            });
        }
    });
}

// 4. LOGOUT HANDLER
function handleStudentPortalLogout() {
    closeProfilePopupModal();

    Swal.fire({
        title: 'Logout Portal? / लॉगआउट करें?',
        text: 'Are you sure you want to logout? (क्या आप सच में लॉगआउट करना चाहते हैं?)',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Yes, Logout / लॉगआउट 🚪',
        cancelButtonText: 'Cancel / रद्द करें',
        background: '#0b1329',
        color: '#ffffff'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("student_verified_profile");
            localStorage.removeItem("student_tracked_name");
            localStorage.removeItem("student_tracked_college");
            localStorage.removeItem("student_tracked_sem");
            localStorage.removeItem("student_portal_uid");
            localStorage.removeItem("portal_already_entered");
            localStorage.removeItem("student_profile_photo_data");

            window.location.reload();
        }
    });
}

// 5. RE-LOGIN MODAL (100% Clickable & Global Scope)
window.openStudentReLoginModal = function() {
    // Agar tracking popup khula hai to pehle use thoda piche bhejo
    const trackingPopup = document.getElementById("studentTrackingPopup");

    Swal.fire({
        title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">🔑 Direct Student Login</span>',
        html: `
            <p style="color:#cbd5e1; font-size:1.15rem; margin-bottom:12px;">
                Enter your registered Full Name / अपना रजिस्टर्ड नाम लिखें:
            </p>
            <input type="text" id="relogin-student-name" placeholder="e.g. Subham Kumar Ray" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.25rem; box-sizing:border-box;">
        `,
        showCancelButton: true,
        confirmButtonText: 'Search & Login 🚀',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#009dff',
        cancelButtonColor: '#475569',
        background: '#0b1329',
        color: '#ffffff',
        backdrop: true,
        target: document.body, /* Direct body par render hoga, kisi popup ke piche nahi dabega */
        customClass: {
            container: 'swal-top-layer-fix'
        },
        preConfirm: () => {
            const nameInput = document.getElementById("relogin-student-name").value.trim().toLowerCase();
            if (!nameInput) {
                Swal.showValidationMessage("Please enter your registered name! (नाम लिखना ज़रूरी है)");
                return false;
            }
            return nameInput;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const queryName = result.value;

            Swal.fire({
                title: 'Checking Portal Database... 🔍',
                text: 'कृपया प्रतीक्षा करें...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
                background: '#0b1329',
                color: '#ffffff',
                target: document.body
            });

            fetch(`${FIREBASE_ACTIVE_USERS_URL}.json`)
                .then(res => res.json())
                .then(allData => {
                    let matchedKey = null;
                    let matchedRecord = null;

                    if (allData) {
                        for (let key in allData) {
                            if (allData[key].studentName && allData[key].studentName.toLowerCase() === queryName) {
                                matchedKey = key;
                                matchedRecord = allData[key];
                                break;
                            }
                        }
                    }

                    if (matchedRecord) {
                        localStorage.setItem("student_verified_profile", "true");
                        localStorage.setItem("portal_already_entered", "true");
                        localStorage.setItem("student_portal_uid", matchedKey);
                        localStorage.setItem("student_tracked_name", matchedRecord.studentName);
                        localStorage.setItem("student_tracked_college", matchedRecord.collegeName);
                        localStorage.setItem("student_tracked_sem", matchedRecord.currentSemester);

                        const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                chat_id: TELEGRAM_CHAT_ID,
                                text: `🔑 *STUDENT RE-LOGIN SUCCESSFUL*\n\n👤 *Name:* ${matchedRecord.studentName}\n🏫 *College:* ${matchedRecord.collegeName}\n📚 *Semester:* ${matchedRecord.currentSemester}\n🕒 *Time:* ${time}`,
                                parse_mode: 'Markdown'
                            })
                        }).catch(() => {});

                        Swal.fire({
                            icon: 'success',
                            title: 'Welcome Back! 🎉',
                            text: `Hello ${matchedRecord.studentName}, पोर्टल में आपका स्वागत है!`,
                            confirmButtonColor: '#009dff',
                            background: '#0b1329',
                            color: '#ffffff',
                            target: document.body
                        }).then(() => {
                            window.location.reload();
                        });

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Record Not Found! ❌',
                            text: 'इस नाम से कोई स्टूडेंट नहीं मिला। कृपया पहली बार वाला रजिस्ट्रेशन फॉर्म भरें।',
                            confirmButtonColor: '#ef4444',
                            background: '#0b1329',
                            color: '#ffffff',
                            target: document.body
                        });
                    }
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Connection Error',
                        text: 'सर्वर से कनेक्ट नहीं हो सका। कृपया इंटरनेट चेक करें।',
                        background: '#0b1329',
                        target: document.body
                    });
                });
        }
    });
};

// 6. Responsive Hamburger Bar Handler (Laptop Hide / Mobile Show)
function handleResponsiveMenuBar() {
    const menuBtn = document.getElementById("menu-btn");
    if (!menuBtn) return;

    if (window.innerWidth > 768) {
        menuBtn.style.setProperty("display", "none", "important");
    } else {
        menuBtn.style.setProperty("display", "inline-flex", "important");
    }
}

// 7. Initial Page Load
document.addEventListener("DOMContentLoaded", function() {
    updateStudentHeaderProfile();
    handleResponsiveMenuBar();
});
window.addEventListener("resize", handleResponsiveMenuBar);