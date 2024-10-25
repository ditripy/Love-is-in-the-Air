
class Particle{
  constructor(){
    this.position = createVector(random(width),random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2,4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
  }
  
  edge() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  
  align(particle){
    let perceptionRadius = 25;
    let steering = createVector();
    let total = 0;
    for(let other of particle){
      let d = dist(
        this.position.x, 
        this.position.y, 
        other.position.x, 
        other.position.y
      );// just particles near
      
      if( other != this && d < perceptionRadius){
        steering.add(other.velocity); // adding up all the velocities
        total++;
      }
    }
      if(total > 0){
        steering.div(total);// avg velocity of all particles
        steering.setMag(this.maxSpeed);
       steering.sub(this.velocity);
        steering.limit(this.maxForce);//limit the vector to maxForce;
    }
      return steering;
  
  }
  
   cohesion(particle){
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for(let other of particle){
      let d = dist(
        this.position.x, 
        this.position.y, 
        other.position.x, 
        other.position.y
      );// just particles near
      
      if( other != this && d < perceptionRadius){
        steering.add(other.position); 
        total++;
      }
    }
      if(total > 0){
        steering.div(total);// avg velocity of all particles
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
       steering.sub(this.velocity);
        steering.limit(this.maxForce);//limit the vector to maxForce;
    }
      return steering;
  
  }
  
  separation(particle){
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;
    for(let other of particle){
      let d = dist(
        this.position.x, 
        this.position.y, 
        other.position.x, 
        other.position.y
      );// just particles near
      
      if( other != this && d < perceptionRadius){
        let diff = p5.Vector.sub(this.position,other.position); // subtract current position to other position
        diff.div(d*d); // inverse of diff vector, farther it is the lower the magnitude
        steering.add(diff); 
        total++;
      }
    }
    
     // Repel from the cursor (mouse position)
    let mouse = createVector(mouseX, mouseY);
    let dMouse = dist(this.position.x, this.position.y, mouse.x, mouse.y);
    if (dMouse < 100) { // Set the perception radius for mouse
      let diffMouse = p5.Vector.sub(this.position, mouse);
      diffMouse.div(dMouse); // Inverse proportional to distance
      steering.add(diffMouse);
      total++;
    }
    
      if(total > 0){
        steering.div(total);// avg velocity of all particles
        steering.setMag(this.maxSpeed);
       steering.sub(this.velocity);
        steering.limit(this.maxForce);//limit the vector to maxForce;
    }
      return steering;
  
  }
  
  flock(particle){
    
    let alignment = this.align(particle);
    let cohesion = this.cohesion(particle);
    let separation = this.separation(particle);
    
    separation.mult(separationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignSlider.value());
    
    this.acceleration.add(separation);
    this.acceleration.add(alignment);// F = m*a ; F = a; set acceleration to force
    
    this.acceleration.add(cohesion);
    // force accumulation : if two forces act on an object, force is the sum of those forces
    
  }
  
  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }
  
  show(){
     this.drawHeart(this.position.x, this.position.y, 10);
  }
  
  drawHeart(x, y, size) {
    // Drawing a heart shape using beginShape and vertices
    fill(255, 0, 100);  // Color for the heart
    noStroke();  // Remove outline
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }

  
  
}