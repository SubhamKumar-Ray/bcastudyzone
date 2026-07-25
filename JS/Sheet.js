/*const scriptURL = 'https://script.google.com/macros/s/AKfycbypEUdXM6EaOmNDBW-WkDfa7ALGhpFglP7Sec8ZW8RDVVCspb4QB44PaqKCG2DiwCHe/exec'
const form = document.forms['contact-form']
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})*/

/*const scriptURL = 'https://script.google.com/macros/s/AKfycbypEUdXM6EaOmNDBW-WkDfa7ALGhpFglP7Sec8ZW8RDVVCspb4QB44PaqKCG2DiwCHe/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()

  // ✅ पहले data copy करो
  const formData = new FormData(form)

  // ✅ अब form साफ करो
  form.reset()

  // ✅ अब data भेजो
  fetch(scriptURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    alert("🙏 धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।")
  })
})*/
const scriptURL = 'https://script.google.com/macros/s/AKfycbx761_6FchoKp05elYLPhg8q7muURLuwWGqND3TZKjVwi1YI62vOISFRHmqfG-A4BU3/exec'; //
const form = document.forms['contact-form']; //
const submitBtn = document.getElementById('submit'); //

// ──────────────────────────────────────────────────────────
// 📂 1. POWERED DRAFT RECOVERY ENGINE (ON PAGE LOAD)
// ──────────────────────────────────────────────────────────
const messageArea = document.querySelector('textarea[name="MESSAGE"]'); //

if (messageArea) { //
    messageArea.value = localStorage.getItem('form_msg_draft') || ''; //
    messageArea.addEventListener('input', () => { //
        localStorage.setItem('form_msg_draft', messageArea.value); //
    });
}
// ──────────────────────────────────────────────────────────

form.addEventListener('submit', e => {
  e.preventDefault(); //

  // ──────────────────────────────────────────────────────────
  // 🚨 2. SECURITY GUARD: ANTI-SPAM VELOCITY LOCK (RATE LIMITER)
  // ──────────────────────────────────────────────────────────
  const currentTimestamp = Date.now(); //
  const lastSubmission = localStorage.getItem('last_submission_time'); //
  const submissionCount = parseInt(localStorage.getItem('submission_today_count') || '0'); //

  if (lastSubmission && (currentTimestamp - lastSubmission > 24 * 60 * 60 * 1000)) { //
      localStorage.setItem('submission_today_count', '0'); //
  }

  if (submissionCount >= 3) { //
      Swal.fire({ //
          title: 'Submission Limit Exceeded', //
          html: '<p style="font-size:16px; color:#555;">To protect our servers from spam, you can only submit up to <b>3 messages every 24 hours</b>.<br><br>Please try again tomorrow or contact support directly.</p>', //
          icon: 'warning', //
          confirmButtonColor: '#ea580c', //
          confirmButtonText: 'Understood' //
      });
      return; //
  }
  // ──────────────────────────────────────────────────────────

  // बटन को लॉक करें ताकि सबमिशन के दौरान यूजर दोबारा क्लिक न करे
  submitBtn.disabled = true; //
  submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>'; //

  // USER INPUTS METRIC EXTRACTION
  const nameInput = form.elements['NAME']; //
  const collegeInput = form.elements['COLLEGE']; //
  const semesterInput = form.elements['SEMESTER']; //
  const mobileInput = form.elements['mobile'].value.trim(); //
  const emailInput = form.elements['EMAIL'].value.trim(); //

  // 🛡️ Guard A: Indian Mobile Number Validator
  const phonePattern = /^[6-9]\d{9}$/; //
  if (!phonePattern.test(mobileInput)) { //
      Swal.fire({ //
          title: 'Invalid Mobile Number', //
          html: '<p style="font-size:16px; color:#555;">Please enter a valid <b>10-digit</b> Indian mobile number starting with 6, 7, 8, or 9.</p>', //
          icon: 'warning', //
          confirmButtonColor: '#ea580c', //
          confirmButtonText: 'Review and Fix', //
          background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
          color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40' //
      });
      submitBtn.disabled = false; //
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; //
      return; //
  }

  // 🛡️ Guard B: Standard Email Address Validator
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //
  if (!emailPattern.test(emailInput)) { //
      Swal.fire({ //
          title: 'Invalid Email Address', //
          html: '<p style="font-size:16px; color:#555;">The email address provided does not match standard verification formats. Please verify your entry.</p>', //
          icon: 'warning', //
          confirmButtonColor: '#ea580c', //
          confirmButtonText: 'Review and Fix', //
          background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
          color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40' //
      });
      submitBtn.disabled = false; //
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; //
      return; //
  }

  // Auto-Capitalize Name Field before submission
  if (nameInput && nameInput.value) { //
      nameInput.value = nameInput.value.trim().replace(/\b\w/g, char => char.toUpperCase()); //
  }

  // ──────────────────────────────────────────────────────────
  // 🚀 3. INSTANT TELEGRAM BOT ALERT SYSTEM
  // ──────────────────────────────────────────────────────────
  const telegramToken = '8877155299:AAEkOtDEv2jc2A5Elyt7tkHSy1cJEEMKR8s'; //
  
  // ⚠️ IMPORTANT: Yahan quotes ke andar apni numerical User ID paste kar dein!
  const telegramChatId = '1814896362'; //

  const alertText = `🚨 *URGENT SUPPORT REQUEST* 🚨\n\n` +
                    `👤 *Student:* ${nameInput ? nameInput.value : 'N/A'}\n` +
                    `🎓 *Semester:* ${semesterInput ? semesterInput.value : 'N/A'}\n` +
                    `🏫 *College:* ${collegeInput ? collegeInput.value : 'N/A'}\n` +
                    `📱 *Mobile:* ${mobileInput}\n` +
                    `📧 *Email:* ${emailInput}\n\n` +
                    `💬 *Message Sent:* \n"${messageArea ? messageArea.value : 'No text content'}"`; //

  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, { //
      method: 'POST', //
      headers: { 'Content-Type': 'application/json' }, //
      body: JSON.stringify({ //
          chat_id: telegramChatId, //
          text: alertText, //
          parse_mode: 'Markdown' //
      })
  }).catch(err => console.log("Telegram alert bypassed. Processing master matrix database pipeline.")); //
  // ──────────────────────────────────────────────────────────

  const formData = new FormData(form); //

  // Data Transmission to Google App Script Spreadsheet Engine
  fetch(scriptURL, { //
    method: 'POST', //
    body: formData, //
    mode: 'no-cors' //
  })
  .then(() => { //
    Swal.fire({ //
      title: 'Submission Successful', //
      html: '<p style="font-size:16px; color:#555;">Thank you! Your feedback and academic details have been securely recorded by <b>BCA Study Zone</b>.</p>', //
      icon: 'success', //
      confirmButtonColor: '#009dff', //
      confirmButtonText: 'Acknowledge & Continue', //
      background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
      color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40', //
      allowOutsideClick: false, //
      allowEscapeKey: false //
    }).then((result) => { //
      if (result.isConfirmed) { //
        
        form.reset(); //

        // 🔒 SUCCESS ENGINE METRICS
        if (!localStorage.getItem('last_submission_time')) { //
            localStorage.setItem('last_submission_time', Date.now().toString()); //
        }
        localStorage.setItem('submission_today_count', (submissionCount + 1).toString()); //

        // Clear temporary message draft cache matrix
        localStorage.removeItem('form_msg_draft'); //
        
        submitBtn.disabled = false; //
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; //
        window.location.hash = "#about-contact"; //
      }
    });
  })
  .catch(error => { //
    console.error('Error!', error.message); //
    Swal.fire({ //
      title: 'Transmission Failure', //
      text: 'An unexpected database error occurred. Please verify your connection and try again.', //
      icon: 'error', //
      confirmButtonColor: 'red' //
    });
    submitBtn.disabled = false; //
    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; //
  });
});
/* if (performance.navigation.type === 1) {
        const screen = document.getElementById("refreshScreen");
        screen.classList.add("show");
        setTimeout(() => {
            screen.classList.remove("show");
        }, 2000); // 2 second baad under page dikhega
    }
*/


/*let count = 1;
let progressCircle = document.getElementById("progress");
let counter = document.getElementById("count");
let loader = document.getElementById("loader");
let mainPage = document.getElementById("mainPage");

let radius = 70;
let circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

let interval = setInterval(() => {

    counter.innerText = count + "%";

    let offset = circumference - (count / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    count++;

    if (count > 100) {
        clearInterval(interval);

        // ✅ Loader hide
        loader.style.display = "none";

        // ✅ POPUP show (speech ke liye)
        document.getElementById("voicePopup").style.display = "flex";
    }

}, 30);*/



// 🔊 English (Indian Accent)
/*function speakEnglishIndian(){

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(
        "This website has been created by Subham Kumar Ray. The page has been successfully loaded."
    );

    msg.lang = "en-IN";
    msg.rate = 0.95;
    msg.pitch = 1;
    msg.volume = 1;

    const voices = speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang === "en-IN");
    if (indianVoice) {
        msg.voice = indianVoice;
    }

    speechSynthesis.speak(msg);
}
*/


function speakEnglishIndian() {
    window.speechSynthesis.cancel();
    return;
}
