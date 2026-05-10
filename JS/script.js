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
