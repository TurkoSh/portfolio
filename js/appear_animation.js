function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight;
};

function handleAnimationSections() {
    const animationSections = document.querySelectorAll('.animation-section');

    animationSections.forEach(section => {
        if (isElementVisible(section)) {
            section.classList.add('animation-section-visible');
            section.removeEventListener('scroll', handleAnimationSections);
        }
    });
}

window.addEventListener('scroll', handleAnimationSections);