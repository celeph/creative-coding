const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI;
// };

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 40;
    const radius = width * .3;

    for(let i=0; i<num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y)
      context.rotate(-angle);

      context.scale(random.range(.1,2), random.range(.2,.5));

      context.beginPath();
      context.rect(-w*.5, random.range(0, -h*.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5,20);

      context.beginPath();
      // context.arc(0, 0, radius, 0, slice);
      context.arc(0, 0, radius * random.range(.7,1.3), slice * random.range(1, -8), slice * random.range(1,5));
      context.stroke();
      context.restore();
    }

    // context.save();

    // // two ways to move things:
    // // 1) specify object coords
    // // 2) translate context
    // context.translate(x, y)
    // // context.rotate(.3); // radians
    // context.rotate(degToRad(45));

    // context.beginPath();
    // context.rect(-w*.5, -h*.5, w, h);
    // // context.rect(0, 0, w, h);
    // // context.rect(x, y, w, h);
    // context.fill();

    // context.restore();
    // context.translate(100, 400);

    // context.beginPath();
    // context.arc(0, 0, 50, 0, Math.PI * 2);
    // context.fill();

  };
};

canvasSketch(sketch, settings);
