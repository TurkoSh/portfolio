function initDraggable() {
    interact('.timeline-content')
        .draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            inertia: true,
            listeners: {
                start(event) {
                    event.target.classList.add('is-dragging');
                    const randomPop = Math.floor((Math.random() * 5) + 1);
                    // console.log(randomPop);
                    const audio = new Audio(`/assets/audio/pop-${randomPop}.mp3`);
                    audio.play();
                },
                move(event) {
                    const { dx, dy, target } = event;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    const parentContainer = target.parentNode;
                    const rect = parentContainer.getBoundingClientRect();
                    const threshold = 100;

                    if (y < rect.top + threshold) {
                        parentContainer.scrollTop -= 10;
                    } else if (y > rect.bottom - threshold) {
                        parentContainer.scrollTop += 10;
                    }
                },
                end(event) {
                    event.target.classList.remove('is-dragging');
                    event.target.style.transition = 'transform 0.3s ease-out';
                    event.target.style.transform = 'translate(0, 0)';
                    setTimeout(() => {
                        event.target.style.transition = '';
                    }, 300);
                }
            }
        });
}

initDraggable();