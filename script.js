// ===============================
// Video List
// ===============================
const clips = [
    { src: "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4", title: "Gorilla Scorpion Shark" },
    { src: "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4", title: "Panda Saved Baby" },
    { src: "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4", title: "Panda Hero" },
    { src: "Pin page.mp4", title: "Pin Page" },
    { src: "the emotional story in parrot.mp4", title: "Parrot Story" },

    // Your auto uploaded videos
    { src: "clipai_video_20251118_182913.mp4", title: "Clip 1" },
    { src: "clipai_video_20251118_183320.mp4", title: "Clip 2" },
    { src: "clipai_video_20251118_183324.mp4", title: "Clip 3" },
    { src: "clipai_video_20251118_183328.mp4", title: "Clip 4" },
    { src: "clipai_video_20251118_183338.mp4", title: "Clip 5" },
    { src: "clipai_video_20251118_183344.mp4", title: "Clip 6" },
    { src: "clipai_video_20251118_183350.mp4", title: "Clip 7" },
    { src: "clipai_video_20251118_183358.mp4", title: "Clip 8" },
    { src: "clipai_video_20251118_183410.mp4", title: "Clip 9" },
    { src: "clipai_video_20251118_183611.mp4", title: "Clip 10" },
    { src: "clipai_video_20251118_183615.mp4", title: "Clip 11" },
    { src: "clipai_video_20251118_183627.mp4", title: "Clip 12" },
    { src: "clipai_video_20251118_183631.mp4", title: "Clip 13" },
    { src: "clipai_video_20251118_183714.mp4", title: "Clip 14" },
    { src: "clipai_video_20251118_183815.mp4", title: "Clip 15" },
    { src: "clipai_video_20251118_183825.mp4", title: "Clip 16" },
    { src: "clipai_video_20251118_224319.mp4", title: "Clip 17" },
    { src: "clipai_video_20251118_224613.mp4", title: "Clip 18" },
    { src: "clipai_video_20251118_224708.mp4", title: "Clip 19" }
];

// ===============================
// DOM elements
// ===============================
const video = document.getElementById("videoPlayer");
const playPauseBtn = document.getElementById("playPause");
const nextBtn = document.getElementById("nextClipBtn");
const titleText = document.getElementById("clipTitle");
const coinElement = document.getElementById("coinCount");

let coins = 0;
let currentIndex = 0;

// ===============================
// Load Clip (Main Function)
// ===============================
function loadClip(index) {
    currentIndex = index % clips.length;
    const clip = clips[currentIndex];

    video.src = clip.src;
    video.load();

    // 👇 FIX: Full player controls
    video.controls = true;
    video.muted = false;
    video.playsInline = true;

    titleText.textContent = clip.title;

    console.log("Loaded:", clip.src);
}

// ===============================
// Play / Pause
// ===============================
playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "Pause";
    } else {
        video.pause();
        playPauseBtn.textContent = "Play";
    }
});

// ===============================
// Next Clip
// ===============================
nextBtn.addEventListener("click", () => {
    currentIndex++;
    loadClip(currentIndex);
    video.play();

    coins++; // Add coin
    coinElement.textContent = coins;
});

// ===============================
// Auto Coin + Auto Load Next
// ===============================
video.addEventListener("ended", () => {
    coins++;
    coinElement.textContent = coins;

    currentIndex++;
    loadClip(currentIndex);
    video.play();
});

// ===============================
// First Load
// ===============================
loadClip(0);
