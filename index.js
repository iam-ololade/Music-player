let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_image = document.querySelector(".track-image");
let playpause_btn = document.querySelector(".playpause-btn");
let next_btn = document.querySelector(".next-btn");
let prev_btn = document.querySelector(".prev-btn");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

//local var
let isPlaying = false;
let trackIndex = 0;
let updateTimer;
let nextTrack;

let curr_track = document.createElement("audio");
let track_list = [
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"  },
  {
    name: "Shipping lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"  },
  {    
    name: "Shipping lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
];



//FUNCTIONS
let loadTrack = trackIndex =>{
  clearInterval(updateTimer);
  let track = track_list[trackIndex] 
  curr_track.src = track.path
  track_name.textContent = `-${track.name}-`;
  track_artist.textContent = track.artist;
  track_image.src = track.image;
  now_playing.textContent = `Playing ${trackIndex + 1} of ${track_list.length}`
  curr_track.load();
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

loadTrack(trackIndex);

let playPause = () =>{
  if(!isPlaying){
    playTrack();
  }else{
    pauseTrack()     
  }
}
let playTrack = () =>{
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fas fa-pause fa-3x"></i>'
  curr_track.play();
  track_image.classList.add("rotate");
}
let pauseTrack = () =>{
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fas fa-play fa-3x"></i>'
  curr_track.pause();
  track_image.classList.remove("rotate");

}
 nextTrack = () =>{
  if(trackIndex < track_list.length -1) trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex)
  playTrack()
}
let prevTrack = () =>{
  if(trackIndex > 0) trackIndex -= 1;
  else trackIndex = track_list.length -1;
  loadTrack(trackIndex);
  playTrack();
}

let shuffleTrack = () =>{
  let random = Math.floor(Math.random()* track_list.length);
  loadTrack(random);
  playTrack();
}
let repeatTrack = () =>{
  loadTrack(trackIndex);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}