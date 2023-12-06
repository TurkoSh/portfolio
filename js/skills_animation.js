const slider = document.getElementById('slider');
const sliderItems = slider.getElementsByClassName('skills-item');
const itemCount = sliderItems.length;

for (let i = 0; i < itemCount; i++) {
    const clone = sliderItems[i].cloneNode(true);
    slider.appendChild(clone);
}

const itemWidth = sliderItems[0].offsetWidth;
const totalWidth = itemCount * itemWidth;

slider.style.width = `${totalWidth}px`;

let animation;

function slide() {
    slider.style.transform = 'translateX(0)';
    animation = slider.animate(
        [
            { transform: 'translateX(0)' },
            { transform: `translateX(-${totalWidth}px)` }
        ],
        {
            duration: itemCount * 5 * 1000,
            iterations: Infinity
        },
    );

    animation.playbackRate = 5;
};

slide();

document.getElementById("slider").addEventListener('mouseover', () => {
    if (animation) {
        animation.playbackRate = 0;
    };
});

document.getElementById("slider").addEventListener('mouseout', () => {
    if (animation) {
        animation.playbackRate = 5;
    };
});
