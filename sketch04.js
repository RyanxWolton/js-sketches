const Tweakpane = require('tweakpane');
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  frequency: 1
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;
    const gridw = width * .8;
    const gridh = height * .8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * .5;
    const margy = (height - gridh) * .5;

    context.fillStyle = 'black';

    for (let i = 0; i < numCells; i ++) {
      const col = i % cols;
      const row = Math.floor(i / cols)
      const x = cellw * col; 
      const y = cellh * row; 
      const w = cellw * .8;
      const h = cellh * .8;

      const n = random.noise2D(x + frame * 10, y, 0.001);
      const angle = n * Math.PI * .2;
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();

      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * .5, cellh * .5);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -.5, 0);
      context.lineTo(w * .5, 0);
      context.stroke();

      context.restore();
    }
  };
};


const createPane = () => {
  const pane = new Tweakpane.Pane();

  const gridFolder = pane.addFolder({
    title: 'Grid'
  });
  gridFolder.addBinding(params, 'frequency');
};
  
canvasSketch(sketch, settings);
createPane();