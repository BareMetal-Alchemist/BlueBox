let cubes = [];

function setup() {
  console.log("setup running");
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('p5-bg');
  noStroke();
}

function draw() {
  background(10, 10, 30, 100); // Dark bluish background
  rotateY(frameCount * 0.001);

  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y, cube.z);
    rotateX(frameCount * cube.speed);
    rotateY(frameCount * cube.speed);
    fill(100, 150, 255, 150); // Soft blue
    box(cube.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  // Create floating cubes
  for (let i = 0; i < 50; i++) {
    cubes.push({
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      size: random(10, 30),
      speed: random(0.001, 0.005)
    });
  }
}
