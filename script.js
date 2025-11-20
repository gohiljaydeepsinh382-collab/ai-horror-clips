const repoUser = "gohiljaydeepsinh382-collab";
const repoName = "ai-horror-clips";

const player = document.getElementById("player");
const status = document.getElementById("status");
const titleEl = document.getElementById("title");
const btnPlay = document.getElementById("btnPlay");
const btnNext = document.getElementById("btnNext");
const coinsEl = document.getElementById("coins");

let videos = [];
let index = 0;
let coins = Number(localStorage.getItem("coins") || 0);
coinsEl.textContent = coins;

async function loadVideoList() {
  status.textContent = "Loading videos...";

  const apiURL = `https://api.github.com/repos/${repoUser}/${repoName}/contents/`;

  const res = await fetch(apiURL);
  const files = await res.json();

  videos = files
    .filter(f => f.name.toLowerCase().endsWith(".mp4"))
    .map(f => f.download_url);

  if (videos.length === 0) {
    status.textContent = "No videos found!";
    return;
  }

  status.textContent = `Found ${videos.length} videos`;
  loadClip(0);
}

function loadClip(i) {
  index = i % videos.length;
  const url = videos[index];

  player.src = url;
  player.load();

  let name = url.split("/").pop();
  titleEl.textContent = name;
  status.textContent = "Loaded: " + name;

  player.muted = true;
  player.play().catch(() => {
    status.textContent = "Tap Play to start";
  });
}

btnPlay.addEventListener("click", async () => {
  if (player.paused) {
    player.muted = false;
    await player.play();
    status.textContent = "Playing";
  } else {
    player.pause();
    status.textContent = "Paused";
  }
});

btnNext.addEventListener("click", () => {
  loadClip(index + 1);
});

player.addEventListener("ended", () => {
  coins++;
  localStorage.setItem("coins", coins);
  coinsEl.textContent = coins;
  loadClip(index + 1);
});

loadVideoList();
