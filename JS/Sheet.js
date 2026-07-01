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
const scriptURL = 'https://script.google.com/macros/s/AKfycbx761_6FchoKp05elYLPhg8q7muURLuwWGqND3TZKjVwi1YI62vOISFRHmqfG-A4BU3/exec';
const form = document.forms['contact-form'];
const submitBtn = document.getElementById('submit');

form.addEventListener('submit', e => {
  e.preventDefault();

  // 1. बटन को लॉक करें ताकि सबमिशन के दौरान यूजर दोबारा क्लिक न करे
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

  // 2. FormData अपने आप Name, College, Semester, Mobile, Email और Message सब उठा लेगा
  const formData = new FormData(form);

  // 3. Google App Script URL पर डेटा भेजना
  fetch(scriptURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    // 4. प्रीमियम SweetAlert2 पॉपअप (बिना किसी डिस्प्ले लैग के)
    Swal.fire({
      title: '✅ Success!',
      html: '<p style="font-size:16px; color:#555;">नमस्ते! आपका संदेश और कॉलेज का विवरण <b>BCA Study Zone</b> को सफलतापूर्वक भेज दिया गया है।</p>',
      icon: 'success',
      confirmButtonColor: '#009dff',
      confirmButtonText: 'OK, Continue',
      background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff',
      color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40',
      allowOutsideClick: false, // पॉपअप के बाहर क्लिक करने पर यह बंद नहीं होगा
      allowEscapeKey: false
    }).then((result) => {
      // 5. जब यूजर 'OK, Continue' पर क्लिक करेगा, सिर्फ तभी फॉर्म रीसेट होगा और स्क्रीन क्लीन होगी
      if (result.isConfirmed) {
        form.reset(); // फ़ॉर्म पूरी तरह खाली (Reset) हो जाएगा
        
        // बटन को वापस अपनी पुरानी स्थिति में लाएं
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        
        // स्क्रीन पर किसी भी स्टक डिस्प्ले को हटाने के लिए रीफ्रेश एंकर ट्रिक
        window.location.hash = "#about-contact"; 
      }
    });
  })
  .catch(error => {
    console.error('Error!', error.message);
    Swal.fire({
      title: '❌ Error!',
      text: 'मैसेज भेजने में समस्या आई। कृपया दोबारा कोशिश करें।',
      icon: 'error',
      confirmButtonColor: 'red'
    });
    
    // एरर आने पर भी बटन को दोबारा वर्किंग स्टेट में लाएं
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
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
