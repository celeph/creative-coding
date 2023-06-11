const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  //dimensions: [ 1080, 1080 ],
  dimensions: [ 800, 80 ],
  animate: true,
  duration: 10,
  fps: 30
};

var sketchValues = [];

const palette = [
  '#FF0005',
  '#FFF28C',
  '#959595',
  '#3D3D3D',
  '#121212'
];

const sketch = () => {

    return ({ context, width, height, playhead }) => {

    //context.fillStyle = 'white';
    context.fillStyle = '#3D3D3D';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    
    const w = width * 0.01;
    const h = height * 0.1;

    let cx = 0;
    let cy = 0;
    let x, y;
    const num = 220;


    cx = width * 0.5;
    cy = height * 0.5;

    const radius = width * .3;
    
    if (sketchValues.length == 0) {
      for(let i=0; i<num; i++) {
        sketchValues.push({
          scaleX: random.range(.1, 2), 
          scaleY: random.range(.2, .25),
          rectY: random.range(0, -h*.75),
          lineWidth: random.range(2.76*h, 1.885*h),
          radius: random.range(.05, 2),
          startAngle: random.range(1, -8),
          endAngle: random.range(1, 5),
          j: random.range(-1, 1),
          jd: 1
        });
      }
    }

    for(let i=0; i<num; i++) {

      const slice = math.degToRad(360 / num);
      let angle = slice * i * (playhead <= .125 ? playhead*8. : (playhead >= .875 ? playhead*8. : 1));

      // angle = angle + sketchValues.r[i].j * sketchValues.r[i].jd;

      // if (Math.abs(angle) > math.degToRad(360)) sketchValues.r[i].jd = -sketchValues.r[i].jd;
      // sketchValues.r[i].j += .01 * sketchValues.r[i].jd;
      // sketchValues.r[i].rectY += .4 * sketchValues.r[i].jd;

      // sketchValues.r[i].radius += .00014 * sketchValues.r[i].jd;
      // sketchValues.r[i].startAngle += .001 * sketchValues.r[i].jd;
      // sketchValues.r[i].lineWidth += .1 * sketchValues.r[i].jd;
      // sketchValues.r[i].lineWidth = Math.min(24, sketchValues.r[i].lineWidth);

      // const col = Math.round(255./num * i * (sketchValues.r[i].lineWidth*.02)) % 255;
      // context.fillStyle = 'rgb('+col+','+col+','+col+')';

      // x = cx + radius * Math.sin(angle * playhead); // this produces a cool sine tornado effect
      // y = cy + radius * Math.cos(angle / playhead);
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.fillStyle = palette[i%5];
      context.translate(x, y)
      context.rotate(-angle);

      context.scale(sketchValues[i].scaleX, sketchValues[i].scaleY);

      context.beginPath();
      context.rect(-w*.5, sketchValues[i].rectY, w, h);
      context.fill();
      context.restore();

      context.save();
      context.strokeStyle = palette[i%5];
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = sketchValues[i].lineWidth * (playhead+1.5);

      context.beginPath();
      // context.arc(0, 0, radius, 0, slice);
      context.arc(0, 0, radius * sketchValues[i].radius, slice * (sketchValues[i].startAngle + (18.*playhead)), slice * (sketchValues[i].endAngle + (18.*playhead)));
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
