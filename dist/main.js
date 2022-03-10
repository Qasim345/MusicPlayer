let audio = document.getElementById("audio");
let img = document.getElementById("img");
let aName = document.getElementById("name");
let art = document.getElementById("art");
let proBar = document.getElementById("probar");
let bar = document.getElementById("bar");
let names = ["Harley Bird - Home", "Ikson Anywhere Ikson", "Beauz & Jvna - Crazy", "Hardwind - Want Me", "Jim - Sun Goes Down", "Lost Sky - Vision NCS", "Alan_Walker_-_Fade", "Cartoon_On_&_On", "Elektronomia_Limitless", "Janji_-_Heroes_Tonight"];
let artist = ["Jordan Schor", "Audio Library", "Beauz & Jvna", "Mike Archangelo", "Jim Yosef x Roy", "NCS Release", "NCS Release", "NCS Release", "NCS Release", "NCS Release"];
let imgs = ["../dist/img/music-1.jpg", "../dist/img/music-2.jpg", "dist/img/music-3.jpg", "dist/img/music-4.jpg", "dist/img/music-5.jpg", "dist/img/music-6.jpg", "dist/img/music-1.jpg", "dist/img/music-3.jpg", "dist/img/music-5.jpg", "dist/img/music-1.jpg", "dist/img/music-2.jpg",];
let mSrc = ["songs/music-1.mp3", "songs/music-2.mp3", "songs/music-3.mp3", "songs/music-4.mp3", "songs/music-5.mp3", "songs/music-6.mp3", "songs/music-7.mp3", "songs/music-8.mp3", "songs/music-9.mp3", "songs/music-10.mp3"];
let index = 0;
window.onload = () => {
  loadM();
  setTimeout(()=> {
    $(".pre-loader").fadeOut(100);
  }, 1000);
}
// load all data
function loadM() {
  aName.innerHTML = names[index];
  art.innerHTML = artist[index];
  audio.src = mSrc[index];
  img.src = imgs[index];
}
// play music
function playA() {
  loadM();
  audio.play();
  $("#play").html("pause_circle");
  $(".flex div").css("animation-play-state", "running");
}
$("#play").click(() => {
  if (audio.paused) {
    audio.play();
    $("#play").html("pause_circle");
    $(".flex div").css("animation-play-state", "running");
  } else {
    audio.pause();
    $("#play").html("play_circle");
    $(".flex div").css("animation-play-state", "paused");
  }
});
// prev music
$("#prev").click(() => {
  index--;
  if (index < 0) {
    index = mSrc.length - 1;
  }
  loadM();
  playA()
});
// next music
$("#next").click(() => {
  index++;
  if (index > mSrc.length - 1) {
    index = 0;
  }
  loadM()
  playA()
});
// progress bar and duration
audio.addEventListener("timeupdate", (e) => {
  let curTime = e.target.currentTime;
  let dur = e.target.duration;
  let barWidth = (curTime / dur) * 100;
  bar.style.width = `${barWidth}%`;
  audio.addEventListener("loadeddata", () => {
    let adDur = audio.duration;
    let totMin = Math.floor(adDur / 60);
    let totSec = Math.floor(adDur % 60);
    if (totSec < 10) {
      totSec = `0${totSec}`;
    }
    $("#dur").text(`${totMin}:${totSec}`);
  });
  let curMin = Math.floor(curTime / 60);
  let curSec = Math.floor(curTime % 60);
  if (curSec < 10) {
    curSec = `0${curSec}`;
  }
  $("#cur").text(`${curMin}:${curSec}`);
});
// change music time
proBar.addEventListener("click", (e) => {
  let proWid = proBar.clientWidth;
  let clickOfX = e.offsetX;
  let songDur = audio.duration;
  audio.currentTime = (clickOfX / proWid) * songDur;
});
// repeat song
$("#repeat").click(() => {
  let getText = $("#repeat").text();
  switch (getText) {
    case "repeat":
      $("#repeat").text("repeat_one");
      break;
    case "repeat_one":
      $("#repeat").text("shuffle");
      break;
    case "shuffle":
      $("#repeat").text("repeat");
      break;
  }
});
audio.addEventListener("ended", () => {
  let getText = $("#repeat").text();
  switch (getText) {
    case "repeat":
      $("#repeat").text("repeat_one");
      index++;
      playA();
      break;
    case "repeat_one":
      $("#repeat").text("shuffle");
      audio.currentTime = 0;
      loadM();
      playA();
      break;
    case "shuffle":
      $("#repeat").text("repeat");
      let ranIn = Math.floor((Math.random() * mSrc.length) + 1);
      do {
        let ranIn = Math.floor((Math.random() * mSrc.length) + 1);
      } while (index = ranIn);
      index = ranIn;
      loadM();
      playA();
      break;
  }
});

// settings
$(document).click((e) => {
  if (e.target.id !== "back" && e.target.id !== "play_list" && e.target.id !== "search" && e.target.id !== "volB" && e.target.id !== "volume") {
    $(".play-list,.player").removeClass("act");
    $("#volB").removeClass("up")
  }
});

$("#back").click(() => {
  $(".play-list,.player").toggleClass("act");
});
// play-list
var list = document.getElementById("list");
for (var i = 0; i < mSrc.length; i++) {
  list.innerHTML += `<li>
  <span>music_note</span>
  <div>
  <h5>${names[i]}</h5>
  <p>${artist[i]}</p>
  </div>
  <p id="${mSrc[i].src}" class="stu">0:50</p>
  <audio class="${mSrc[i].src}" src="${mSrc[i].src}"></audio>
  </li>`;
  // let adTxt = list.querySelector(`#${mSrc[i].src}`);
  // let ad = querySelector(`.${mSrc[i].src}`);
  // let dursong = ad.duration;
  // let totalMin = Math.floor(dursong / 60);
  // let totalSec = Math.floor(dursong % 60);
  // if (totalSec < 10) { //if sec is less than 10 then add 0 before it
  //     totalSec = `0${totalSec}`;
  // }
  // adTxt.innerText = `0${totalMin}:${totalSec}`;
  // $(audio).on("loadeddata", () => {
  //     let adDur = mSrc[i].duration;
  //     let totMin = Math.floor(adDur / 60);
  //     let totSec = Math.floor(adDur % 60);
  //     $(`#${mSrc[i].src}`).text(`${totMin}:${totSec}`);
  // });
}
$("#replay").click(() => {
  audio.currentTime = 0;
});
$("#volume").click(() => {
  $(".volume-top").addClass("up");
})
$(".volume-top #close").click(() => {
  $(".volume-top").removeClass("up");
})

function getVolume() {
  audio.volume = $("#vol").val() / 100;
  if (audio.volume == 0) {
    $("#vOff").html("volume_off");
  } else {
    $("#vOff").html("volume_down");
  }
}
// filter
$("#search").on("keyup", function() {
  var val = $(this).val().toLowerCase();
  $("#list li").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
});
});