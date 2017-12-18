import { lightenDarkenColor } from './utils';
import addListeners from './Input';
import Entity from './Entity';
import Bullet from './Bullet';

export default class Player extends Entity {
  constructor(x, y, velocity = { x: 0, y: 0 }, radius = 50, color = '#ff0000', ctx) {
    super(x, y, velocity, radius, color, ctx);
    this.angle = 0;
    this.turnRate = 0.09;
    this.speed = 10;
    this.keysDown = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    }
    addListeners(this.keysDown);
  }
  update(entities = []) {
    super.update(entities);
    if (this.keysDown.up) {
      this.velocity = {
        x: -Math.sin(this.angle) * this.speed,
        y: Math.cos(this.angle) * this.speed
      }
    }
    if (this.keysDown.down) {
      this.velocity = {
        x: Math.sin(this.angle) * this.speed,
        y: -Math.cos(this.angle) * this.speed
      }
    }
    if (!this.keysDown.up && !this.keysDown.down) {
      this.velocity = { x: 0, y: 0 };
    }
    if (this.keysDown.right) {
      this.angle += this.turnRate;
    }
    if (this.keysDown.left) {
      this.angle -= this.turnRate;
    }
    if (this.keysDown.space) {
      const gunPos = this.radius * 1.5;
      const x = this.x - gunPos * Math.sin(this.angle);
      const y = this.y + gunPos * Math.cos(this.angle);
      entities.push(new Bullet(x, y, { x: -Math.sin(this.angle) * 25, y: Math.cos(this.angle) * 25 }, 5, 'red', this.ctx));
    }
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.fillStyle = lightenDarkenColor(this.color, -50);
    this.ctx.fillRect(-10, 0, 20, this.radius * 1.5);
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.fillStyle = lightenDarkenColor(this.color, 50);
    this.ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
