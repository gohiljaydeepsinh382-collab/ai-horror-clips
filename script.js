// simple watch & earn + ad-placeholder logic

const video = document.getElementById('clip');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');
const adModal = document.getElementById('ad-modal');
const closeAd = document.getElementById('close-ad');
const coinCountEl = document.getElementById('coin-count');

let coins = Number(localStorage.getItem('coins')||0);
coinCountEl.textContent = coins;

// Play/Pause toggle
btnPlay.addEventListener('click', () => {
  if(video.paused) video.play();
  else video.pause();
});

// Next clip placeholder (you can change logic to load different video URLs)
btnNext.addEventListener('click', () => {
  // For demo, just rewind
  video.currentTime = 0;
  video.pause();
  showStatus('Ready. Play next clip.');
});

// When video ends: give coins and show ad placeholder
video.addEventListener('ended', () => {
  // give coins (e.g., 10 coins per clip)
  coins += 10;
  localStorage.setItem('coins', coins);
  coinCountEl.textContent = coins;

  // show ad placeholder
  showAd();
});

closeAd.addEventListener('click', () => {
  hideAd();
  showStatus('Ad closed. Enjoy next clip!');
});

function showAd(){
  adModal.classList.remove('hidden');
}

function hideAd(){
  adModal.classList.add('hidden');
}

function showStatus(msg){
  const s = document.getElementById('status');
  s.textContent = msg;
  setTimeout(()=> s.textContent = 'Watch & Earn horror clips', 4000);
}
