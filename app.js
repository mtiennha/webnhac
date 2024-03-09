function changeIconPlay() {
    var play = document.getElementById("circle-active");
    play.classList.toggle("fa-circle-pause");
}
function changeIconClass() {
    var icon = document.getElementById("repeat-active");
    icon.classList.toggle("fa-infinity");
}
const song = document.getElementById("song");
const playBtn = document.querySelector(".play-music");
const nextBtn = document.querySelector(".forward-right")
const prevBtn = document.querySelector(".forward-left");
const durationTime = document.querySelector(".remaning");
const remaningTime = document.querySelector(".duration");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");

let isPlaying = true;
let indexSong = 3;
const musics = ['ANH TỆ  DATKAA.mp3', 'nàng kiều đóng tune.mp3', 'say em.mp3', 'hãy trao cho anh.mp3', 'táo.mp3', 'nâng chén tiêu sầu.mp3'];
// const musics = [
//     {
//         id: 1,
//         title: "ANH TỆ",
//         file: "ANH TỆ  DATKAA.mp3",
//         image: "./img/anh tệ.jpg"
//     },
//     {
//         id: 2,
//         title: "nàng kiều đóng tune",
//         file: "nàng kiều đóng tune.mp3",
//         image: "./img/nàng kiều đóng tune.jpg"
//     },
// ]

displayTimer();
let timer;
song.setAttribute("src",  `./audio/${musics[indexSong]}`);
nextBtn.addEventListener("click", function() {
    changeSong(1);
});
prevBtn.addEventListener("click", function() {
    changeSong(-1);
});

song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    changeSong(1);
}
function changeSong(dir) {
    if ( dir == 1) {
        //next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir == -1) {
        //prevsong
        indexSong--;
        if(indexSong < 0) {
            indexSong = musics.length-1;
        }
        isPlaying = true;
    }
    song.setAttribute("src",  `./audio/${musics[indexSong]}`);
    playPause();
}

playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying) {
        song.play();
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }else {
        song.pause();
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remaningTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes: minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {

} 
init();