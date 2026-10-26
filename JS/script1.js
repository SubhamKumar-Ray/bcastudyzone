// =========================================================================
// 👑 COMPLETE PROFILE MANAGER & RE-LOGIN CONTROLLER (script1.js)
// =========================================================================

const TELEGRAM_BOT_TOKEN = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
const TELEGRAM_CHAT_ID = '@bca_dashboard_subham';
const FIREBASE_ACTIVE_USERS_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers";

// 1. Header & Modal UI Renderer (Displays First Letter)
function updateStudentHeaderProfile() {
    const isVerified = localStorage.getItem("student_verified_profile") === "true";
    const name = localStorage.getItem("student_tracked_name") || "Student";
    const college = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const sem = localStorage.getItem("student_tracked_sem") || "Semester 1";

    const triggerBtn = document.getElementById("customProfileTrigger");
    if (!triggerBtn) return;

    if (isVerified) {
        triggerBtn.style.display = "inline-flex";

        const headerInit = document.getElementById("headerAvatarInitial");
        const modalInit = document.getElementById("modalAvatarBig");

        // First Letter Extraction
        const firstLetter = name.trim().charAt(0).toUpperCase() || "S";
        if (headerInit) headerInit.innerText = firstLetter;
        if (modalInit) modalInit.innerText = firstLetter;

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

// 3. EDIT PROFILE (Only Text Data - No Photo & No Old Record Comparison)
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

            if (!newName || !newCollege || !newSem) {
                Swal.showValidationMessage("Please fill all required details! (सभी जानकारी भरें)");
                return false;
            }

            const formattedName = newName.replace(/\b\w/g, c => c.toUpperCase());
            return { name: formattedName, college: newCollege, sem: newSem };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const data = result.value;
            const updateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            // 1. Text LocalStorage Update
            localStorage.setItem("student_tracked_name", data.name);
            localStorage.setItem("student_tracked_college", data.college);
            localStorage.setItem("student_tracked_sem", data.sem);

            // 2. Firebase Update
            if (studentUID) {
                fetch(`${FIREBASE_ACTIVE_USERS_URL}/${studentUID}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: data.name,
                        collegeName: data.college,
                        currentSemester: data.sem,
                        lastUpdatedTime: updateTime
                    })
                }).catch(() => {});
            }

            // 3. Telegram Clean Notification (No Old vs New comparison)
            const telegramCaption = 
                `✏️ *STUDENT PROFILE UPDATED* ✏️\n\n` +
                `👤 *Name:* ${data.name}\n` +
                `🏫 *College:* ${data.college}\n` +
                `📚 *Semester:* ${data.sem}\n` +
                `🕒 *Time:* ${updateTime}\n` +
                `📱 *Device:* ${navigator.platform}`;

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

// 5. RE-LOGIN MODAL: NAME + COLLEGE INPUT (100% Sahi Direct Matching)
window.openStudentReLoginModal = function() {
    Swal.fire({
        title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">🔑 Direct Student Sign In</span>',
        html: `
            <p style="color:#cbd5e1; font-size:1.15rem; margin-bottom:12px; text-align: left;">
                अपना रजिस्टर्ड Name और College चुनें:
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                <div>
                    <label style="color:#94a3b8; font-size:1.05rem; display:block; margin-bottom:4px;">Full Name:</label>
                    <input type="text" id="relogin-student-name" placeholder="e.g. Subham Kumar Ray" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                </div>
                <div>
                    <label style="color:#94a3b8; font-size:1.05rem; display:block; margin-bottom:4px;">Registered College:</label>
                    <select id="relogin-student-college" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                        <option value="" disabled selected>Select Your College</option>
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
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Verify & Sign In 🚀',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#009dff',
        cancelButtonColor: '#475569',
        background: '#0b1329',
        color: '#ffffff',
        target: document.body,
        preConfirm: () => {
            const nameInput = document.getElementById("relogin-student-name").value.trim().toLowerCase();
            const collegeInput = document.getElementById("relogin-student-college").value;

            if (!nameInput || !collegeInput) {
                Swal.showValidationMessage("Name aur College dono bharna zaroori hai!");
                return false;
            }
            return { name: nameInput, college: collegeInput };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const query = result.value;

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
                            const rec = allData[key];
                            if (
                                rec.studentName && 
                                rec.studentName.trim().toLowerCase() === query.name &&
                                rec.collegeName === query.college
                            ) {
                                matchedKey = key;
                                matchedRecord = rec;
                                break;
                            }
                        }
                    }

                    if (matchedRecord) {
                        // Check if banned
                        if (matchedRecord.status === "banned") {
                            localStorage.setItem("student_portal_uid", matchedKey);
                            if (typeof window.verifyStudentAccessStatus === "function") {
                                window.verifyStudentAccessStatus();
                            }
                            return;
                        }

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
                                text: `🔑 *STUDENT SIGN-IN SUCCESSFUL*\n\n👤 *Name:* ${matchedRecord.studentName}\n🏫 *College:* ${matchedRecord.collegeName}\n📚 *Semester:* ${matchedRecord.currentSemester}\n🕒 *Time:* ${time}`,
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
                            text: 'इस Name और College से कोई छात्र नहीं मिला। कृपया पहली बार वाला रजिस्ट्रेशन फॉर्म भरें।',
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
