// resources: https://youtu.be/mhjuuHl6qHM?si=yEMW7bmziljnnFui
// song: Laufey "Falling behind" i think the song fits message
const flock = [];
let alignSlider, cohesionSlider,separationSlider; 
var song;

function preload(){
  song = loadSound("Laufey.mp3")
}

function setup() {
  createCanvas(640, 360);
  
  song.play();
  song.setVolume(0.5);
  
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
 
  
  for(let i = 0; i <100; i++){
    flock.push(new Particle());
  } 
  
}

function draw() {
  background(240, 188, 218);
  
  let mouseNearParticle = false;
  
  for (let particle of flock){
    particle.edge();
    particle.flock(flock);
    particle.update();
    particle.show();
   
  }
  
  
  fill(141, 78, 163);
  textSize(20);
  text('love is in the air',mouseX,mouseY)
}