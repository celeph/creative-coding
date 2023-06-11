const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],

  // Enable an animation loop
  animate: true,
  // Set loop duration to 3
  duration: 2,

  fps: 30
};

window.g = {
  r: [],
  i: 0
};
for (let k=0; k<25; k++) window.g.r.push(Math.random());

const sketch = () => {
  let up = true;
  
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'black';
    context.strokeStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const w = width * .10;
    const h = height * .10;
    const gap = width * 0.03;
    const ix = width * 0.18;
    const iy = height * 0.18;
    const off = width * 0.02;

    let x, y;
    let g = window.g;
    let lw;
    
    function easeInSine(x) {
      return 1 - Math.cos((x * Math.PI) / 2);
    }
    
    function easeOutSine(x) {
      return Math.sin((x * Math.PI) / 2);
    }

    t = easeInSine(g.i) * 0.5;
    g.i += 0.015;
    lw = 0.012 * t;

    if (lw < 0.0001) {
      for (let k=0; k<25; k++) g.r[k] = Math.random();
      return;
    }

    for (let i=0; i<5; i++) {
      for (let j=0; j<5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.lineWidth = width * lw;
        let rc = Math.round(255 * lw*120 + (x+1));
        let gc = Math.round(255 * lw*130 + (y+1));
        let bc = Math.round(255 * lw*130 - (y+1)/3);

        context.strokeStyle = `rgb(${rc},${gc},${bc})`;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
    
        if (g.r[i*j] > 0.5) {
          context.beginPath();
          context.rect(x+off/2, y+off/2, w-off, h-off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
