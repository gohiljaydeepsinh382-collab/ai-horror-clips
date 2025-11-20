// ========== VIDEO PLAYER ELEMENTS ==========
const videoPlayer = document.getElementById("videoPlayer");
const playBtn = document.getElementById("playBtn");
const nextClipBtn = document.getElementById("nextClipBtn");
const coinsDisplay = document.getElementById("coins");

// ========== COINS (SAVED IN LOCAL STORAGE) ==========
let coins = Number(localStorage.getItem("hc_coins") || 0);
coinsDisplay.innerText = coins;

// ========== ALL VIDEO FILES (YOUR COMPLETE LIST) ==========
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

// ========== BASE RAW URL (DIRECT VIDEO LINK) ==========
const baseURL =
  "https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/";

// ========== CURRENT CLIP INDEX ==========
let currentIndex = 0;

// ========== LOAD A VIDEO ==========
function loadClip() {
  const filename = clips[currentIndex];
  videoPlayer.src = baseURL + encodeURIComponent(filename);
}

// ========== PLAY BUTTON ==========
playBtn.addEventListener("click", () => {
  videoPlayer.play();
});

// ========== NEXT CLIP BUTTON ==========
nextClipBtn.addEventListener("click", () => {
  coins++;
  coinsDisplay.innerText = coins;
  localStorage.setItem("hc_coins", coins);

  currentIndex = (currentIndex + 1) % clips.length;
  loadClip();
});

// ========== AUTO LOAD FIRST CLIP ==========
loadClip();
