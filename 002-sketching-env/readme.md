# Creative Coding

## Setup

Download [Node.js](https://nodejs.org/en/download/).

Run the following commands:

``` bash
node -v
npm -v

npm install canvas-sketch-cli -g
npm install canvas-sketch-util
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
    canvas-sketch my_new_sketch --new --open
    canvas-sketch sketch-1 --open --output=output
    canvas-sketch sketch-2 --open --output=output --stream=gif
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - save frame: ctrl-s
  - save animation: ctrl-shift-s

  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md
  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#ffmpeg-streaming
  - https://github.com/mattdesl/canvas-sketch-util

