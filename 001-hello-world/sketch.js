const sketch = {
  id: 'sketch',

  addCss: function() {
    let id = this.id;
    let div = document.createElement('div');
    div.innerHTML = `     
    <style>
    .${id} {background:transparent;}
    .${id} .main, .${id} canvas { width:100%; max-width:600px; margin: 0 auto; }
    .${id} .main {background:#fff; border:1px solid #444; padding:1em; text-align:center; }
    .${id} canvas {border: 1px solid #ccc; }
    </style>
    `;
    document.body.appendChild(div);
  },

  draw: function(canvas, context) {
    context.fillStyle = 'blue';
    // context.fillRect(100, 100, 400, 400);
  
    context.lineWidth = 4;
    // context.beginPath();
    // context.rect(100, 100, 400, 400);
    // context.stroke();
  
    // context.beginPath();
    // context.arc(300, 300, 100, 0, 2*Math.PI);
    // context.stroke();
  
    const width = 60;
    const height = 60;
    const gap = 20;
    let x, y;

    for (let i=0; i<5; i++) {
      for (let j=0; j<5; j++) {
        x = 100 + (width + gap) * i;
        y = 100 + (height + gap) * j;
  
        context.beginPath();
        context.rect(x, y, width, height);
        context.stroke();
  
        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x+8, y+8, width-16, height-16);
          context.stroke();
        }
      }
    }
  },

  main: function() {
    this.addCss();
    let that = this;
    let id = this.id;

    document.querySelectorAll(`.${id}`).forEach( wrapper => {
      wrapper.innerHTML = `<div class="main"><canvas width="600" height="600"></canvas></div>`;

      let canvas = wrapper.querySelector(`canvas`);
      let context = canvas.getContext('2d');
  
      that.draw(canvas, context);
    });
  }
};

window.addEventListener('load', function() { 
  sketch.main(); 
}, false);
