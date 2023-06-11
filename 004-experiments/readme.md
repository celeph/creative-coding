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
    canvas-sketch sketch-2 --open --output=output
    canvas-sketch sketch-3 --open --output=output
    canvas-sketch sketch-4 --open --output=output --stream=gif
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - save frame: ctrl-s
  - save animation: ctrl-shift-s

  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md
  - https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#ffmpeg-streaming
  - https://github.com/mattdesl/canvas-sketch-util

## Tips

To edit a number of matching variables or text strings simultaneously,

  1) select a string you want to edit
  2) Ctrl-Shift-L selects all matches
  3) edit and all matches get updated as well

