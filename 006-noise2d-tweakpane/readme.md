# Creative Coding

## Setup

Download [Node.js](https://nodejs.org/en/download/).

Run the following commands:

``` bash
node -v
npm -v

npm install canvas-sketch-cli -g
npm install canvas-sketch-util
npm install @ffmpeg-installer/ffmpeg --global
npm i tweakpane
```

## Settings

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const settings = {
      dimensions: 'A4',
      pixelsPerInch: 300,
      orientation: 'landscape'
    }
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Usage and Exporting Artwork

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    canvas-sketch sketch-1 --open --output=output --stream=gif
    canvas-sketch sketch-2 --open --output=output --stream=gif
    canvas-sketch sketch-3 --open --output=output --stream=gif
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - save frame: ctrl-s
  - save animation: ctrl-shift-s

  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md
  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#ffmpeg-streaming
  - https://github.com/mattdesl/canvas-sketch-util

  - http://paulbourke.net/fractals/clifford/
  - https://c1.staticflickr.com/1/622/33220015935_8f4d4bb6fe_o.png
  - https://softologyblog.wordpress.com/2017/03/04/2d-strange-attractors/

  - http://web.archive.org/web/20160530124230/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
  - https://www.shadertoy.com/view/Xd3GRf
  - https://www.youtube.com/watch?v=Lv9gyZZJPE0
  - https://cocopon.github.io/tweakpane/
    