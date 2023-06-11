const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const params = {
  // for grid animation
  cols: 10,
  rows: 10,

  scaleMin: 1,
  scaleMax: 30,

  freq: 0.001,
  amp: 0.2,

  frame: 0,
  animate: true,
  displayMode: 0,

  lineCap: 'butt',

  // for clifford
  a: 1.7, 
  b: 1.3, 
  c: -0.1, 
  d: -1.21,
  x: 0.1,
  y: 0.1,
  pointRadius: 0.5,
  maxT: 100,

  // for misc animations
  selectedAnim: 0,

  // for both
  backgroundColor: {r: 210, g: 220, b: 222},
  pointColor: {r: 54, g: 84, b: 120},
  globalAlpha: 1.0,

  sampleScenes: [
    {text: '--', value: JSON.stringify('')},
    {text: '1.7; 1.3; -0.1; -1.21', value: JSON.stringify({a: 1.7, b: 1.3, c: -0.1, d: -1.21 })},
    {text: '-1.4; 1.6; 1.0; 0.7', value: JSON.stringify({a: -1.4, b: 1.6, c: 1.0, d: 0.7})},
    {text: '-2.48; -0.98; 1.04; -2.02', value: JSON.stringify({a: -2.48, b: -.98, c: 1.04, d: -2.02})},
    {text: '1.7; -2.8; -0.1; -1.21', value: JSON.stringify({a: 1.7, b: -2.8, c: -0.1, d: -1.21})},
  ]
};

let clearCanvas = true;
let cx = params.x;
let cy = params.y;
let t = 0;

const sketch = () => {
  return ({ context, width, height, frame }) => {
    if (params.displayMode == 0) {
      const backgroundColor = Color.parse(Object.values(params.backgroundColor)).hex;
      const pointColor = Color.parse(Object.values(params.pointColor)).hex;
  
      context.globalAlpha = 1.0;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
  
      const cols = params.cols;
      const rows = params.rows;
      const numCells = cols * rows;
  
      const gridw = width * 0.8;
      const gridh = height * 0.8;
      const cellw = gridw / cols;
      const cellh = gridh / rows;
      const margx = (width - gridw) * .5;
      const margy = (height - gridh) * .5;
  
      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
  
        const x = col * cellw;
        const y = row * cellh;
  
        const w = cellw * .8;
        const h = cellh * .8;
  
        const f = params.animate ? frame : params.frame;
  
        // const n = random.noise2D(x + frame * 10, y, params.freq); // between -1 and 1
        const n = random.noise3D(x, y, f * 10, params.freq); // between -1 and 1
  
        const angle = n * Math.PI * params.amp;
        // const scale = (n + 1) / 2 * 30;
        // const scale = (n * .5 + .5) * 30;
        const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
  
        context.save();
        context.globalAlpha = params.globalAlpha;
        context.translate(x, y);
        context.translate(margx, margy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);
  
        context.strokeStyle = pointColor;
        context.lineWidth = scale;
        context.lineCap = params.lineCap;
        
        context.beginPath();
        context.moveTo(w * -.5, 0);
        context.lineTo(w * 0.5, 0);
        context.stroke();
  
        context.restore();
      }
    }
    else if (params.displayMode == 1) {
      if (t > params.maxT) return; 
      const backgroundColor = Color.parse(Object.values(params.backgroundColor)).hex;
      const pointColor = Color.parse(Object.values(params.pointColor)).hex;

      if (clearCanvas) {
        context.globalAlpha = 1.0;
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
        cx = params.x; 
        cy = params.y;
        t = 0.0;
        clearCanvas = false;
      }

      t += .01;
      const angle = 2 * Math.PI * t;

      for (let n = 0; n < 3000; n+=30) {
        for (let i = 0; i < 3000; i+=30) {
          let xpos, ypos;
          
          let nx = Math.sin(params.a * cy) + params.c * Math.cos(params.a * cx);
          let ny = Math.sin(params.b * cx) + params.d * Math.cos(params.b * cy);
  
          xpos = math.mapRange(nx, -2.5, 2.5, 0, width);
          ypos = math.mapRange(-ny, -2.5, 2.5, 0, height)
  
          cx = nx;
          cy = ny;

          context.save();
          context.globalAlpha = params.globalAlpha;
          context.translate(xpos, ypos);
  
          context.beginPath();
          context.fillStyle = pointColor;
          context.strokeStyle = pointColor;
          
          context.arc(0, 0, params.pointRadius, 0, 2*Math.PI);
          context.fill();
          context.restore();
        }
      }
    }
    else {
      if (t > params.maxT) return; 
      const backgroundColor = Color.parse(Object.values(params.backgroundColor)).hex;
      const pointColor = Color.parse(Object.values(params.pointColor)).hex;

      if (clearCanvas) {
        context.globalAlpha = 1.0;
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
        cx = params.x; 
        cy = params.y;
      }

      switch(params.selectedAnim) {
        case 0:
          t += .01;
          const angle = 2 * Math.PI * t;

          for (let n = 0; n < 3000; n+=30) {
            for (let i = 0; i < 3000; i+=30) {
              let xpos, ypos;
              
              let a = Math.sin(angle + n - cy) + Math.cos(angle + 2*Math.PI * n - cx);
              let b = Math.cos(angle + n + cy) + Math.sin(angle + 2*Math.PI * n + cx);
              cx = a;
              cy = b;

              xpos = math.mapRange(cx, -2.5, 2.5, 0, width);
              ypos = math.mapRange(cy, -2.5, 2.5, 0, height)

              context.save();
              context.globalAlpha = params.globalAlpha;
              context.translate(xpos, ypos);
      
              context.beginPath();
              context.fillStyle = pointColor;
              context.strokeStyle = pointColor;
              
              context.arc(0, 0, params.pointRadius, 0, 2*Math.PI);
              context.fill();
              context.restore();
            }
          }
          break;
        case 1:
          const T = 2 * Math.PI * t;

          for (let n = 0; n < 3000; n+=30) {
            for (let i = 0; i < 3000; i+=30) {
              let xpos, ypos;
              let a = Math.sin(T + n + cx) + Math.cos(T + 2*Math.PI * n + cx);
              let b = Math.cos(T + n + cx) + Math.sin(T + 2*Math.PI * n + cx);
              cx = a;
              cy = b;

              xpos = math.mapRange(cx, -2.5, 2.5, 0, width);
              ypos = math.mapRange(cy, -2.5, 2.5, 0, height)

              context.save();
              context.globalAlpha = params.globalAlpha;
              context.translate(xpos, ypos);
      
              context.beginPath();
              context.fillStyle = pointColor;
              context.strokeStyle = pointColor;
              
              context.arc(0, 0, params.pointRadius, 0, 2*Math.PI);
              context.fill();
              context.restore();
            }
          }
          t += .005;
          break;
        case 2:
          let r = 2 * Math.PI / 20 * t;

          for (let n = 0; n < 3000; n+=30) {
            for (let i = 0; i < 3000; i+=30) {
              let a = Math.sin(n + cy) + Math.sin(r*n + cx);
              let b = Math.cos(n + cy) + Math.cos(r*n + cx);
              cx = a;
              cy = b;

              xpos = math.mapRange(cx, -2.5, 2.5, 0, width);
              ypos = math.mapRange(cy, -2.5, 2.5, 0, height)

              context.save();
              context.globalAlpha = params.globalAlpha;
              context.translate(xpos, ypos);
      
              context.beginPath();
              context.fillStyle = pointColor;
              context.strokeStyle = pointColor;
              
              context.arc(0, 0, params.pointRadius, 0, 2*Math.PI);
              context.fill();
              context.restore();
            }
          }
          t += .001;
          break;
        default:
      }
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();

  pane.addInput(params, 'backgroundColor').on('change', () => {
    clearCanvas = true;
  });
  pane.addInput(params, 'pointColor').on('change', () => {
    clearCanvas = true;
  });
  pane.addInput(params, 'globalAlpha', { min:0, max:1.0, step:.01 }).on('change', () => {
    clearCanvas = true;
  });

  pane.addButton({ title: 'Clear Canvas' }).on('click', () => {
    clearCanvas = true;
  });  

  pane.addButton({ title: 'Toggle Grid/Clifford/Anim'}).on('click', () => {
    params.displayMode = (params.displayMode + 1) % 3;
    gridFolder.hidden = (params.displayMode != 0);
    cliffordFolder.hidden = (params.displayMode != 1);
    animFolder.hidden = (params.displayMode != 2);
    t = 0;
    clearCanvas = true;
  });
  const gridFolder = pane.addFolder( { title:'Grid Animation', hidden:false });
  const cliffordFolder = pane.addFolder( { title:'Clifford Attractor', hidden:true });
  const animFolder = pane.addFolder( { title:'Misc Animations', hidden:true });

  pane.addButton({ title: 'Load Settings' }).on('click', () => {
    const preset = localStorage.getItem('sketch-preset');
    if (preset) pane.importPreset(JSON.parse(preset));
    else alert('no preset found');
    clearCanvas = true;
  });

  pane.addButton({ title: 'Save Settings' }).on('click', () => {
    localStorage.setItem('sketch-preset', JSON.stringify(pane.exportPreset()));
  });  


  let folder;
  folder = gridFolder.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt:'butt', round:'round', square:'square'}});
  folder.addInput(params, 'cols', { min:2, max:50, step:1 });
  folder.addInput(params, 'rows', { min:2, max:50, step:1 });
  folder.addInput(params, 'scaleMin', { min:2, max:100 });
  folder.addInput(params, 'scaleMax', { min:2, max:100 });

  folder = gridFolder.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });

  folder = cliffordFolder.addFolder({ title: 'Attractor Variables' });
  folder.addInput(params, 'a', { min:-3, max:3, step:.01 });
  folder.addInput(params, 'b', { min:-3, max:3, step:.01 });
  folder.addInput(params, 'c', { min:-3, max:3, step:.01 });
  folder.addInput(params, 'd', { min:-3, max:3, step:.01 });
  folder.addInput(params, 'pointRadius', { min:0, max:7, step:.01 });
  folder.addInput(params, 'maxT', { min:0, max:10, step:.01 });

  folder = cliffordFolder.addFolder({ title: 'Examples' });
  let samples = folder.addBlade({ 
    view: 'list', 
    label: 'scene', 
    options: params.sampleScenes, 
    value: params.sampleScenes[0] 
  }).on('change', (e) => {
    let val = JSON.parse(e.value);
    if (val == '') return;
    params.a = val.a;
    params.b = val.b;
    params.c = val.c;
    params.d = val.d;
    pane.refresh();
    clearCanvas = true;
  });

  animFolder.addInput(params, 'pointRadius', { min:0, max:7, step:.01 });
  animFolder.addInput(params, 'selectedAnim', { min:0, max:2, step:1 }).on('change', () => {
    t = 0;
    cx = params.x;
    cy = params.y;
    clearCanvas = true;
  });;

  pane.on('change', (e) => {
    for(let i = 0; i < params.sampleScenes.length; i++) {
      let s = JSON.parse(params.sampleScenes[i].value);
      if (s == '') continue;
      if (Math.round(params.a*10000) == Math.round(s.a*10000) && 
          Math.round(params.b*10000) == Math.round(s.b*10000) && 
          Math.round(params.c*10000) == Math.round(s.c*10000) && 
          Math.round(params.d*10000) == Math.round(s.d*10000)) {
        samples.value = params.sampleScenes[i].value;
        pane.refresh();
      }
    }
  });
};

createPane();
canvasSketch(sketch, settings);

