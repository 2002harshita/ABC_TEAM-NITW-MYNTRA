document.addEventListener('DOMContentLoaded', () => {
    let videosData = [];
    let currentIndex = 0;

    function displayCurrentVideo() {
        const videoGallery = document.getElementById('videoGallery');
        videoGallery.innerHTML = '';

        const videoElement = document.createElement('video');
        videoElement.src = `/uploads/${videosData[currentIndex]}`;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('class', 'uploaded-video');
        videoGallery.appendChild(videoElement);

        likeButton.classList.remove('active');
        dislikeButton.classList.remove('active');
    }

    fetch('/uploads')
        .then(response => response.json())
        .then(videos => {
            videosData = videos;
            displayCurrentVideo();
        })
        .catch(error => console.error('Error fetching videos:', error));

    function nextVideo() {
        currentIndex = (currentIndex + 1) % videosData.length;
        displayCurrentVideo();
    }

    function prevVideo() {
        currentIndex = (currentIndex - 1 + videosData.length) % videosData.length;
        displayCurrentVideo();
    }

    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const likeButton = document.getElementById('likeButton');
    const dislikeButton = document.getElementById('dislikeButton');
    const heartOverlay = document.getElementById('heartOverlay');

    nextButton.addEventListener('click', nextVideo);
    prevButton.addEventListener('click', prevVideo);

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('active');
        if (dislikeButton.classList.contains('active')) {
            dislikeButton.classList.remove('active');
        }
        showHeart();
    });

    dislikeButton.addEventListener('click', () => {
        dislikeButton.classList.toggle('active');
        if (likeButton.classList.contains('active')) {
            likeButton.classList.remove('active');
        }
    });

    function showHeart() {
        heartOverlay.style.opacity = 1;
        setTimeout(() => {
            heartOverlay.style.opacity = 0;
        }, 500);
    }
});
