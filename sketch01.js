const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.strokeStyle = 'white'
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01

    const size = width * .10
    const gap = width * .03
    const ix = width * .17
    const iy = width * .17
    const off = width * 0.02
    let x, y
    for (let i = 0; i < 5; i++) {
      x = ix + (size + gap) * i
      for (let j = 0; j < 5; j++) {
        y = iy + (size + gap) * j;
        context.beginPath();
        context.rect(x, y, size, size);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, size - off, size - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
