const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
      name: 'song-1',
      displayname: 'Life is beautiful',
      artist: 'Cash & Lifetrek'
    },
    {
      name: 'song-2',
      displayname: 'Dance of Life',
      artist: 'Peter B. Hellend'
    }
    ] 


let isPlaying = false;

function playSong(){  
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();

}
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

playBtn.addEventListener('click', ()=> (isPlaying? pauseSong(): playSong()));

function loadSong(song) {
    title.textContent = song.displayname;
    artist.textContent = song.artist;
    music.src = `https://firebasestorage.googleapis.com/v0/b/music-player-4089e.appspot.com/o/music2%2F${song.name}.mp3?alt=media&token=278c2cf2-d6b7-430a-b778-5a5226630a14`;
    image.src = `assests/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
    songIndex = (songIndex+1) % songs.length;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
  }
   
  // Prev Song
  function prevSong() {
    songIndex = (songIndex-1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }

loadSong(songs[songIndex]);

//Progress Bar update
function updateProgressBar(e){
 if (isPlaying){
   const {duration, currentTime} = e.srcElement;
   const progressPercent = (currentTime/duration )*100;
   progress.style.width = `${progressPercent}%`;

   const durationMinutes = Math.floor(duration/60);
   let durationSeconds = Math.floor(duration%60);
   if(durationSeconds < 10){
     durationSeconds =`0${durationSeconds}`;
   }
   if(durationSeconds){
     durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
   }
   const currentMinutes = Math.floor(currentTime / 60);
   let currentSeconds = Math.floor(currentTime % 60);
   if(currentSeconds < 10){
     currentSeconds =`0${currentSeconds}`;
   }
   currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
   
  }
 }
 // Progress Bar 
 function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime =((clickX/width)*duration);
 }
 


//Event Listeners for buttons
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)