// --------------------------
// CONFIG
// --------------------------

const basePath = "/ai-horror-clips/";  // IMPORTANT

const videos = [
    basePath + "clipai_video_20251118_182913.mp4",
    basePath + "clipai_video_20251118_183320.mp4",
    basePath + "clipai_video_20251118_183324.mp4",
    basePath + "clipai_video_20251118_183328.mp4",
    basePath + "clipai_video_20251118_183338.mp4",
    basePath + "clipai_video_20251118_183344.mp4",
    basePath + "clipai_video_20251118_183350.mp4",
    basePath + "clipai_video_20251118_183358.mp4",
    basePath + "clipai_video_20251118_183410.mp4",
    basePath + "clipai_video_20251118_183611.mp4",
    basePath + "clipai_video_20251118_183615.mp4",
    basePath + "clipai_video_20251118_183627.mp4",
    basePath + "clipai_video_20251118_183631.mp4",
    basePath + "clipai_video_20251118_183714.mp4",
    basePath + "clipai_video_20251118_183815.mp4",
    basePath + "clipai_video_20251118_183825.mp4",
    basePath + "clipai_video_20251118_224319.mp4",
    basePath + "clipai_video_20251118_224613.mp4",
    basePath + "clipai_video_20251118_224708.mp4",
    basePath + "the emotional story in parrot.mp4",
    basePath + "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4",
    basePath + "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
    basePath + "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
    basePath + "Pin page.mp4"
];

// --------------------------
// ELEMENTS
// --------------------------

const video = document.getElementById("videoPlayer");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const coinDisplay = document.getElementById("coinDisplay");
const statusText = document.getElementById("statusText");

// --------------------------
// COIN SYSTEM
// --------------------------

let coins = localStorage.getItem("coins");
if (!coins) coins = 0;

coinDisplay.textContent = coins;

function addCoin() {
    coins++;
    coinDisplay.textContent = coins;
    localStorage.setItem("coins", coins);
}

// --------------------------
// VIDEO PLAYER LOGIC
// --------------------------

let index = 0;

function loadVideo(i) {
    video.src = videos[i];
    video.load();
    statusText.textContent = "Loading...";
}

function playVideo() {
    video.play()
        .then(() => statusText.textContent = "Playing…")
        .catch(() => statusText.textContent = "Tap video to allow playback");
}

function nextVideo() {
    index = (index + 1) % videos.length;
    loadVideo(index);
    playVideo();
}

playBtn.addEventListener("click", () => {
    if (video.paused) {
        playVideo();
    } else {
        video.pause();
        statusText.textContent = "Paused";
    }
});

nextBtn.addEventListener("click", nextVideo);

// When video ends → reward coin + auto next
video.addEventListener("ended", () => {
    addCoin();
    statusText.textContent = "Completed! +1 coin";
    setTimeout(nextVideo, 1200);
});

// --------------------------
// START: load first video
// --------------------------

loadVideo(index);
