const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 800, 80 ],
  animate: true,
  duration: 10,
  fps: 30
};

// const animate = () {
//   console.log('domestika');
//   requestAnimationFrame(animate);
// }
// animate();
const palette = [
  '#FF0005',
  '#FFF28C',
  '#959595',
  '#3D3D3D',
  '#121212'
];

const sketch = ({ context, width, height }) => {  // parameters can be copied into sketch function
  const agents = [];

  for (let i=0; i<32; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const fillStyle = palette[Math.round(random.range(0,5)) % 5];
    agents.push(new Agent(x, y, fillStyle));
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#eeeedd';
    context.fillRect(0, 0, width, height);

    for (let i=0; i<agents.length; i++) {
      const agent = agents[i];

      // for (let j=0; j<agents.length; j++) {
      for (let j=i+1; j<agents.length; j++) {
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);

        if (dist > 100) continue;

        let col = math.mapRange(dist, 0, 200, 0, 255)
        // context.strokeStyle = "rgb("+col+","+col+","+col+")";
        context.strokeStyle = "#cccccc";
        context.lineWidth = math.mapRange(dist, 0, 200, 1, 1);
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      // agent.bounce(width, height);
      agent.wrap(width, height);
    });

    // const point = { x: 800, y: 400, radius: 10 };
    // const pointA = new Agent(800, 400);
    // const pointB = new Agent(300, 700);

    // pointA.draw(context);
    // pointB.draw(context);

    // context.beginPath();
    // context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI * 2);
    // context.fillStyle = 'black';
    // context.fill();

    // context.beginPath();
    // context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
    // context.fillStyle = 'black';
    // context.fill();
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Agent {
  constructor(x, y, fillStyle) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(2, 6);
    this.fillStyle = fillStyle;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    // if (this.pos.x < 0) this.pos.x = width;
    // if (this.pos.x > width) this.pos.x = 0;

    // if (this.pos.y < 0) this.pos.y = height;
    // if (this.pos.y > height) this.pos.y = 0;

    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  draw(context) {
    // context.fillStyle = 'black';

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 1;
    context.fillStyle = this.fillStyle;
    context.strokeStyle = "black";
    context.beginPath();
    // context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}