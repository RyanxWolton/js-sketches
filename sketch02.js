const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const color = require('canvas-sketch-util/color');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const numArcs = 5000
  const arcSlice = math.degToRad(360 / numArcs)
  const arcs = []
  const radius = width * .3;
  for (let i = 0; i < numArcs; i ++) { 
    /**
     * Arcs
    */
    const rotation = arcSlice * i;
    const randomRadius = radius * random.range(.1, 1.3)
    // const strokeColor = color.offsetHSL(baseColor, randomRadius / 2, 0, 0)
    arcs.push(new Arc(randomRadius, rotation, arcSlice))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // const cx = width * .5;
    // const cy = height * .5;
    const w = width * .01;
    const h = height * .1;
    let x, y;
    const numShapes = 1024;
    // const radius = width * .3;

    // context.fillStyle = 'white';

    // const numArcs = 5000
    // const arcSlice = math.degToRad(360 / numArcs)
    // for (let i = 0; i < numArcs; i ++) { 
    //   /**
    //    * Arcs
    //   */
    //   const rotateAngle = arcSlice * i;
    //   const randomRadius = radius * random.range(.1, 1.3)
    //   // const strokeColor = color.offsetHSL(baseColor, randomRadius / 2, 0, 0)

    //   context.strokeStyle = 'white'
    //   context.save();
    //   context.translate(cx, cy);
    //   context.rotate(-rotateAngle);
    //   // context.lineWidth = random.range(5, 18);
    //   context.beginPath();
    //   context.arc(0, 0, randomRadius, arcSlice, arcSlice * random.range(1,48));
    //   context.stroke()
    //   context.restore();
    // }

    arcs.forEach(arc => {
      arc.draw(context, width, height);
      arc.update();
    })
    
    // const clockSlice = math.degToRad(360 / numShapes)
    // for (let i = 0; i < numShapes; i ++) {
    //   const baseColor = 'aquamarine'
    //   /**
    //    * Clock Shape
    //   */
    //   const rotateAngle = clockSlice * i;
    //   x = cx + radius * Math.sin(rotateAngle)
    //   y = cy + radius * Math.cos(rotateAngle)
    //   const fillColor = color.offsetHSL(baseColor, x / 2, 0, 0)
    //   context.fillStyle = 'grey';
    //   context.save();
    //   context.translate(x, y);
    //   context.rotate(-rotateAngle);
    //   // context.scale(random.range(.1, 1), random.range(-2, 2))
    //   context.beginPath();
    //   context.rect(-w * .5, random.range(0, -h * 2), 1, h);
    //   context.fill();
    //   context.restore();

    // }
  };
};

canvasSketch(sketch, settings);

class Arc {
  constructor(radius, rotation, slice) {
    this.radius = radius;
    this.rotation = rotation;
    this.sliceStart = slice * random.range(1,-5)
    this.sliceEnd = slice * random.range(1,48)
    this.vel = .5 / radius
  }

  draw(context, width, height) {
    context.strokeStyle = 'white'
    context.save();
    context.translate(width * .5, height * .5);
    context.rotate(-this.rotation);
    // context.lineWidth = random.range(5, 18);
    context.beginPath();
    context.arc(0, 0, this.radius, this.sliceStart, this.sliceEnd);
    context.stroke()
    context.restore();
  }

  update() {
    this.rotation += this.vel 
  }
}
