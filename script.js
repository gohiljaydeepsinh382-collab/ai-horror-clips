let videos = [
    "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
    "Pin page.mp4",
    "Panda Saved The Baby Who Was Believed.mp4",
    "clipai_video_20251118_182913.mp4",
    "clipai_video_20251118_183820.mp4",
    "clipai_video_20251118_183825.mp4"
];

let video = document.getElementById("videoPlayer");
let playBtn = document.getElementById("playBtn");
let nextBtn = document.getElementById("nextBtn");
let nameBox = document.getElementById("videoName");
let coinsBox = document.getElementById("coins");

let current = 0;
let coins = 0;

// Load first video
loadVideo();

function loadVideo() {
    video.src = videos[current];
    nameBox.textContent = "Loaded: " + videos[current];
    video.load();
}

// Play / Pause
playBtn.onclick = () => {
    if (video.paused) {
        video.play().catch(() => {
            alert("Tap video to allow playback");
        });
    } else {
        video.pause();
    }
};

// Next Clip
nextBtn.onclick = () => {
    coins++;
    coinsBox.textContent = coins;

    current = (current + 1) % videos.length;
    loadVideo();
    video.play().catch(() => {});
};

// Auto-add coin after full watching
video.onended = () => {
    coins++;
    coinsBox.textContent = coins;

    current = (current + 1) % videos.length;
    loadVideo();
    video.play().catch(() => {});
};
// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("SW Error: ", err));
}
