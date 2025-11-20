// script.js - Watch & Earn minimal player

// ---- EDIT HERE: replace filenames with exact names in your repo ----
const videos = [
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
  "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4",
  "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
  "Pin page.mp4",
  // add more filenames exactly as in repo. Example:
  // "clipai_video_20251118_183320.mp4"
];
// -------------------------------------------------------------------

const basePath = "/ai-horror-clips/"; // keep this unless your Pages root differs
let current = 0;
let coins = 0;

const video = document.getElementById("player");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const coinsBox = document.getElementById("coinsBox");
const status = document.getElementById("status");
const loadedName = document.getElementById("loadedName");

function setStatus(t){ status.textContent = t; }
function setLoadedName(n){ loadedName.textContent = n; }

function loadVideo(){
  const fname = videos[current];
  if(!fname) {
    video.removeAttribute('src');
    setStatus("No clips");
    setLoadedName("");
    return;
  }
  video.src = basePath + encodeURIComponent(fname).replace(/%20/g,' ');
  // Note: encodeURIComponent then replace handles spaces but keep readability. If filenames contain emojis or special chars,
  // sometimes direct path may fail in browsers — prefer simple ascii filenames in repo for reliability.
  setLoadedName("Loaded: " + fname);
  setStatus("Ready");
  video.load();
}

playBtn.onclick = () => {
  if(video.paused){
    video.play().catch(() => {
      // mobile blocks autoplay w/out user gesture
      alert("Tap the video area to allow playback (mobile may block autoplay).");
    });
  } else {
    video.pause();
  }
};

// Next clip button: reward + load next
nextBtn.onclick = () => {
  coins++;
  coinsBox.textContent = coins;
  current = (current + 1) % videos.length;
  loadVideo();
  video.play().catch(()=>{});
};

// When video ends automatically, reward and next
video.onended = () => {
  coins++;
  coinsBox.textContent = coins;
  current = (current + 1) % videos.length;
  loadVideo();
  video.play().catch(()=>{});
};

// If user taps video area do play (useful for mobile)
video.onclick = () => {
  if(video.paused) video.play().catch(()=>{});
  else video.pause();
};

// init
if(videos.length === 0){
  setStatus("No clips found - add filenames into script.js");
  setLoadedName("");
} else {
  loadVideo();
  // try auto-play (may be blocked)
  setTimeout(()=> {
    video.play().catch(()=> setStatus("Tap Play (autoplay blocked on mobile)"));
  }, 300);
}
