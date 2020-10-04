const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
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
    music.src = `music/${song.name}.mp3`;
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


//Event Listeners for buttons
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);