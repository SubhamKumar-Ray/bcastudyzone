// dark.js

// 1. Jab user button dabaye tab theme aur icon dono toggle honge
function myFunction() {
    document.body.classList.toggle("dark-mode");
    
    // Icon ko select karein (Humne id use ki hai jo zyada safe hai)
    const icon = document.getElementById("theme-icon");
    
    if (document.body.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun"; // Dark mode me suraj dikhao ☀️
        localStorage.setItem("theme", "dark");
    } else {
        icon.className = "fas fa-moon"; // Light mode me chaand dikhao 🌙
        localStorage.setItem("theme", "light");
    }
}

// 2. PAGE LOAD ENGINE: Jab page reload ho, toh check karo purani settings kya thi
document.addEventListener("DOMContentLoaded", () => {
    const icon = document.getElementById("theme-icon");
    
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (icon) icon.className = "fas fa-sun"; // Reload ke baad bhi sun rahega
    } else {
        if (icon) icon.className = "fas fa-moon"; // Reload ke baad moon rahega
    }
});
