// =========================================================================
// 👑 COMPLETE PROFILE MANAGER, PHOTO CROPPER & ID CARD CONTROLLER (script1.js)
// =========================================================================

const TELEGRAM_BOT_TOKEN = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s';
const TELEGRAM_CHAT_ID = '@bca_dashboard_subham';
const FIREBASE_ACTIVE_USERS_URL = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers";

let selectedRegistrationPhotoDataUrl = "";
let selectedRegistrationPhotoFile = null;
let bszReturnAlertAlreadySent = false; // Duplicate alert rokne ka lock
let bszCropperInstance = null;
let bszCropCallback = null;

// -------------------------------------------------------------------------
// 1. HEADER & MODAL UI RENDERER (SHOWS CROPPED PHOTO OR FIRST LETTER)
// -------------------------------------------------------------------------
function updateStudentHeaderProfile() {
    const isVerified = localStorage.getItem("student_verified_profile") === "true";
    const name = localStorage.getItem("student_tracked_name") || "Student";
    const college = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const sem = localStorage.getItem("student_tracked_sem") || "Semester 1";
    const photoData = localStorage.getItem("student_profile_photo_data") || "";
    const firstLetter = name.trim().charAt(0).toUpperCase() || "S";

    const triggerBtn = document.getElementById("customProfileTrigger");
    const modalAvatarBox = document.getElementById("modalAvatarContainer");
    if (!triggerBtn) return;

    if (isVerified) {
        triggerBtn.style.display = "inline-flex";

        if (photoData) {
            triggerBtn.innerHTML = `<img src="${photoData}" alt="Profile">`;
        } else {
            triggerBtn.innerHTML = `<span id="headerAvatarInitial">${firstLetter}</span>`;
        }

        if (modalAvatarBox) {
            if (photoData) {
                modalAvatarBox.innerHTML = `<img src="${photoData}" alt="Profile">`;
            } else {
                modalAvatarBox.innerHTML = `<span id="modalAvatarBig">${firstLetter}</span>`;
            }
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

// -------------------------------------------------------------------------
// 2. OPEN / CLOSE PROFILE POPUP MODAL
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// 3. INTERACTIVE CIRCULAR PHOTO CROPPER
// -------------------------------------------------------------------------
window.openBszPhotoCropper = function(file, onCropComplete) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const overlay = document.getElementById("bszPhotoCropperOverlay");
        const targetImg = document.getElementById("bszCropperTargetImg");
        if (!overlay || !targetImg) return;

        bszCropCallback = onCropComplete;
        targetImg.src = e.target.result;
        overlay.style.display = "flex";

        if (bszCropperInstance) {
            bszCropperInstance.destroy();
            bszCropperInstance = null;
        }

        if (typeof Cropper !== "undefined") {
            bszCropperInstance = new Cropper(targetImg, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.88,
                restore: false,
                guides: false,
                center: true,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false
            });
        }
    };
    reader.readAsDataURL(file);
};

window.bszCropperZoom = function(ratio) {
    if (bszCropperInstance) bszCropperInstance.zoom(ratio);
};

window.bszCropperRotate = function() {
    if (bszCropperInstance) bszCropperInstance.rotate(90);
};

window.cancelBszPhotoCrop = function() {
    const overlay = document.getElementById("bszPhotoCropperOverlay");
    if (overlay) overlay.style.display = "none";
    if (bszCropperInstance) {
        bszCropperInstance.destroy();
        bszCropperInstance = null;
    }
};

window.confirmBszPhotoCrop = function() {
    if (!bszCropperInstance) return;

    const croppedCanvas = bszCropperInstance.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: 'high'
    });

    const dataUrl = croppedCanvas.toDataURL("image/jpeg", 0.88);
    croppedCanvas.toBlob(function(blob) {
        const croppedFile = new File([blob], "student_profile.jpg", { type: "image/jpeg" });
        cancelBszPhotoCrop();
        if (typeof bszCropCallback === "function") {
            bszCropCallback(dataUrl, croppedFile);
        }
    }, "image/jpeg", 0.88);
};

window.previewRegistrationPhoto = function(input) {
    if (input.files && input.files[0]) {
        openBszPhotoCropper(input.files[0], function(croppedDataUrl, croppedFile) {
            selectedRegistrationPhotoDataUrl = croppedDataUrl;
            selectedRegistrationPhotoFile = croppedFile;

            const prev = document.getElementById("track-photo-preview");
            const ph = document.getElementById("track-photo-placeholder");
            const lbl = document.getElementById("track-photo-label");
            if (prev) { prev.src = croppedDataUrl; prev.style.display = "block"; }
            if (ph) ph.style.display = "none";
            if (lbl) { lbl.innerText = "✓ Photo Cropped & Ready"; lbl.style.color = "#00ff88"; }
        });
    }
};

document.addEventListener("change", function(e) {
    if (e.target && e.target.id === "legacy-photo-input" && e.target.files && e.target.files[0]) {
        openBszPhotoCropper(e.target.files[0], function(croppedDataUrl, croppedFile) {
            localStorage.setItem("student_profile_photo_data", croppedDataUrl);
            window._latestCroppedLegacyFile = croppedFile;

            const prev = document.getElementById("legacy-photo-prev");
            const ph = document.getElementById("legacy-photo-ph");
            if (prev) { prev.src = croppedDataUrl; prev.style.display = "block"; }
            if (ph) ph.style.display = "none";
        });
    }
}, true);

// -------------------------------------------------------------------------
// 4. EDIT PROFILE (WITH PHOTO CROP & MOBILE NUMBER)
// -------------------------------------------------------------------------
function openEditProfileModal() {
    closeProfilePopupModal();

    const oldName = localStorage.getItem("student_tracked_name") || "";
    const oldCollege = localStorage.getItem("student_tracked_college") || "";
    const oldSem = localStorage.getItem("student_tracked_sem") || "";
    const oldMob = localStorage.getItem("student_tracked_mobile") || "";
    const oldPhoto = localStorage.getItem("student_profile_photo_data") || "";
    const studentUID = localStorage.getItem("student_portal_uid");

    let editedPhotoDataUrl = oldPhoto;
    let editedPhotoFile = null;

    Swal.fire({
        title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">✏️ Edit Profile & Photo</span>',
        html: `
            <div style="text-align:center; margin: 8px 0 12px 0;">
                <div onclick="document.getElementById('edit-swal-photo').click()" style="width:78px; height:78px; margin:0 auto 5px auto; border-radius:50%; border:2px solid #00f7ff; background:#0f172a; display:flex; align-items:center; justify-content:center; overflow:hidden; cursor:pointer;">
                    <img id="edit-swal-photo-prev" src="${oldPhoto}" style="display:${oldPhoto ? 'block' : 'none'}; width:100%; height:100%; object-fit:cover;">
                    <span id="edit-swal-photo-ph" style="display:${oldPhoto ? 'none' : 'block'}; color:#00f7ff; font-size:1.1rem; font-weight:700;">📷 Change</span>
                </div>
                <span style="color:#94a3b8; font-size:1rem;">Tap photo to crop &amp; update</span>
                <input type="file" id="edit-swal-photo" accept="image/*" style="display:none;">
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                <div>
                    <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Full Name:</label>
                    <input type="text" id="edit-swal-name" value="${oldName}" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                </div>
                <div>
                    <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Mobile Number (10-digit):</label>
                    <input type="tel" id="edit-swal-mobile" maxlength="10" value="${oldMob}" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                </div>
                <div>
                    <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">College Name:</label>
                    <select id="edit-swal-college" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
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
                    <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Semester:</label>
                    <select id="edit-swal-sem" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
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

            const photoInput = document.getElementById("edit-swal-photo");
            if (photoInput) {
                photoInput.addEventListener("change", function() {
                    if (this.files && this.files[0]) {
                        openBszPhotoCropper(this.files[0], function(croppedUrl, croppedFile) {
                            editedPhotoDataUrl = croppedUrl;
                            editedPhotoFile = croppedFile;
                            const p = document.getElementById("edit-swal-photo-prev");
                            const ph = document.getElementById("edit-swal-photo-ph");
                            if (p) { p.src = croppedUrl; p.style.display = "block"; }
                            if (ph) ph.style.display = "none";
                        });
                    }
                });
            }
        },
        showCancelButton: true,
        confirmButtonText: 'Save Changes 💾',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#009dff',
        cancelButtonColor: '#475569',
        background: '#0b1329',
        color: '#ffffff',
        preConfirm: () => {
            const newName = document.getElementById("edit-swal-name").value.trim();
            const newMob = document.getElementById("edit-swal-mobile").value.trim();
            const newCollege = document.getElementById("edit-swal-college").value;
            const newSem = document.getElementById("edit-swal-sem").value;

            if (!newName || !newCollege || !newSem || !/^[6-9]\d{9}$/.test(newMob)) {
                Swal.showValidationMessage("Please enter valid Name, 10-digit Mobile, College & Semester!");
                return false;
            }
            return {
                name: newName.replace(/\b\w/g, c => c.toUpperCase()),
                mobile: newMob,
                college: newCollege,
                sem: newSem,
                photo: editedPhotoDataUrl
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const d = result.value;
            const updateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            localStorage.setItem("student_tracked_name", d.name);
            localStorage.setItem("student_tracked_mobile", d.mobile);
            localStorage.setItem("student_tracked_college", d.college);
            localStorage.setItem("student_tracked_sem", d.sem);
            if (d.photo) localStorage.setItem("student_profile_photo_data", d.photo);

            if (studentUID) {
                fetch(`${FIREBASE_ACTIVE_USERS_URL}/${studentUID}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: d.name,
                        mobileNumber: d.mobile,
                        collegeName: d.college,
                        currentSemester: d.sem,
                        photoData: d.photo,
                        lastUpdatedTime: updateTime
                    })
                }).catch(() => {});
            }

            const telegramCaption =
                `✏️ *STUDENT PROFILE UPDATED* ✏️\n\n` +
                `👤 *Name:* ${d.name}\n` +
                `🏫 *College:* ${d.college}\n` +
                `📚 *Semester:* ${d.sem}\n` +
                `📱 *Mobile:* \`+91${d.mobile}\`\n` +
                `🕒 *Time:* ${updateTime}\n` +
                `💻 *Device:* ${navigator.platform}`;

            if (editedPhotoFile) {
                const tf = new FormData();
                tf.append("chat_id", TELEGRAM_CHAT_ID);
                tf.append("photo", editedPhotoFile);
                tf.append("caption", telegramCaption);
                tf.append("parse_mode", "Markdown");
                fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: 'POST', body: tf }).catch(() => {});
            } else {
                fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramCaption, parse_mode: 'Markdown' })
                }).catch(() => {});
            }

            updateStudentHeaderProfile();
            openStudentIdCardModal();
        }
    });
}

// -------------------------------------------------------------------------
// 5. LOGOUT & DIRECT RE-LOGIN HANDLERS
// -------------------------------------------------------------------------
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
            localStorage.removeItem("student_tracked_mobile");
            localStorage.removeItem("student_portal_uid");
            localStorage.removeItem("portal_already_entered");
            localStorage.removeItem("student_profile_photo_data");

            window.location.reload();
        }
    });
}

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
                        if (matchedRecord.mobileNumber) localStorage.setItem("student_tracked_mobile", matchedRecord.mobileNumber);
                        if (matchedRecord.photoData) localStorage.setItem("student_profile_photo_data", matchedRecord.photoData);

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

// -------------------------------------------------------------------------
// 6. SINGLE-ALERT TELEGRAM + FIREBASE + PHOTO ID CARD ENGINE (NO SHEETS)
// -------------------------------------------------------------------------
function formatExactOfflineGap(msDiff) {
    const totalSeconds = Math.max(0, Math.floor(msDiff / 1000));
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    let gap = "";
    if (totalDays > 0) gap += `${totalDays} Days, `;
    if ((totalHours % 24) > 0 || totalDays > 0) gap += `${totalHours % 24} Hours, `;
    if ((totalMinutes % 60) > 0 || totalHours > 0) gap += `${totalMinutes % 60} Minutes, `;
    gap += `${totalSeconds % 60} Seconds`;
    return gap;
}

function sendStudentRegistrationToTelegram(name, college, sem, mobile, uid, timeStr, photoFile, isOldUserUpdate = false) {
    const shortId = "BSZ-" + uid.slice(-6);
    const headerTitle = isOldUserUpdate
        ? `🪪 *OLD STUDENT PROFILE COMPLETED (ID CARD)* 🪪`
        : `🎓 *NEW STUDENT REGISTERED (WITH ID CARD)* 🎓`;

    const caption =
        `${headerTitle}\n\n` +
        `🆔 *Portal ID:* \`${shortId}\`\n` +
        `👤 *Name:* ${name}\n` +
        `🏫 *College:* ${college}\n` +
        `📚 *Semester:* ${sem}\n` +
        `📱 *Mobile:* \`+91${mobile}\`\n` +
        `🕒 *Time:* ${timeStr}\n` +
        `💻 *Device:* ${navigator.platform}`;

    if (photoFile) {
        const tgForm = new FormData();
        tgForm.append("chat_id", TELEGRAM_CHAT_ID);
        tgForm.append("photo", photoFile);
        tgForm.append("caption", caption);
        tgForm.append("parse_mode", "Markdown");

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: tgForm
        }).catch(() => {});
    } else {
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: caption, parse_mode: 'Markdown' })
        }).catch(() => {});
    }
}

window.submitStudentMetadataPipeline = function() {
    const nameInput = document.getElementById("track-student-name");
    const collegeSelect = document.getElementById("track-student-college");
    const semSelect = document.getElementById("track-student-sem");
    const mobInput = document.getElementById("track-student-mobile");
    const verifyBtn = document.getElementById("trackVerifyBtn");

    if (!nameInput || !collegeSelect || !semSelect || !mobInput) return;

    const name = nameInput.value.trim();
    const college = collegeSelect.value;
    const semester = semSelect.value;
    const mobile = mobInput.value.trim();

    if (!selectedRegistrationPhotoDataUrl) {
        alert("⚠️ Please upload & crop your Photo first (ID Card ke liye photo zaroori hai)!");
        return;
    }
    if (!name || !college || !semester || !mobile) {
        alert("⚠️ Please fill Name, College, Semester and 10-digit Mobile Number!");
        return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        alert("⚠️ Please enter a valid 10-digit Indian Mobile Number!");
        return;
    }

    if (typeof validateStudentName === "function") {
        const check = validateStudentName(name);
        if (!check.isValid) {
            alert("⚠️ " + check.reason);
            return;
        }
    }

    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerText = "CREATING ID & VERIFYING... ⏳";
    }

    const currentTs = Date.now();
    const uidStr = currentTs.toString();
    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const structuredName = name.replace(/\b\w/g, c => c.toUpperCase());

    localStorage.setItem("student_tracked_name", structuredName);
    localStorage.setItem("student_tracked_college", college);
    localStorage.setItem("student_tracked_sem", semester);
    localStorage.setItem("student_tracked_mobile", mobile);
    localStorage.setItem("student_profile_photo_data", selectedRegistrationPhotoDataUrl);
    localStorage.setItem("student_portal_uid", uidStr);
    localStorage.setItem("student_verified_profile", "true");
    localStorage.setItem("student_last_visit_timestamp", uidStr);
    localStorage.setItem("student_last_visit_readable", formattedDate);
    localStorage.setItem("portal_already_entered", "true");

    fetch(`${FIREBASE_ACTIVE_USERS_URL}/${uidStr}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentName: structuredName,
            collegeName: college,
            currentSemester: semester,
            mobileNumber: mobile,
            photoData: selectedRegistrationPhotoDataUrl,
            entryTime: formattedDate,
            timestamp: currentTs,
            status: "active",
            platform: navigator.platform
        })
    }).catch(() => {});

    sendStudentRegistrationToTelegram(structuredName, college, semester, mobile, uidStr, formattedDate, selectedRegistrationPhotoFile, false);

    setTimeout(() => {
        const popup = document.getElementById("studentTrackingPopup");
        if (popup) popup.style.display = "none";

        const mainPage = document.getElementById("mainPage");
        if (mainPage) mainPage.style.display = "block";

        updateStudentHeaderProfile();
        openStudentIdCardModal();
    }, 500);
};

window.initIdentityTrackingVerification = function() {
    const studentUID = localStorage.getItem("student_portal_uid");
    const isVerified = localStorage.getItem("student_verified_profile") === "true";

    if (!isVerified || !studentUID) {
        const popup = document.getElementById("studentTrackingPopup");
        if (popup) popup.style.display = "flex";
        return;
    }

    if (bszReturnAlertAlreadySent) return;
    bszReturnAlertAlreadySent = true;

    fetch(`${FIREBASE_ACTIVE_USERS_URL}/${studentUID}.json`)
        .then(res => res.json())
        .then(dbData => {
            if (!dbData) {
                localStorage.clear();
                location.reload();
                return;
            }
            if (dbData.status === "banned") {
                if (typeof window.verifyStudentAccessStatus === "function") {
                    window.verifyStudentAccessStatus();
                }
                return;
            }

            const savedName = dbData.studentName || localStorage.getItem("student_tracked_name") || "Student";
            const savedCollege = dbData.collegeName || localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
            const savedSem = dbData.currentSemester || localStorage.getItem("student_tracked_sem") || "Semester 1";
            const savedMob = dbData.mobileNumber || localStorage.getItem("student_tracked_mobile") || "";
            const savedPhoto = dbData.photoData || localStorage.getItem("student_profile_photo_data") || "";

            if (savedMob) localStorage.setItem("student_tracked_mobile", savedMob);
            if (savedPhoto) localStorage.setItem("student_profile_photo_data", savedPhoto);
            updateStudentHeaderProfile();

            const nowTs = Date.now();
            const nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            const lastTs = parseInt(localStorage.getItem("student_last_visit_timestamp")) || dbData.timestamp || nowTs;
            const lastReadable = localStorage.getItem("student_last_visit_readable") || dbData.entryTime || "First Session";
            const gapString = formatExactOfflineGap(nowTs - lastTs);

            localStorage.setItem("student_last_visit_timestamp", nowTs.toString());
            localStorage.setItem("student_last_visit_readable", nowStr);

            if (typeof window.proceedToVoicePopupHandover === "function") {
                window.proceedToVoicePopupHandover();
            }

            if (!savedMob || !savedPhoto) {
                promptOldUserForPhotoAndMobile(studentUID, savedName, savedCollege, savedSem, savedMob, savedPhoto, nowStr);
                return;
            }

            const singleReturnMsg =
                `🔄 *STUDENT RETURNED (WELCOME BACK)* 🔄\n\n` +
                `🆔 *Portal ID:* \`BSZ-${studentUID.slice(-6)}\`\n` +
                `👤 *Student Name:* ${savedName}\n` +
                `🏫 *College:* ${savedCollege}\n` +
                `📚 *Semester:* ${savedSem}\n` +
                `📱 *Mobile:* \`+91${savedMob}\`\n\n` +
                `🕒 *Current Return:* ${nowStr}\n` +
                `⏮️ *Last Active Was:* ${lastReadable}\n` +
                `⏳ *Total Offline Gap:* _${gapString}_\n\n` +
                `💻 *Device:* ${navigator.platform}`;

            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: singleReturnMsg,
                    parse_mode: 'Markdown'
                })
            }).catch(() => {});

            setTimeout(() => {
                openStudentIdCardModal();
            }, 600);
        })
        .catch(() => {
            if (typeof window.proceedToVoicePopupHandover === "function") {
                window.proceedToVoicePopupHandover();
            }
            setTimeout(() => {
                openStudentIdCardModal();
            }, 600);
        });
};

function promptOldUserForPhotoAndMobile(uid, savedName, savedCollege, savedSem, savedMob, savedPhoto, nowStr) {
    Swal.fire({
        title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">🪪 Complete Your Student ID Card</span>',
        html: `
            <p style="color:#cbd5e1; font-size:1.15rem; margin-bottom:12px;">
                Hello <b>${savedName}</b>! Apna Digital ID Card banane ke liye Photo aur Mobile Number add karein:
            </p>
            <div style="text-align:center; margin-bottom:12px;">
                <div onclick="document.getElementById('legacy-photo-input').click()" style="width:78px; height:78px; margin:0 auto 5px auto; border-radius:50%; border:2px dashed #00f7ff; background:#0f172a; display:flex; align-items:center; justify-content:center; overflow:hidden; cursor:pointer;">
                    <img id="legacy-photo-prev" src="${savedPhoto}" style="display:${savedPhoto ? 'block' : 'none'}; width:100%; height:100%; object-fit:cover;">
                    <span id="legacy-photo-ph" style="display:${savedPhoto ? 'none' : 'block'}; color:#00f7ff; font-size:1rem; font-weight:700;">📷 Photo</span>
                </div>
                <span style="font-size:1rem; color:#94a3b8;">Tap circle to select &amp; crop photo</span>
                <input type="file" id="legacy-photo-input" accept="image/*" style="display:none;">
            </div>
            <div style="text-align:left;">
                <label style="color:#94a3b8; font-size:1.05rem; display:block; margin-bottom:4px;">Mobile / WhatsApp Number (10-digit):</label>
                <input type="tel" id="legacy-mobile-input" maxlength="10" value="${savedMob}" placeholder="e.g. 7061637118" style="width:100%; padding:10px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.25rem; box-sizing:border-box;">
            </div>
        `,
        confirmButtonText: 'Generate & View My ID Card 🪪',
        confirmButtonColor: '#059669',
        background: '#0b1329',
        color: '#ffffff',
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
            const m = document.getElementById("legacy-mobile-input").value.trim();
            const currentCroppedPhoto = localStorage.getItem("student_profile_photo_data") || savedPhoto;
            if (!currentCroppedPhoto) {
                Swal.showValidationMessage("ID Card ke liye Photo upload karna zaroori hai!");
                return false;
            }
            if (!/^[6-9]\d{9}$/.test(m)) {
                Swal.showValidationMessage("Valid 10-digit Indian Mobile Number dalein!");
                return false;
            }
            return { mobile: m, photo: currentCroppedPhoto };
        }
    }).then((res) => {
        if (res.isConfirmed) {
            const d = res.value;
            localStorage.setItem("student_tracked_mobile", d.mobile);
            localStorage.setItem("student_profile_photo_data", d.photo);

            fetch(`${FIREBASE_ACTIVE_USERS_URL}/${uid}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber: d.mobile, photoData: d.photo })
            }).catch(() => {});

            sendStudentRegistrationToTelegram(savedName, savedCollege, savedSem, d.mobile, uid, nowStr, window._latestCroppedLegacyFile || null, true);

            updateStudentHeaderProfile();
            openStudentIdCardModal();
        }
    });
}

// -------------------------------------------------------------------------
// 7. DIGITAL ID CARD DISPLAY & HD DOWNLOAD
// -------------------------------------------------------------------------
window.openStudentIdCardModal = function() {
    if (typeof closeProfilePopupModal === "function") closeProfilePopupModal();

    const name = localStorage.getItem("student_tracked_name") || "Student";
    const college = localStorage.getItem("student_tracked_college") || "Annada College, Hazaribag";
    const sem = localStorage.getItem("student_tracked_sem") || "Semester 1";
    const rawUid = localStorage.getItem("student_portal_uid") || Date.now().toString();
    const shortId = "BSZ-" + rawUid.slice(-6);
    const mobile = localStorage.getItem("student_tracked_mobile") || "Not Added";
    const photoData = localStorage.getItem("student_profile_photo_data") || "";
    const joinedDate = (localStorage.getItem("student_last_visit_readable") || new Date().toLocaleDateString("en-IN")).split(",")[0];

    const photoImg = document.getElementById("idCardStudentPhoto");
    const letterSpan = document.getElementById("idCardAvatarLetter");
    if (photoData && photoImg) {
        photoImg.src = photoData;
        photoImg.style.display = "block";
        if (letterSpan) letterSpan.style.display = "none";
    } else {
        if (photoImg) photoImg.style.display = "none";
        if (letterSpan) {
            letterSpan.innerText = name.trim().charAt(0).toUpperCase() || "S";
            letterSpan.style.display = "block";
        }
    }

    document.getElementById("idCardName").innerText = name;
    document.getElementById("idCardUid").innerText = shortId;
    document.getElementById("idCardCollege").innerText = college;
    document.getElementById("idCardSem").innerText = "BCA • " + sem;
    document.getElementById("idCardMobile").innerText = mobile !== "Not Added" ? `+91 ${mobile}` : "Not Added";
    document.getElementById("idCardDate").innerText = joinedDate;

    const qrPayload = `BCA STUDY ZONE VERIFIED ID\nID: ${shortId}\nName: ${name}\nMobile: +91${mobile}\nCollege: ${college}\nSemester: ${sem}`;
    document.getElementById("idCardQrImg").src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrPayload)}`;

    const waShareMsg = `🪪 *BCA STUDY ZONE - VERIFIED STUDENT ID* 🪪\n\n` +
                       `👤 *Name:* ${name}\n` +
                       `🆔 *Portal ID:* ${shortId}\n` +
                       `🏫 *College:* ${college}\n` +
                       `📚 *Semester:* ${sem}\n\n` +
                       `👉 Access VBU BCA Notes, PYQs & Lab Codes:\nhttps://subhamkumar-ray.github.io/bcastudyzone/`;
    document.getElementById("shareIdCardWaBtn").href = `https://wa.me/?text=${encodeURIComponent(waShareMsg)}`;

    document.getElementById("studentIdCardOverlay").style.display = "flex";
};

window.closeStudentIdCardModal = function() {
    const overlay = document.getElementById("studentIdCardOverlay");
    if (overlay) overlay.style.display = "none";
};

window.downloadStudentIdCardImage = function() {
    const cardElement = document.getElementById("printableStudentIdCard");
    const btn = document.getElementById("downloadIdCardBtn");
    const studentName = (localStorage.getItem("student_tracked_name") || "Student").replace(/\s+/g, "_");

    if (!cardElement || typeof html2canvas === "undefined") {
        alert("⚠️ Image generator loading, please try again in 2 seconds.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating HD Card...';

    html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = `BCA_Study_Zone_ID_${studentName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Downloaded! Download Again';
    }).catch(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i> Download ID Card (HD)';
        alert("⚠️ Please take a screenshot or try again.");
    });
};

// -------------------------------------------------------------------------
// 8. INITIAL PAGE LOAD
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    updateStudentHeaderProfile();
});

// =========================================================================
// 📱 BULLETPROOF MOBILE MENU & SUB-DROPDOWN CONTROLLER
// =========================================================================
window.toggleInstMobileMenu = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const navList = document.getElementById("instNavList");
    const btnIcon = document.querySelector("#instMobileMenuBtn i");
    if (navList) {
        navList.classList.toggle("inst-nav-open");
        if (btnIcon) {
            btnIcon.className = navList.classList.contains("inst-nav-open") ? "fas fa-times" : "fas fa-bars";
        }
    }
};

window.closeInstMobileMenu = function() {
    const navList = document.getElementById("instNavList");
    const btnIcon = document.querySelector("#instMobileMenuBtn i");
    if (navList) {
        navList.classList.remove("inst-nav-open");
    }
    if (btnIcon) {
        btnIcon.className = "fas fa-bars";
    }
};

window.toggleInstDropdown = function(anchorElem, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (window.innerWidth <= 768 && anchorElem) {
        const parentLi = anchorElem.parentElement;
        if (parentLi) {
            parentLi.classList.toggle("inst-drop-open");
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const mobileBtn = document.getElementById("instMobileMenuBtn");
    if (mobileBtn) {
        mobileBtn.onclick = function(e) {
            window.toggleInstMobileMenu(e);
        };
    }
});

// =========================================================================
// 📅 SESSION DROPDOWN WITH "SELECT SESSION" DEFAULT IN "EDIT PROFILE"
// =========================================================================
(function addSessionToEditProfileModal() {
    const origEditProfile = window.openEditProfileModal;
    if (typeof origEditProfile !== "function") return;

    window.openEditProfileModal = function() {
        if (typeof closeProfilePopupModal === "function") {
            closeProfilePopupModal();
        }

        const oldName = localStorage.getItem("student_tracked_name") || "";
        const oldCollege = localStorage.getItem("student_tracked_college") || "";
        const oldSem = localStorage.getItem("student_tracked_sem") || "";
        const oldSession = "";
        const oldMob = localStorage.getItem("student_tracked_mobile") || "";
        const oldPhoto = localStorage.getItem("student_profile_photo_data") || "";
        const studentUID = localStorage.getItem("student_portal_uid");

        let editedPhotoDataUrl = oldPhoto;
        let editedPhotoFile = null;

        Swal.fire({
            title: '<span style="color:#00f7ff; font-size:1.6rem; font-weight:800;">✏️ Edit Profile, Session & Photo</span>',
            html: `
                <div style="text-align:center; margin: 8px 0 12px 0;">
                    <div onclick="document.getElementById('edit-swal-photo').click()" style="width:76px; height:76px; margin:0 auto 5px auto; border-radius:50%; border:2px solid #00f7ff; background:#0f172a; display:flex; align-items:center; justify-content:center; overflow:hidden; cursor:pointer;">
                        <img id="edit-swal-photo-prev" src="${oldPhoto}" style="display:${oldPhoto ? 'block' : 'none'}; width:100%; height:100%; object-fit:cover;">
                        <span id="edit-swal-photo-ph" style="display:${oldPhoto ? 'none' : 'block'}; color:#00f7ff; font-size:1.1rem; font-weight:700;">📷 Change</span>
                    </div>
                    <span style="color:#94a3b8; font-size:1rem;">Tap photo to crop &amp; update</span>
                    <input type="file" id="edit-swal-photo" accept="image/*" style="display:none;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 9px; text-align: left;">
                    <div>
                        <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Full Name:</label>
                        <input type="text" id="edit-swal-name" value="${oldName}" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Mobile Number (10-digit):</label>
                        <input type="tel" id="edit-swal-mobile" maxlength="10" value="${oldMob}" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                    </div>
                    <div>
                        <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">College Name:</label>
                        <select id="edit-swal-college" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
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
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <div>
                            <label style="color:#cbd5e1; font-size:1.05rem; font-weight:600; display:block; margin-bottom:3px;">Semester:</label>
                            <select id="edit-swal-sem" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                                <option value="Semester 1">Semester 1</option>
                                <option value="Semester 2">Semester 2</option>
                                <option value="Semester 3">Semester 3</option>
                                <option value="Semester 4">Semester 4</option>
                                <option value="Semester 5">Semester 5</option>
                                <option value="Semester 6">Semester 6</option>
                            </select>
                        </div>
                        <div>
                            <label style="color:#fbbf24; font-size:1.05rem; font-weight:700; display:block; margin-bottom:3px;">Session:</label>
                            <select id="edit-swal-session" style="width:100%; padding:9px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#fff; font-size:1.2rem; box-sizing:border-box;">
                                <option value="" disabled selected>Select Session</option>
                                <option value="2023-2026">2023-2026</option>
								<option value="2024-2027">2024-2027</option>
                                <option value="2025-2028">2025-2028</option>
                                <option value="2026-2029">2026-2029</option>
                            </select>
                        </div>
                    </div>
                </div>
            `,
            didOpen: () => {
                if (oldCollege) document.getElementById("edit-swal-college").value = oldCollege;
                if (oldSem) document.getElementById("edit-swal-sem").value = oldSem;

                const photoInput = document.getElementById("edit-swal-photo");
                if (photoInput && typeof window.openBszPhotoCropper === "function") {
                    photoInput.addEventListener("change", function() {
                        if (this.files && this.files[0]) {
                            window.openBszPhotoCropper(this.files[0], function(croppedUrl, croppedFile) {
                                editedPhotoDataUrl = croppedUrl;
                                editedPhotoFile = croppedFile;
                                const p = document.getElementById("edit-swal-photo-prev");
                                const ph = document.getElementById("edit-swal-photo-ph");
                                if (p) { p.src = croppedUrl; p.style.display = "block"; }
                                if (ph) ph.style.display = "none";
                            });
                        }
                    });
                }
            },
            showCancelButton: true,
            confirmButtonText: 'Save Changes 💾',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#009dff',
            cancelButtonColor: '#475569',
            background: '#0b1329',
            color: '#ffffff',
            preConfirm: () => {
                const newName = document.getElementById("edit-swal-name").value.trim();
                const newMob = document.getElementById("edit-swal-mobile").value.trim();
                const newCollege = document.getElementById("edit-swal-college").value;
                const newSem = document.getElementById("edit-swal-sem").value;
                const newSession = document.getElementById("edit-swal-session").value;

                if (!newName || !newCollege || !newSem || !newSession || !/^[6-9]\d{9}$/.test(newMob)) {
                    Swal.showValidationMessage("Please enter valid Name, 10-digit Mobile, College, Semester & Session!");
                    return false;
                }
                return {
                    name: newName.replace(/\b\w/g, c => c.toUpperCase()),
                    mobile: newMob,
                    college: newCollege,
                    sem: newSem,
                    session: newSession,
                    photo: editedPhotoDataUrl
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const d = result.value;
                const updateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

                localStorage.setItem("student_tracked_name", d.name);
                localStorage.setItem("student_tracked_mobile", d.mobile);
                localStorage.setItem("student_tracked_college", d.college);
                localStorage.setItem("student_tracked_sem", d.sem);
                localStorage.setItem("student_tracked_session", d.session);
                if (d.photo) localStorage.setItem("student_profile_photo_data", d.photo);

                if (studentUID) {
                    fetch(`${FIREBASE_ACTIVE_USERS_URL}/${studentUID}.json`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            studentName: d.name,
                            mobileNumber: d.mobile,
                            collegeName: d.college,
                            currentSemester: d.sem,
                            sessionYear: d.session,
                            photoData: d.photo,
                            lastUpdatedTime: updateTime
                        })
                    }).catch(() => {});
                }

                const telegramCaption =
                    `✏️ *STUDENT PROFILE UPDATED* ✏️\n\n` +
                    `👤 *Name:* ${d.name}\n` +
                    `🏫 *College:* ${d.college}\n` +
                    `📚 *Semester:* ${d.sem}\n` +
                    `📅 *Session:* ${d.session}\n` +
                    `📱 *Mobile:* \`+91${d.mobile}\`\n` +
                    `🕒 *Time:* ${updateTime}\n` +
                    `💻 *Device:* ${navigator.platform}`;

                if (editedPhotoFile) {
                    const tf = new FormData();
                    tf.append("chat_id", TELEGRAM_CHAT_ID);
                    tf.append("photo", editedPhotoFile);
                    tf.append("caption", telegramCaption);
                    tf.append("parse_mode", "Markdown");
                    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: "POST", body: tf }).catch(() => {});
                } else {
                    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramCaption, parse_mode: "Markdown" })
                    }).catch(() => {});
                }

                if (typeof updateStudentHeaderProfile === "function") updateStudentHeaderProfile();
                if (typeof window.openStudentIdCardModal === "function") window.openStudentIdCardModal();
            }
        });
    };
})();

// =========================================================================
// 🏆 SINGLE CLEAN MASTER: SESSION ID (BCA-YYZZ-001+), REGISTER, EDIT & RETURN
// =========================================================================
(function bszCleanSessionMaster() {
    const FB_NODE = "https://bca-study-zone-4458d-default-rtdb.asia-southeast1.firebasedatabase.app/activePortalUsers";

    const SESSION_CODES = {
        "2023-2026": "2326",
        "2024-2027": "2427",
        "2025-2028": "2528",
        "2026-2029": "2629"
    };

    window.getSessionShortCode = function(sessionStr) {
        const key = (sessionStr || "").trim();
        if (SESSION_CODES[key]) return SESSION_CODES[key];
        const digits = key.replace(/\D/g, "");
        return digits.length >= 8 ? digits.slice(2, 4) + digits.slice(6, 8) : "2629";
    };

    // Always starts at 001 when no matching session IDs exist in Firebase
    window.generateNextSessionStudentId = async function(sessionStr) {
        const yyzz = window.getSessionShortCode(sessionStr);
        const prefix = `BCA-${yyzz}-`;
        let maxSeq = 0;

        try {
            const resp = await fetch(`${FB_NODE}.json`, { cache: "no-store" });
            const data = await resp.json();
            if (data && typeof data === "object") {
                Object.values(data).forEach(entry => {
                    if (entry && typeof entry === "object") {
                        const rawId = String(entry.portalStudentId || "").trim();
                        if (rawId.startsWith(prefix)) {
                            const num = parseInt(rawId.replace(prefix, ""), 10);
                            if (!isNaN(num) && num > maxSeq) maxSeq = num;
                        }
                    }
                });
            }
        } catch (err) {
            maxSeq = 0;
        }

        return `${prefix}${String(maxSeq + 1).padStart(3, "0")}`;
    };

    function formatIdForSession(rawId, sessionStr) {
        const yyzz = window.getSessionShortCode(sessionStr);
        const prefix = `BCA-${yyzz}-`;
        if (rawId && rawId.trim().startsWith(prefix)) {
            return rawId.trim();
        }
        return null;
    }

    // 1. New Student Registration: Await sequential ID (001, 002...) before submit
    let holdingVerifyClick = false;
    document.addEventListener("click", async function(e) {
        const btn = e.target.closest("#trackVerifyBtn");
        if (!btn || holdingVerifyClick) return;

        const sessSel = document.getElementById("track-student-session");
        const chosenSess = sessSel ? sessSel.value : "";
        if (!chosenSess) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        holdingVerifyClick = true;

        localStorage.setItem("student_tracked_session", chosenSess);
        const seqId = await window.generateNextSessionStudentId(chosenSess);
        localStorage.setItem("student_portal_student_id", seqId);

        holdingVerifyClick = false;
        btn.click();
    }, true);

    // Ensure Firebase record also has the exact sequential ID right after creation
    document.addEventListener("click", function(e) {
        if (e.target.closest("#trackVerifyBtn")) {
            const sessSel = document.getElementById("track-student-session");
            const chosenSess = sessSel ? sessSel.value : "";
            if (!chosenSess) return;

            setTimeout(() => {
                const uid = localStorage.getItem("student_portal_uid");
                const seqId = localStorage.getItem("student_portal_student_id");
                if (uid && seqId && seqId.startsWith("BCA-")) {
                    fetch(`${FB_NODE}/${uid}.json`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            sessionYear: chosenSess,
                            portalStudentId: seqId
                        })
                    }).catch(() => {});
                }
            }, 600);
        }
    });

    // 2. Edit Profile: Regenerate sequential ID if session changed, then sync ID Card
    let holdingEditSave = false;
    document.addEventListener("click", async function(e) {
        const confirmBtn = e.target.closest(".swal2-confirm");
        if (!confirmBtn || holdingEditSave) return;

        const sessSelect = document.getElementById("edit-swal-session");
        if (!sessSelect) return;

        const chosenSession = sessSelect.value;
        if (!chosenSession) return;

        const prevSession = localStorage.getItem("student_tracked_session") || "";
        const prevId = localStorage.getItem("student_portal_student_id") || "";
        const uid = localStorage.getItem("student_portal_uid");

        if (chosenSession !== prevSession || !prevId.startsWith("BCA-")) {
            e.preventDefault();
            e.stopImmediatePropagation();
            holdingEditSave = true;

            const newId = await window.generateNextSessionStudentId(chosenSession);
            localStorage.setItem("student_tracked_session", chosenSession);
            localStorage.setItem("student_portal_student_id", newId);

            if (uid) {
                await fetch(`${FB_NODE}/${uid}.json`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sessionYear: chosenSession,
                        portalStudentId: newId
                    })
                }).catch(() => {});
            }

            holdingEditSave = false;
            confirmBtn.click();

            setTimeout(() => {
                if (typeof window.openStudentIdCardModal === "function") {
                    window.openStudentIdCardModal();
                }
            }, 250);
        }
    }, true);

    // 3. Keep ID Card & Telegram alerts synced with exact BCA-YYZZ-XXX ID & Session
    const origOpenCard = window.openStudentIdCardModal;
    if (typeof origOpenCard === "function") {
        window.openStudentIdCardModal = function() {
            origOpenCard.apply(this, arguments);

            const sess = localStorage.getItem("student_tracked_session") || "2026-2029";
            const sem = localStorage.getItem("student_tracked_sem") || "Semester 1";
            const storedId = localStorage.getItem("student_portal_student_id") || "";
            const yyzz = window.getSessionShortCode(sess);
            const displayId = storedId.startsWith("BCA-") ? storedId : `BCA-${yyzz}-001`;

            const uidEl = document.getElementById("idCardUid");
            const semEl = document.getElementById("idCardSem");
            const sessEl = document.getElementById("idCardSession");

            if (uidEl) uidEl.innerText = displayId;
            if (semEl) semEl.innerText = `BCA • ${sem}`;
            if (sessEl) sessEl.innerText = sess;
        };
    }

    const origFetch = window.fetch;
    window.fetch = function(url, options) {
        try {
            if (
                typeof url === "string" &&
                url.includes("api.telegram.org/bot") &&
                (url.includes("/sendPhoto") || url.includes("/sendMessage")) &&
                options
            ) {
                const sessEl = document.getElementById("track-student-session");
                const activeSess = (sessEl && sessEl.value) || localStorage.getItem("student_tracked_session") || "";
                const activeId = localStorage.getItem("student_portal_student_id") || "";

                const patchText = (txt) => {
                    if (typeof txt !== "string") return txt;
                    let out = txt;
                    if (activeId.startsWith("BCA-")) {
                        out = out.replace(/🆔 \*Portal ID:\* `[^`]+`/, `🆔 *Portal ID:* \`${activeId}\``);
                    }
                    if (activeSess) {
                        if (out.includes("📅 *Session:*")) {
                            out = out.replace(/📅 \*Session:\* [^\n]+/, `📅 *Session:* ${activeSess}`);
                        } else {
                            out = out.replace(/(📚 \*Semester:\* [^\n]+)/, `$1\n📅 *Session:* ${activeSess}`);
                        }
                    }
                    return out;
                };

                if (options.body instanceof FormData) {
                    const cap = options.body.get("caption");
                    if (typeof cap === "string") {
                        options.body.set("caption", patchText(cap));
                    }
                } else if (typeof options.body === "string") {
                    const parsed = JSON.parse(options.body);
                    if (parsed && typeof parsed.text === "string") {
                        parsed.text = patchText(parsed.text);
                        options = Object.assign({}, options, { body: JSON.stringify(parsed) });
                    }
                }
            }
        } catch (err) {}
        return origFetch.call(this, url, options);
    };
})();

// =========================================================================
// 🔗 KEEP "STUDENT PROFILE UPDATED" & "STUDENT RETURNED" 100% IN SYNC
// =========================================================================
(function keepUpdatedAndReturnedAlertsIdentical() {
    const origFetch = window.fetch;
    window.fetch = function(url, options) {
        try {
            if (
                typeof url === "string" &&
                url.includes("api.telegram.org/bot") &&
                (url.includes("/sendPhoto") || url.includes("/sendMessage")) &&
                options
            ) {
                const sess = localStorage.getItem("student_tracked_session") || "";
                const pid = localStorage.getItem("student_portal_student_id") || "";

                const syncAlert = (str) => {
                    if (typeof str !== "string") return str;
                    if (!str.includes("STUDENT PROFILE UPDATED") && !str.includes("STUDENT RETURNED")) {
                        return str;
                    }

                    let res = str;
                    if (pid.startsWith("BCA-")) {
                        if (/🆔 \*?(?:Portal ID|Student ID):\*? `[^`]+`/.test(res)) {
                            res = res.replace(/🆔 \*?(?:Portal ID|Student ID):\*? `[^`]+`/, `🆔 *Portal ID:* \`${pid}\``);
                        } else {
                            res = res.replace(/(👤 \*?(?:Student )?Name:\* [^\n]+)/, `🆔 *Portal ID:* \`${pid}\`\n$1`);
                        }
                    }
                    if (sess) {
                        if (/📅 \*Session:\* [^\n]+/.test(res)) {
                            res = res.replace(/📅 \*Session:\* [^\n]+/, `📅 *Session:* ${sess}`);
                        } else {
                            res = res.replace(/(📚 \*Semester:\* [^\n]+)/, `$1\n📅 *Session:* ${sess}`);
                        }
                    }
                    return res;
                };

                if (options.body instanceof FormData) {
                    const cap = options.body.get("caption");
                    if (typeof cap === "string") {
                        options.body.set("caption", syncAlert(cap));
                    }
                } else if (typeof options.body === "string") {
                    const parsed = JSON.parse(options.body);
                    if (parsed && typeof parsed.text === "string") {
                        parsed.text = syncAlert(parsed.text);
                        options = Object.assign({}, options, { body: JSON.stringify(parsed) });
                    }
                }
            }
        } catch (e) {}
        return origFetch.call(this, url, options);
    };
})();

// =========================================================================
// 🕒 RESET VISIT TIMESTAMP ON SESSION UPDATE & SKIP STALE GAP RIGHT AFTER EDIT
// =========================================================================
(function resetTimestampOnSessionUpdate() {
    let lastSessionEditAt = 0;

    document.addEventListener("click", function(e) {
        if (e.target.closest(".swal2-confirm") && document.getElementById("edit-swal-session")) {
            const nowTs = Date.now();
            const nowReadable = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            lastSessionEditAt = nowTs;

            localStorage.setItem("student_last_visit_timestamp", String(nowTs));
            localStorage.setItem("student_last_visit_readable", nowReadable);
            localStorage.setItem("bsz_last_session_update_ts", String(nowTs));
        }
    }, true);

    const origFetch = window.fetch;
    window.fetch = function(url, options) {
        try {
            if (
                typeof url === "string" &&
                url.includes("api.telegram.org/bot") &&
                url.includes("/sendMessage") &&
                options &&
                typeof options.body === "string"
            ) {
                const parsed = JSON.parse(options.body);
                if (parsed && typeof parsed.text === "string" && parsed.text.includes("STUDENT RETURNED")) {
                    const lastEdit = parseInt(localStorage.getItem("bsz_last_session_update_ts") || "0", 10) || lastSessionEditAt;
                    if (lastEdit && (Date.now() - lastEdit) < 15000) {
                        const freshNow = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                        parsed.text = parsed.text
                            .replace(/🕒 \*Current Return:\* [^\n]+/, `🕒 *Session Updated At:* ${freshNow}`)
                            .replace(/⏮️ \*Last Active Was:\* [^\n]+/, `⏮️ *Last Active Was:* ${freshNow}`)
                            .replace(/⏳ \*Total Offline Gap:\* _[^\n]+_/, `⏳ *Total Offline Gap:* _0 Seconds (Fresh Session Update)_`);
                        options = Object.assign({}, options, { body: JSON.stringify(parsed) });
                    }
                }
            }
        } catch (err) {}
        return origFetch.call(this, url, options);
    };
})();
