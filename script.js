const videoList = [
    "Ai --gorilla🦍, scorpion🦂 and shark 🦈.mp4",
    "Panda Saved The Baby Who Was Believed To Be Dead. #ai #baby #panda #shorts #kids #aipanda #aishorts.mp4",
    "Panda Saves Baby – A Real Hero in Fur! 🐼❤️ -Panda Saves Baby - Cute Panda Protects Child - Panda H.mp4",
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
    "the emotional story in parrot.mp4"
];

let i = 0;
let coins = Number(localStorage.getItem("coins") || 0);

const videoEl = document.getElementById("clip");
const coinEl = document.getElementById("coins");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const statusEl = document.getElementById("status");

coinEl.textContent = coins;
loadVideo();

function loadVideo() {
    videoEl.src = videoList[i];
    videoEl.load();
    statusEl.textContent = "Ready";
}

// auto-scroll जब वीडियो चले
videoEl.addEventListener("playing", () => {
    window.scrollTo({
        top: videoEl.offsetTop - 20,
        behavior: "smooth"
    });
});

// वीडियो खत्म ➝ coin++ ➝ अगला वीडियो auto
videoEl.addEventListener("ended", () => {
    coins++;
    localStorage.setItem("coins", coins);
    coinEl.textContent = coins;

    statusEl.textContent = "Next in 1 sec...";

    setTimeout(() => {
        nextVideo();
    }, 1000);
});

// मैनुअल play/pause
playBtn.onclick = () => {
    if (videoEl.paused) videoEl.play();
    else videoEl.pause();
};

// अगला वीडियो
function nextVideo() {
    i = (i + 1) % videoList.length;
    loadVideo();
    setTimeout(() => videoEl.play(), 300);
}

nextBtn.onclick = nextVideo;
