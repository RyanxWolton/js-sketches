const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({width, height}) => {
  const agents = [];
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i]
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j]
        const distance = agent.pos.getDistance(other.pos)
        if (distance < 200) {
          context.lineWidth = math.mapRange(distance, 0, 200, 6, .5)
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      // agent.wrap(width, height);
      agent.bounce(width, height);
    })
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
  
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  wrap(width, height) {
    if (this.pos.x > width) {
      this.pos.x = 0
    } else if (this.pos.x < 0) {
      this.pos.x = width
    } else if (this.pos.y > height) {
      this.pos.y = 0
    } else if (this.pos.y < 0) {
      this.pos.y = height
    }
  }

  drawLine(context, otherAgent) {
    context.beginPath()
    context.rect()
  }
}