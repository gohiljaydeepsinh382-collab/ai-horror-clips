// simple playlist + watch & earn + autoplay-friendly behavior
// 1) Edit the `playlist` array below with your uploaded filenames (exact names).
// 2) Commit & reload your GitHub Pages site.
// 3) Note: browsers block autoplay with sound - this script mutes initially.

const playlist = [
  "clipai_video_20251118_183320.mp4",
  "clipai_video_20251118_183344.mp4",
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
  "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4",
  "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
  "Pin page.mp4",
  "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4"
];
// ---------- end playlist ----------

// base URL for files: change if your repo pages path differs
// If your site root is at /ai-horror-clips/, keep as-is. Otherwise update.
const basePath = window.location.pathname.replace(/\/[^/]*$/, '/')  // path to root of current page
// OR you can set explicitly e.g. const basePath = "/ai-horror-clips/"; 

// UI elements (assumes your index.html has these IDs)
const videoEl = document.getElementById('clip-player') || document.querySelector('video');
const btnPlay = document.getElementById('btn-play') || document.getElementById('btn-play') || document.querySelector('.btn-play');
const btnNext = document.getElementById('btn-next') || document.querySelector('.btn-next');
const coinCountEl = document.getElementById('coin-count') || document.querySelector('#coins-ui') || document.querySelector('[data-coins]');

// fallback: create coin UI if not present
if(!coinCountEl) {
  const c = document.createElement('div');
  c.id = 'coin-count';
  c.style.position = 'fixed';
  c.style.right = '12px';
  c.style.top = '12px';
  c.style.background = 'rgba(0,0,0,0.6)';
  c.style.color = '#fff';
  c.style.padding = '6px 10px';
  c.style.borderRadius = '6px';
  c.style.zIndex = 9999;
  c.textContent = 'Coins: 0';
  document.body.appendChild(c);
  coinCountEl = c;
}

let idx = 0;
let coins = Number(localStorage.getItem('coins') || 0);
updateCoinsUI();

function getVideoUrl(filename) {
  // If your GitHub pages site serves files from same folder, this will work.
  // Use basePath + filename to point to file path.
  return basePath + filename;
}

function loadClip(i) {
  if(!videoEl) return;
  if(i < 0) i = 0;
  if(i >= playlist.length) i = 0;
  idx = i;
  const url = getVideoUrl(playlist[idx]);
  videoEl.src = url;
  videoEl.load();
  // mute first to allow autoplay; user can unmute on interaction
  videoEl.muted = true;
  // try to autoplay (some browsers allow muted autoplay)
  const p = videoEl.play();
  if(p && p.catch) p.catch(()=>{/* ignore autoplay rejection */});
  showStatus('Ready');
}

// Play/pause toggle + unmute at user's gesture
if(btnPlay) {
  btnPlay.addEventListener('click', () => {
    if(!videoEl) return;
    if(videoEl.paused) {
      videoEl.muted = false; // user clicked -> enable sound
      videoEl.play();
      btnPlay.textContent = 'Pause';
    } else {
      videoEl.pause();
      btnPlay.textContent = 'Play';
    }
  });
} else if(videoEl) {
  // also enable click on video to toggle
  videoEl.addEventListener('click', () => {
    if(videoEl.paused) {
      videoEl.muted = false;
      videoEl.play();
    } else {
      videoEl.pause();
    }
  });
}

// Next clip button
if(btnNext) {
  btnNext.addEventListener('click', () => {
    goNext();
  });
}

// When a clip ends: reward and go to next after short delay
if(videoEl) {
  videoEl.addEventListener('ended', () => {
    // reward once per full play
    giveCoins(1);
    showStatus('Clip finished — +1 coin');
    // small delay then next
    setTimeout(() => {
      goNext();
    }, 800); // 0.8s
  });
}

// also give coins when user watches >= X seconds (optional)
const rewardAfterSec = 5; // seconds to watch before counting as watched
let watchTimer = null;
videoEl && videoEl.addEventListener('timeupdate', () => {
  if(!videoEl) return;
  if(videoEl.currentTime >= rewardAfterSec && !videoEl.dataset.rewarded) {
    // mark as rewarded for this clip
    videoEl.dataset.rewarded = '1';
    giveCoins(1);
    showStatus('+1 coin for watching');
  }
});

// helper functions
function giveCoins(n=1) {
  coins += n;
  localStorage.setItem('coins', coins);
  updateCoinsUI();
}

function updateCoinsUI() {
  if(coinCountEl) coinCountEl.textContent = 'Coins: ' + coins;
}

function goNext() {
  const nextIdx = (idx + 1) % playlist.length;
  scrollToClip();
  // reset rewarded flag
  if(videoEl) videoEl.dataset.rewarded = '';
  loadClip(nextIdx);
}

function scrollToClip() {
  // scroll the video element into center of view smoothly
  if(videoEl && typeof videoEl.scrollIntoView === 'function') {
    setTimeout(()=> videoEl.scrollIntoView({behavior:'smooth', block:'center'}), 80);
  }
}

function showStatus(text) {
  // simple status line at bottom of player (creates if missing)
  let s = document.getElementById('watch-status');
  if(!s) {
    s = document.createElement('div');
    s.id = 'watch-status';
    s.style.textAlign = 'center';
    s.style.color = '#fff';
    s.style.padding = '6px 0';
    if(videoEl && videoEl.parentElement) videoEl.parentElement.appendChild(s);
    else document.body.appendChild(s);
  }
  s.textContent = text;
}

// initial load
loadClip(0);
