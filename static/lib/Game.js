import {
  randIntFromRange,
  randomColor
} from './utils';
import addListeners from './Input';
import Entity from './Entity';
import Player from './Player';

export default class Game {
  constructor(ctx, socket) {
    this.ctx = ctx;
    this.socket = socket;
    this.entities = [];
    this.friction = 0.001;
    this.keyboardState = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    }
    addListeners(this.keyboardState);
  }
  init() {
    this.entities = [...Array(50).keys()].map(k => {
      const r = randIntFromRange(10, 50);
      const x = randIntFromRange(0, this.ctx.canvas.width - r);
      const y = randIntFromRange(0, this.ctx.canvas.height - r);
      const vx = randIntFromRange(2, 4);
      const vy = randIntFromRange(2, 4);
      const velocity = { x: vx, y: vy };
      const color = randomColor();
      return new Entity(x, y, velocity, r, color, this.ctx);
    });
    this.entities.push(new Player(500, 500, { x: 0, y: 0 }, 100, '#4fc14f', this.ctx));
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.entities = this.entities.filter(entity => entity.active);
    this.entities.forEach(entity => entity.update(this.entities));
    this.entities = this.entities.map(entity => {
      const { x, y } = entity.velocity;
      const velocity = {
        x: x - (x * this.friction),
        y: y - (y * this.friction)
      }
      return Object.assign(entity, { velocity });
    });
  }
  update() {
    this.socket.emit('player-action', {})
  }
}
