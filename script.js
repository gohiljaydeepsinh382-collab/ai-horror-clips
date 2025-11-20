// 🔥 FINAL Video Playlist Script for your Website

const videos = [
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
  "Panda Saved The Baby Who Was Believed To Be Dead.mp4",
  "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
  "Pin page.mp4",
  "clipai_video_20251118_182913.mp4",
  "clipai_video_20251118_183320.mp4",
  "the emotional story in parrot.mp4",
  "clipai_video_20251118_224613.mp4",
  "clipai_video_20251118_183825.mp4",
  "clipai_video_20251118_183815.mp4",
  "clipai_video_20251118_183714.mp4",
  "clipai_video_20251118_183631.mp4",
  "clipai_video_20251118_183627.mp4",
  "clipai_video_20251118_183615.mp4",
  "clipai_video_20251118_183611.mp4",
  "clipai_video_20251118_183410.mp4",
  "clipai_video_20251118_183358.mp4",
  "clipai_video_20251118_183350.mp4",
  "clipai_video_20251118_183344.mp4",
  "clipai_video_20251118_183338.mp4",
  "clipai_video_20251118_183328.mp4",
  "clipai_video_20251118_183624.mp4",
  "clipai_video_20251118_224708.mp4",
  "clipai_video_20251118_224319.mp4"
];

// HTML Elements
const videoEl = document.getElementById("player");
const btnPlay = document.getElementById("btn-play");
const btnNext = document.getElementById("btn-next");
const coinsEl = document.getElementById("coin-count");
const statusEl = document.getElementById("status");

let index = 0;
let coins = Number(localStorage.getItem("coins") || 0);
coinsEl.textContent = coins;

// Website Base URL for videos
function baseUrl() {
  return window.location.origin + window.location.pathname;
}

function videoUrl(name) {
  return baseUrl() + encodeURI(name);
}

// Load a video
function loadVideo(i) {
  index = (i + videos.length) % videos.length;
  videoEl.src = videoUrl(videos[index]);
  videoEl.load();
  statusEl.textContent = `Playing Clip ${index + 1} of ${videos.length}`;
}

// Play / Pause
btnPlay.addEventListener("click", () => {
  if (videoEl.paused) videoEl.play();
  else videoEl.pause();
});

// Next Video
btnNext.addEventListener("click", () => {
  loadVideo(index + 1);
});

// When video ends → give coins
videoEl.addEventListener("ended", () => {
  coins += 1;
  localStorage.setItem("coins", coins);
  coinsEl.textContent = coins;
  statusEl.textContent = "✔ 1 Coin Added!";
  setTimeout(() => loadVideo(index + 1), 1500); // Auto next after end
});

// Start with first video
loadVideo(0);
