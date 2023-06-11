const canvasSketch = require('canvas-sketch');
const { pick } = require('canvas-sketch-util/random');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;
let img;

let text = '';
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

    // fill source square with black
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    if (text != '') {
      // write white font
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
      // typeContext.beginPath();
      // typeContext.rect(mx, my, mw, mh);
      // typeContext.stroke();
      typeContext.fillText(text, 0, 0);
      typeContext.restore();
    }
    else {
      // write image
      typeContext.save();
      typeContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, cols, rows);
      typeContext.restore();
    }

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    // context.fillStyle = (text != '') ? 'black' : 'white';
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      // context.fillStyle = (text != '') ? 'white' : 'black';
      context.fillStyle = 'white';

      let r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];
      // context.fillStyle = `rgb(${r},${g},${b})`;
      
      if (text == '') r = 255 - r;

      const glyph = getGlyph(r);

      if (text == '') {
        context.font = `${cell * 2}px ${fontFamily}`;
        if (Math.random() < 0.1) context.font = `${cell * 3}px ${fontFamily}`;
      }
      else {
        context.font = `${cell * 2}px ${fontFamily}`;
        if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;
      }

      // simple square grid
      // context.save();
      // context.translate(x, y);
      // context.translate(cell*.5, cell*.5);
      // context.fillRect(0, 0, cell-1, cell-1);
      // context.restore();

      // simple circle grid
      // context.save();
      // context.translate(x, y);
      // context.translate(cell*.5, cell*.5);
      // context.beginPath();
      // context.arc(0, 0, cell*.5, 0, Math.PI * 2);
      // context.fill();
      // context.restore();

      // draw glyphs
      context.save();
      context.translate(x, y);
      context.translate(cell*.5, cell*.5);
      context.beginPath();
      context.fillText(glyph, 0, 0);
      context.restore();
    }

    // draw little source canvas in the top left corner
    context.drawImage(typeCanvas, 0, 0);
  };
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

document.addEventListener('keydown', (e) => {
  text = e.key.toUpperCase();
  manager.render();
});

document.addEventListener('keyup', (e) => {
  text = '';
  manager.render();
});

// const url = 'https://gerrit.works/test/afx-200b.png';
const url = 'afx-200b.png';
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}

const start = async () => {
  img = await loadImage(url);
  manager = await canvasSketch(sketch, settings);
};
start();
