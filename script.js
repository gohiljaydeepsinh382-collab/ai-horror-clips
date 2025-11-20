let clips = [
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
  "Panda Saved The Baby Who Was Believed To Be Dead.mp4",
  "Panda Saves Baby – A Real Hero in Fur.mp4",
  "Pin page.mp4",
  "clipai_video_20251118_182913.mp4",
  "clipai_video_20251118_183320.mp4",
  "clipai_video_20251118_183324.mp4",
  "clipai_video_20251118_183328.mp4",
  "clipai_video_20251118_183338.mp4",
  "clipai_video_20251118_183344.mp4",
  "clipai_video_20251118_183350.mp4",
  "clipai_video_20251118_183358.mp4",
  "clipai_video_20251118_183410.mp4",
  "clipai_video_20251118_183611.mp4",
  "clipai_video_20251118_183615.mp4",
  "clipai_video_20251118_183627.mp4",
  "clipai_video_20251118_183631.mp4",
  "clipai_video_20251118_183714.mp4",
  "clipai_video_20251118_183815.mp4",
  "clipai_video_20251118_183825.mp4",
  "clipai_video_20251118_224319.mp4",
  "clipai_video_20251118_224613.mp4",
  "clipai_video_20251118_224708.mp4",
  "the emotional story in parrot.mp4"
];

let currentIndex = 0;
let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0;
let userActivatedSound = false; // 🔥 First tap → sound enabled permanently

document.getElementById("coins").innerText = coins;
const video = document.getElementById("videoPlayer");

function loadClip(index) {
  video.src = clips[index];
  video.load();

  if (userActivatedSound) {
    video.muted = false; // sound ON after first tap
  } else {
    video.muted = true;  // autoplay requires mute
  }

  video.play().catch(() => {});
}

document.getElementById("playBtn").addEventListener("click", () => {
  if (!userActivatedSound) {
    userActivatedSound = true;
    video.muted = false; // 🔥 First manual tap → unmute
  }

  if (video.paused) video.play();
  else video.pause();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  nextClip();
});

function nextClip() {
  currentIndex = (currentIndex + 1) % clips.length;
  loadClip(currentIndex);
  markReady();
}

// Auto coin earn after video ends
video.addEventListener("ended", () => {
  coins += 1;
  localStorage.setItem("coins", coins);
  document.getElementById("coins").innerText = coins;

  nextClip();
});

// UI Status
function markReady() {
  document.getElementById("status").innerText = "Ready";
}

// Load first clip
loadClip(currentIndex);
