const canvasSketch = require('canvas-sketch');
const { pick } = require('canvas-sketch-util/random');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');


const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`; // '1200px serif';
    typeContext.textBaseline = 'top'; //'middle'; //'top';
    // context.textAlign = 'center';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * .5 - mx;
    const ty = (rows - mh) * .5 - my;

    typeContext.save();
    // context.translate(width*.5, height*.57);
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);
      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      // context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillStyle = 'white';

      context.save();
      context.translate(x, y);
      context.translate(cell*.5, cell*.5);
      
      // context.fillRect(0, 0, cell, cell);

      // context.beginPath();
      // context.arc(0, 0, cell*.5, 0, Math.PI * 2);
      // context.fill();
      // context.restore();

      context.fillText(glyph, 0, 0);
      context.restore();
    }
    // context.drawImage(typeCanvas, 0, 0);
  };


  // return ({ context, width, height }) => {
  //   context.fillStyle = 'white';
  //   context.fillRect(0, 0, width, height);

  //   context.fillStyle = 'black';
  //   context.font = `${fontSize}px ${fontFamily}`; // '1200px serif';
  //   context.textBaseline = 'top'; //'middle'; //'top';
  //   // context.textAlign = 'center';

  //   const metrics = context.measureText(text);
  //   const mx = metrics.actualBoundingBoxLeft * -1;
  //   const my = metrics.actualBoundingBoxAscent * -1;
  //   const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  //   const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  //   const x = (width - mw) * .5 - mx;
  //   const y = (height - mh) * .5 - my;

  //   context.save();
  //   // context.translate(width*.5, height*.57);
  //   context.translate(x, y);

  //   context.beginPath();
  //   context.rect(mx, my, mw, mh);
  //   context.stroke();

  //   context.fillText(text, 0, 0);
  //   context.restore();
  // };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '+';
  
  const glyphs = '_= /'.split('');
  // return text;
  return random.pick(glyphs);
};

document.addEventListener('keyup', (e) => {
  text = e.key.toUpperCase();
  manager.render();
});

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};
start();

/*
const url = 'https://picsum.photos/200';
const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}
// const start = () => {
//   loadMeSomeImage(url).then(img => {
//     console.log('image width', img.width);
//   });
//   console.log('this line');
// };
const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};
start();
*/