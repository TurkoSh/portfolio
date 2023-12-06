const projectContainers = document.querySelectorAll('.project-container');

projectContainers.forEach(container => {
    const image = container.querySelector('.project-image');
    const video = container.querySelector('.project-video');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');

    let isPlaying = false;

    container.addEventListener('mouseenter', () => {
        if (!isPlaying) {
            video.muted = true;
            video.play();
            isPlaying = true;
        }
    });

    container.addEventListener('mouseleave', () => {
        if (isPlaying) {
            video.pause();
            video.currentTime = 0;
            isPlaying = false;
        }
    });

    video.addEventListener('loadeddata', () => {
        container.removeChild(loadingIndicator);
    });

    container.appendChild(loadingIndicator);

    container.addEventListener('click', () => {
        const videoPath = video.getAttribute('src');
        window.open(videoPath, '_blank');
    });
});
