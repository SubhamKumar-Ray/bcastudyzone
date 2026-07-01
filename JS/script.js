let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}
window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

const slides = document.querySelectorAll('.team-member');
let current = 0;

function showNextMember() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}

setInterval(showNextMember, 3000); // 3 सेकंड में change
// Naya collage photo popup with professional message
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        Swal.fire({
            title: '🎓 Welcome to BCA Study Zone!',
            html: `
                <div style="text-align: center; font-family: 'Poppins', sans-serif;">
                    <!-- College Banner Image -->
                    <img src="Gallary/vbu-bca-resources.png" alt="VBU BCA Resources" style="width: 100%; max-width: 500px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); margin-bottom: 15px;">
                    
                    <!-- Professional Message -->
                    <h3 style="font-size: 16px; color: #009dff; margin-bottom: 8px; font-weight: 600;">
                        Official Resource Portal for VBU Students
                    </h3>
                    
                    <p style="font-size: 13px; color: #555; line-height: 1.6; margin: 0 10px 15px 10px; font-weight: 500;">
                        विनोबा भावे विश्वविद्यालय (VBU) के नवीनतम पाठ्यक्रम पर आधारित सभी सेमेस्टर्स के 
                        <b>Notes, Syllabus और Previous Year Questions (PYQs)</b> यहाँ उपलब्ध करा दिए गए हैं।
                    </p>
                    
                    <div style="background: rgba(0, 157, 255, 0.05); padding: 10px; border-radius: 8px; border-left: 4px solid #009dff; margin-bottom: 5px;">
                        <p style="font-size: 12px; color: #130f40; margin: 0; font-weight: 600;">
                            📢 <span style="color: #ff1744;">🚨 महत्वपूर्ण अनुरोध:</span> नीचे स्क्रॉल करें और फीडबैक बॉक्स में अपनी राय या अपने कॉलेज का नाम ज़रूर सबमिट करें!
                        </p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#009dff',
            confirmButtonText: 'Start Learning 📚',
            background: document.body.classList.contains('dark-mode') ? '#282c35' : '#ffffff',
            color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#130f40',
            allowOutsideClick: true
        });
    }, 4000); // लोडर और वॉइस वेलकम के 4 सेकंड बाद खुलेगा
});
