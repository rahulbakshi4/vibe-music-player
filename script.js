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

// Songs
const songs = [
{
  name: 'song-1',
  displayname: '1k',
  artist: 'ameba.'
},
{
  name: 'song-2',
  displayname: 'memories (w_ aidan)',
  artist: 'future nat'  
},
{
  name: 'song-3',
  displayname: 'birds',
  artist: 'wünsche' 
},
{
  name: 'song-4',
  displayname: 'Monsters',
  artist: 'dann.gogh' 
},
{
  name: 'song-5',
  displayname: 'Snaps',
  artist: 'Monma' 
},
{
  name: 'song-6',
  displayname: 'Why am I doing this',
  artist: 'dann.gogh' 
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
    music.src = `https://firebasestorage.googleapis.com/v0/b/music-player-4089e.appspot.com/o/music%2F${song.name}.mp3?alt=media&token=935a24e1-21b0-4498-96be-96735e269887`;
    image.src = `img/${song.name}.jpg`;
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