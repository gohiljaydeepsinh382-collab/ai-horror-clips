// script.js
// Simple "watch & earn" player. 
// IMPORTANT: videoFiles array mein jo filename likhe hain, wohi tumne repo mein upload kiye hain.
// Agar koi filename alag ho to usko exactly waisa hi change kar dena (spaces, caps etc).

const video = document.getElementById('videoPlayer');
const btnPlay = document.getElementById('playBtn');
const btnNext = document.getElementById('nextBtn');
const coinCountEl = document.getElementById('coins');

let coins = Number(localStorage.getItem('hc_coins') || 0);
coinCountEl.textContent = coins;

// === List of video files you uploaded to the repository (one-level, same folder as index.html)
// Add / remove names exactly as in your GitHub repo. Keep the quotes and commas.
const videoFiles = [
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
  // agar aur files hain to yahan add karo
  "Pin page.mp4",
  "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
  "Panda Saved The Baby Who Was Believed To Be Dead.mp4",
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4"
];

// Current index and helper
let currentIndex = 0;

// Utility: convert local filename to URL that works in browser (encode spaces/special chars)
function fileToUrl(filename) {
  // index.html in same folder as files -> use encoded relative path
  return encodeURI(filename);
}

// load a clip by index
function loadClip(i) {
  if (!videoFiles[i]) return;
  currentIndex = i;
  video.src = fileToUrl(videoFiles[i]);
  video.load();
  showStatus(`Loaded: ${videoFiles[i]}`);
}

// play / pause toggle
btnPlay.addEventListener('click', () => {
  if (!video.src) {
    loadClip(currentIndex);
  }
  if (video.paused) video.play();
  else video.pause();
});

// next clip
btnNext.addEventListener('click', () => {
  const next = (currentIndex + 1) % videoFiles.length;
  loadClip(next);
  // autoplay next clip for convenience
  video.play().catch(()=>{/*autoplay blocked; user must tap*/});
});

// when video ends: reward coins and show next (placeholder for ad)
video.addEventListener('ended', () => {
  // reward: give 1 coin per full watch
  coins += 1;
  localStorage.setItem('hc_coins', coins);
  coinCountEl.textContent = coins;
  showStatus(`+1 coin! Total: ${coins}`);

  // OPTIONAL: show "ad placeholder" for 3 seconds before next clip
  showAdPlaceholder().then(() => {
    // then auto-play next
    const next = (currentIndex + 1) % videoFiles.length;
    loadClip(next);
    video.play().catch(()=>{});
  });
});

// small status bar with console fallback
function showStatus(txt) {
  console.log('[HorrorClips]', txt);
  // optional: could show on-page visible status if you add an element
}

// fake "ad placeholder" (simulate an ad wait) — replace later with real ad flow if required
function showAdPlaceholder() {
  return new Promise(resolve => {
    // you can open a modal here. For now just wait 2.5s to simulate ad time.
    setTimeout(resolve, 2500);
  });
}

// Initialize: shuffle list once per session (optional). Comment out shuffle if you want fixed order.
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
shuffleArray(videoFiles);

// load first clip but don't autoplay (safer for mobile)
loadClip(0);

// expose a debug function to console if needed
window.hc = {
  files: videoFiles,
  load: loadClip,
  coins: () => Number(localStorage.getItem('hc_coins')||0),
  resetCoins: () => { coins = 0; localStorage.setItem('hc_coins', 0); coinCountEl.textContent = 0; }
};
