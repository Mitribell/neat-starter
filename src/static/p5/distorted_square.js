let colors = ["#D95E47", "#B9F73A", "#5A5D4F", "#F2F1EC"];
let controlPoints = [];
let squareVertices = [];
let squareSize = 50;
let cnv;
let container;

function setup() {  
  container = document.getElementById('p5-container');  
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetWidth * 0.8;  
  cnv = createCanvas(containerWidth, containerHeight);
  cnv.parent('p5-container');  
  // frameRate(5)5
  background(colors[3]);
}
function windowResized() {
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetWidth * 0.8;
  resizeCanvas(containerWidth, containerHeight);
  background(colors[3]);
}
function draw() {  
  textAlign(CENTER, CENTER);
  textSize(48);
  textFont("monospace");
  fill(colors[2]);
  noStroke();
  text("MITRIBELL", width / 2, height / 3);
  stroke(colors[0]);
  fill(colors[1]);
  let squareCenter = createVector(width / 2, height / 2);

  squareVertices = [
    createVector(
      squareCenter.x - squareSize / 2,
      squareCenter.y + squareSize / 2
    ),
    createVector(
      squareCenter.x + squareSize / 2,
      squareCenter.y + squareSize / 2
    ),
    createVector(
      squareCenter.x + squareSize / 2,
      squareCenter.y - squareSize / 2
    ),
    createVector(
      squareCenter.x - squareSize / 2,
      squareCenter.y - squareSize / 2
    ),
  ];
  // let distance = createVector( random(50), random(300));
  let distance = createVector(mouseX - squareVertices[2].x, mouseY - squareVertices[2].y);    
  controlPoints[0] = createVector(
    squareVertices[2].x - distance.x,
    squareVertices[2].y + distance.y
  );
  controlPoints[1] = createVector(
    squareVertices[2].x + distance.x,
    squareVertices[2].y - distance.y
  );
  

  beginShape();
  vertex(squareVertices[0].x, squareVertices[0].y);
  vertex(squareVertices[1].x, squareVertices[1].y);
  bezierVertex(
    squareVertices[1].x,
    squareVertices[1].y,
    controlPoints[0].x,
    controlPoints[0].y,
    squareVertices[2].x,
    squareVertices[2].y
  );
  bezierVertex(
    controlPoints[1].x,
    controlPoints[1].y,
    squareVertices[3].x,
    squareVertices[3].y, squareVertices[3].x,
    squareVertices[3].y
  );
  endShape(CLOSE);  
}
