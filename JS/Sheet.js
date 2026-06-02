/*const scriptURL = 'https://script.google.com/macros/s/AKfycbypEUdXM6EaOmNDBW-WkDfa7ALGhpFglP7Sec8ZW8RDVVCspb4QB44PaqKCG2DiwCHe/exec'
const form = document.forms['contact-form']
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})*/

const scriptURL = 'https://script.google.com/macros/s/AKfycbypEUdXM6EaOmNDBW-WkDfa7ALGhpFglP7Sec8ZW8RDVVCspb4QB44PaqKCG2DiwCHe/exec'
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
})
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
	"नमस्ते। बी सी ए स्टडी ज़ोन में आपका हार्दिक स्वागत है। यहां आपको विनोबा भावे विश्वविद्यालय के बी सी ए पाठ्यक्रम से संबंधित महत्वपूर्ण अध्ययन सामग्री उपलब्ध है। धन्यवाद। कृपया मैसेज बॉक्स में अपनी राय, सुझाव या कोई संदेश अवश्य लिखें।"
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
