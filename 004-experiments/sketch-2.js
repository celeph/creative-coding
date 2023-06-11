const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
};

var sketchValues = [];

const palette = [
  '#cc0000',
  '#ffffff',
  '#cccccc',
  '#333333',
  '#000000'
];

const sketch = () => {
    return ({ context, width, height }) => {

    context.fillStyle = '#ffbbbb';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    context.globalAlpha = 0.5;

    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 1024;
    const radius = width * .3;

    // top
    let cx = 0;
    let cy = 0;

    for(let i=0; i<num; i++) {
      let scaleX = random.range(.11, 1);
      let scaleY = random.range(.04, 1);
      let rectY = random.range(0, -h*.95);
      let radius = random.range(.0125, 3.3);

      const slice = math.degToRad(360 / num);
      let angle = slice * i;

      x = cx + radius * Math.sin(angle) * .4;
      y = cy + radius * Math.cos(angle) * .4;

      context.save();
      context.fillStyle = palette[1];
      context.translate(x, y)
      context.rotate(-angle);

      context.scale(scaleX, scaleY);
      
      context.beginPath();
      context.rect(-w*.95, rectY+4, w, h*20);
      context.fill();
      context.restore();
    }

    // bottom
    cx = width;
    cy = height;
    
    for(let i=0; i<num; i++) {
      let scaleX = random.range(.11, 1);
      let scaleY = random.range(.04, 1);
      let rectY = random.range(0, -h*.95);
      let radius = random.range(.0125, 3.3);

      const slice = math.degToRad(360 / num);
      let angle = slice * i;

      x = cx + radius * Math.sin(angle) * .4;
      y = cy + radius * Math.cos(angle) * .4;

      context.save();
      context.fillStyle = palette[1];
      context.translate(x, y)
      context.rotate(-angle);

      context.scale(scaleX, scaleY);
      
      context.beginPath();
      context.rect(-w*.95, rectY+4, w, h*20);
      context.fill();
      context.restore();
    }



    cx = 0;
    cy = 0;

    for(let i=0; i<num; i++) {
      const slice = math.degToRad(360 / num);
      let angle = slice * i;

      let lineWidth = random.range(0.46*h, 0.85*h);
      let radius = width * random.range(0, .72);
      let startAngle = slice * random.range(1, -18);
      let endAngle = slice * random.range(1, 15);

      x = cx + radius * Math.sin(angle) * .4;
      y = cy + radius * Math.cos(angle) * .4;

      context.save();
      context.lineWidth = lineWidth;
      context.strokeStyle = palette[(i+1)%5];
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(0, 0, radius, startAngle, endAngle);
      context.stroke();
      context.restore();
    }

    // bottom
    cx = width;
    cy = height;
    
    for(let i=0; i<num; i++) {
      const slice = math.degToRad(360 / num);
      let angle = slice * i;

      let lineWidth = random.range(0.46*h, 0.85*h);
      let radius = width * random.range(0, .72);
      let startAngle = slice * random.range(1, -18);
      let endAngle = slice * random.range(1, 15);


      x = cx + radius * Math.sin(angle) * .4;
      y = cy + radius * Math.cos(angle) * .4;

      context.save();
      context.lineWidth = lineWidth;
      context.strokeStyle = palette[(i+1)%5];
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(0, 0, radius, startAngle, endAngle);
      context.stroke();
      context.restore();
    }    


  }
};

canvasSketch(sketch, settings);
