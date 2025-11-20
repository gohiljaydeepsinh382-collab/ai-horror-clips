// script.js - Watch & Earn (ready-to-use)
// --- EDIT clip names here if needed ---
const clips = [
  'Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4',
  'Pin page.mp4',
  'clipai_video_20251118_182913.mp4',
  'clipai_video_20251118_183320.mp4',
  'clipai_video_20251118_183324.mp4',
  'clipai_video_20251118_183328.mp4',
  'clipai_video_20251118_183338.mp4',
  'clipai_video_20251118_183344.mp4',
  'clipai_video_20251118_183350.mp4',
  'clipai_video_20251118_183358.mp4',
  'clipai_video_20251118_183410.mp4',
  'clipai_video_20251118_183611.mp4',
  'clipai_video_20251118_183615.mp4',
  'clipai_video_20251118_183627.mp4',
  'clipai_video_20251118_183631.mp4',
  'clipai_video_20251118_183714.mp4',
  'clipai_video_20251118_183815.mp4',
  'clipai_video_20251118_183825.mp4',
  'clipai_video_20251118_224319.mp4',
  'clipai_video_20251118_224613.mp4',
  'clipai_video_20251118_224708.mp4',
  'the emotional story in parrot.mp4',
  'Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4',
  'Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4'
];
// -----------------------------------------------------

(function(){
  const videoEl = document.getElementById('player');
  const btnPlay = document.getElementById('btn-play');
  const btnNext = document.getElementById('btn-next');
  const coinEl = document.getElementById('coinCount');
  const statusEl = document.getElementById('status');

  if(!videoEl || !btnPlay || !btnNext || !coinEl || !statusEl){
    console.error('Missing elements - check HTML ids');
    return;
  }

  let idx = 0;
  let coins = Number(localStorage.getItem('coins') || 0);

  function updateCoinsUI(){
    coinEl.textContent = String(coins);
  }
  function setStatus(t){
    statusEl.textContent = t;
    // small fade out
    setTimeout(()=>{ if(statusEl.textContent === t) statusEl.textContent = 'Ready'; }, 3000);
  }

  function loadClip(i){
    if(!clips[i]) return;
    const fname = clips[i];
    // encode URI to handle spaces/special chars
    videoEl.src = encodeURI(fname);
    videoEl.load();
    setStatus(`Loaded clip ${i+1} / ${clips.length}`);
  }

  btnPlay.addEventListener('click', ()=>{
    if(videoEl.paused){
      videoEl.play().catch(e => {
        console.log('Autoplay blocked', e);
        setStatus('Tap Play to allow playback');
      });
      btnPlay.textContent = 'Pause';
    } else {
      videoEl.pause();
      btnPlay.textContent = 'Play';
    }
  });

  btnNext.addEventListener('click', ()=> {
    nextClip();
  });

  videoEl.addEventListener('ended', ()=> {
    // increment coin
    coins += 1;
    localStorage.setItem('coins', coins);
    updateCoinsUI();
    setStatus(`+1 coin! Total ${coins}`);
    // auto next after small delay
    setTimeout(()=> nextClip(), 700);
  });

  function nextClip(){
    idx = (idx + 1) % clips.length;
    loadClip(idx);
    // try play
    videoEl.play().catch(()=> {
      setStatus('Tap Play if not auto-playing');
    });
    btnPlay.textContent = 'Pause';
  }

  // init
  updateCoinsUI();
  if(clips.length>0) loadClip(0);

  // keyboard shortcuts (space = play/pause, n = next)
  document.addEventListener('keydown', (e)=>{
    if(e.key === ' '){
      e.preventDefault();
      btnPlay.click();
    } else if(e.key.toLowerCase() === 'n'){
      btnNext.click();
    }
  });

})();
