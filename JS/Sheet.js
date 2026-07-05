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

form.addEventListener('submit', e => {
  e.preventDefault(); //

  // बटन को लॉक करें ताकि सबमिशन के दौरान यूजर दोबारा क्लिक न करे
  submitBtn.disabled = true; //
  submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>'; //

  // ──────────────────────────────────────────────────────────
  // ⚡ START: SECURITY & VALIDATION GUARDS (NEW CODE)
  // ──────────────────────────────────────────────────────────

  // User ke inputs ko fetch aur trim karein
  const mobileInput = form.elements['mobile'].value.trim();
  const emailInput = form.elements['EMAIL'].value.trim();

  // Guard 1: Indian Mobile Number Validator (Exactly 10 digits, starts with 6-9)
  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(mobileInput)) {
      Swal.fire({
          title: 'Invalid Mobile Number',
          html: '<p style="font-size:16px; color:#555;">Please enter a valid <b>10-digit</b> Indian mobile number starting with 6, 7, 8, or 9.</p>',
          icon: 'warning',
          confirmButtonColor: '#ea580c',
          confirmButtonText: 'Review and Fix',
          background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
          color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40' //
      });
      
      // Button ko wapas normal karein aur execution rokein
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
      return; 
  }

  // Guard 2: Standard Email Address Validator
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput)) {
      Swal.fire({
          title: 'Invalid Email Address',
          html: '<p style="font-size:16px; color:#555;">The email address provided does not match standard verification formats. Please verify your entry.</p>',
          icon: 'warning',
          confirmButtonColor: '#ea580c',
          confirmButtonText: 'Review and Fix',
          background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
          color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40' //
      });
      
      // Button ko wapas normal karein aur execution rokein
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
      return; 
  }

  // ──────────────────────────────────────────────────────────
  // 🏁 END: SECURITY & VALIDATION GUARDS
  // ──────────────────────────────────────────────────────────

  // FormData apne aap Name, College, Semester, Mobile, Email और Message सब उठा लेगा
  const formData = new FormData(form); //

  // Google App Script URL पर डेटा भेजना
  fetch(scriptURL, { //
    method: 'POST', //
    body: formData, //
    mode: 'no-cors' //
  })
  .then(() => { //
    // प्रीमियम SweetAlert2 पॉपअप (Professional English me)
    Swal.fire({
      title: 'Submission Successful',
      html: '<p style="font-size:16px; color:#555;">Thank you! Your feedback and academic details have been securely recorded by <b>BCA Study Zone</b>.</p>',
      icon: 'success', //
      confirmButtonColor: '#009dff', //
      confirmButtonText: 'Acknowledge & Continue',
      background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff', //
      color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40', //
      allowOutsideClick: false, //
      allowEscapeKey: false //
    }).then((result) => { //
      // जब यूजर 'Acknowledge & Continue' पर क्लिक करेगा, सिर्फ तभी फॉर्म रीसेट होगा
      if (result.isConfirmed) { //
        form.reset(); //
        
        // बटन को वापस अपनी पुरानी स्थिति में लाएं
        submitBtn.disabled = false; //
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; //
        
        // स्क्रीन पर किसी भी स्टक डिस्प्ले को हटाने के लिए रीफ्रेश एंकर ट्रिक
        window.location.hash = "#about-contact"; //
      }
    });
  })
  .catch(error => { //
    console.error('Error!', error.message); //
    
    // Professional English Error Alert
    Swal.fire({
      title: 'Transmission Failure',
      text: 'An unexpected database error occurred. Please verify your connection and try again.',
      icon: 'error', //
      confirmButtonColor: 'red' //
    });
    
    // एरर आने पर भी बटन को दोबारा वर्किंग स्टेट में लाएं
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


let count = 1;
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

}, 30);



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


function speakEnglishIndian(){

    window.speechSynthesis.cancel();

    /*const msg = new SpeechSynthesisUtterance(
    "नमस्ते। बी सी ए स्टडी ज़ोन में आपका हार्दिक स्वागत है। विनोबा भावे विश्वविद्यालय के विद्यार्थियों के लिए तैयार इस शैक्षणिक मंच पर आपको बी सी ए से संबंधित नोट्स, सिलेबस, प्रश्न पत्र और अन्य महत्वपूर्ण अध्ययन सामग्री प्राप्त होगी। हमें विश्वास है कि यह वेबसाइट आपकी पढ़ाई को और अधिक सरल एवं प्रभावी बनाएगी। आपके सफल शैक्षणिक जीवन के लिए शुभकामनाएं। धन्यवाद। कृपया मैसेज बॉक्स में अपने सुझाव या प्रतिक्रिया अवश्य लिखें।"
);*/
	const msg = new SpeechSynthesisUtterance(
	"नमस्ते। बी सी ए स्टडी ज़ोन में आपका हार्दिक स्वागत है।"
	);
    msg.lang = "hi-IN";
    msg.rate = 0.95;
    msg.pitch = 1;
    msg.volume = 1;

    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === "hi-IN");

    if (hindiVoice) {
        msg.voice = hindiVoice;
    }

    speechSynthesis.speak(msg);
}

// 🔥 Button click (MOBILE FRIENDLY)
function handleEnglishVoiceAndOpen(){

    speakEnglishIndian();   // 🔊 बोलेगा

    document.getElementById("voicePopup").style.display = "none";
    mainPage.style.display = "block";
}
