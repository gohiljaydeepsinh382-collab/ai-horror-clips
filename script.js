// script.js - Watch & Earn demo (final)
// Paste this whole file into your repo's script.js (replace existing).

// === clips array ===
// These are raw.githubusercontent.com links converted from your blob links.
// If you add/remove files in repo, update this array (use same raw URL pattern).
const clips = [
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183320.mp4', title: 'clipai_video_20251118_183320.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183324.mp4', title: 'clipai_video_20251118_183324.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183328.mp4', title: 'clipai_video_20251118_183328.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183338.mp4', title: 'clipai_video_20251118_183338.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183344.mp4', title: 'clipai_video_20251118_183344.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183350.mp4', title: 'clipai_video_20251118_183350.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183358.mp4', title: 'clipai_video_20251118_183358.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183410.mp4', title: 'clipai_video_20251118_183410.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183611.mp4', title: 'clipai_video_20251118_183611.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183615.mp4', title: 'clipai_video_20251118_183615.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183627.mp4', title: 'clipai_video_20251118_183627.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183631.mp4', title: 'clipai_video_20251118_183631.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183714.mp4', title: 'clipai_video_20251118_183714.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183815.mp4', title: 'clipai_video_20251118_183815.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_183825.mp4', title: 'clipai_video_20251118_183825.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_224319.mp4', title: 'clipai_video_20251118_224319.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_224613.mp4', title: 'clipai_video_20251118_224613.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/clipai_video_20251118_224708.mp4', title: 'clipai_video_20251118_224708.mp4' },
  // Panda and other named files (space & emoji encoded)
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/Panda%20Saves%20Baby%20%20%E2%9D%A4%EF%B8%8F%20-Panda%20Saves%20Baby%20-%20Cute%20Panda%20Protects%20Child%20-%20Panda%20H.mp4', title: 'Panda Saves Baby (long).mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/Panda%20Saved%20The%20Baby%20Who%20Was%20Believed%20To%20Be%20Dead.%20%23ai%20%23baby%20%23panda%20%23shorts%20%23kids%20%23aipanda%20%23aishorts.mp4', title: 'Panda Saved The Baby...mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/Pin%20page.mp4', title: 'Pin page.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/the%20emotional%20story%20in%20parrot.mp4', title: 'the emotional story in parrot.mp4' },
  { src: 'https://raw.githubusercontent.com/gohiljaydeepsinh382-collab/ai-horror-clips/main/Ai%20--gorilla%F0%9F%90%8D%2C%20scorpion%F0%9F%90%9A%20and%20shark%F0%9F%90%88.mp4', title: 'Ai --gorilla, scorpion and shark.mp4' }
];

// ====== App logic ======
const video = document.getElementById('clipVideo') || document.querySelector('video'); // ensure it finds your video element
const btnPlay = document.getElementById('btnPlay') || document.querySelector('#btnPlay');
const btnNext = document.getElementById('btnNext') || document.querySelector('#btnNext');
const statusEl = document.getElementById('status') || document.querySelector('#status');
const titleEl = document.getElementById('title') || document.querySelector('#title');
const coinCountEl = document.getElementById('coinCount') || document.querySelector('#coinCount');

let current = 0;
let coins = Number(localStorage.getItem('coins') || 0);
coinCountEl && (coinCountEl.textContent = coins);

// helper: set status
function showStatus(t) {
  if (statusEl) statusEl.textContent = t;
}

// load a clip by index
function loadClip(i) {
  if (!clips[i]) {
    showStatus('No more clips');
    return;
  }
  current = i;
  const c = clips[i];
  // set source (use createObjectURL if needed) - direct src should work for raw links
  if (video) {
    video.pause();
    video.src = c.src;
    video.load();
    // update UI
    if (titleEl) titleEl.textContent = 'Loaded: ' + c.title;
    showStatus('Ready: ' + c.title);
  }
}

// on video end: give coin and auto-next
function onVideoEnded() {
  // increment coins
  coins = Number(coins) + 1;
  localStorage.setItem('coins', coins);
  if (coinCountEl) coinCountEl.textContent = coins;
  showStatus('You earned 1 coin! Coins: ' + coins);
  // short delay then next clip
  setTimeout(() => {
    const next = (current + 1) % clips.length;
    loadClip(next);
    // Try to autoplay (may be blocked). We set muted=false and call play.
    if (video) {
      video.muted = false;
      video.play().catch(err => {
        // autoplay blocked - let user press Play
        console.log('Autoplay blocked:', err);
        showStatus('Tap Play to continue (autoplay blocked on mobile).');
      });
    }
  }, 800);
}

// bind events
if (video) {
  video.addEventListener('ended', onVideoEnded);
  video.addEventListener('pause', () => showStatus('Paused'));
  video.addEventListener('play', () => showStatus('Playing'));
  video.addEventListener('loadeddata', () => showStatus('Loaded, ready to play'));
  video.addEventListener('error', (e) => {
    console.error('Video error', e);
    showStatus('Video load error. Check link or CORS.');
  });
}

// Play / Pause button handler
function togglePlay() {
  if (!video) return;
  // Unmute when user presses play (mobile autoplay restriction)
  video.muted = false;
  if (video.paused) {
    video.play().catch(err => {
      console.log('Play error', err);
      showStatus('Play blocked — try tapping video or allow sound.');
    });
  } else {
    video.pause();
  }
}

// Next clip handler
function nextClip() {
  const next = (current + 1) % clips.length;
  loadClip(next);
  // attempt play
  if (video) {
    video.muted = false;
    video.play().catch(err => {
      console.log('Autoplay blocked on next:', err);
      showStatus('Tap Play to start next clip (autoplay blocked on mobile).');
    });
  }
}

// attach to DOM buttons (if present)
if (btnPlay) btnPlay.addEventListener('click', togglePlay);
if (btnNext) btnNext.addEventListener('click', nextClip);

// initialize first clip
if (clips.length > 0) {
  loadClip(0);
  // Try to autoplay muted first (browsers often allow muted autoplay).
  if (video) {
    video.muted = true;
    video.play().then(() => {
      showStatus('Auto-play (muted) started.');
    }).catch(() => {
      // blocked, show hint to user
      showStatus('Tap Play to start (autoplay may be blocked on mobile).');
    });
  }
} else {
  showStatus('No clips configured.');
}
