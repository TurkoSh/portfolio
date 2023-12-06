const cv_section = document.getElementById("cv-section");

document.getElementById("slider-section-btn").addEventListener('click', () => {
    cv_section.scrollIntoView({ behavior: "smooth" });
});