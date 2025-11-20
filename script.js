const videoPlayer = document.getElementById("videoPlayer");
const playBtn = document.getElementById("playBtn");
const nextClipBtn = document.getElementById("nextClipBtn");
const coinsDisplay = document.getElementById("coins");

let coins = 0;

// All video filenames from your GitHub repo
const clips = [
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
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
  "the emotional story in parrot.mp4",
  "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
  "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4"
];

// Auto generate raw Github path
const baseURL = "https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/";

let currentIndex = 0;

function loadClip() {
  videoPlayer.src = baseURL + encodeURIComponent(clips[currentIndex]);
}

playBtn.addEventListener("click", () => {
  videoPlayer.play();
});

nextClipBtn.addEventListener("click", () => {
  coins++;
  coinsDisplay.innerText = coins;

  currentIndex = (currentIndex + 1) % clips.length;
  loadClip();
});

// Load first clip
loadClip();
