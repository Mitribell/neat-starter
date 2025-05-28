let colors = ["#D95E47", "#B9F73A", "#5A5D4F", "#F2F1EC"];
let controlPoints = [];
let squareVertices = [];
let squareSize = 200;
let cnv;
let container;

function setup() {
	container = document.getElementById("hero-wrapper");
	let parentWidth = container.offsetWidth;
	let parentHeight = container.offsetHeight;
	cnv = createCanvas(parentWidth, parentHeight);
	cnv.parent("hero-wrapper");

	frameRate(20)
}
function windowResized() {
	if (container) {
		resizeCanvas(container.offsetWidth, container.offsetHeight);
	}
}

function draw() {
	// background(colors[3]);
	// stroke(colors[0]);
	noStroke();
	fill(colors[1]);
	clear();
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
	let distance = createVector(random(squareSize * 2), random(squareSize * 2));
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
		squareVertices[3].y,
		squareVertices[3].x,
		squareVertices[3].y
	);
	endShape(CLOSE);
	// line(
	//   controlPoints[0].x,
	//   controlPoints[0].y,
	//   controlPoints[1].x,
	//   controlPoints[1].y
	// );
	// noStroke();
	// fill(255, 0, 0);
	// for (let i = 0; i < controlPoints.length; i++) {
	//   ellipse(controlPoints[i].x, controlPoints[i].y, 10, 10);
	// }
}
