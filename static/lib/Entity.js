import {
  resolveCollision,
  distance
} from './utils';

export default class Entity {
  constructor(x, y, velocity, radius, color, ctx, type = 'orb') {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.mass = 1;
    this.color = color;
    this.ctx = ctx;
    this.active = true;
    this.type = type;
  }
  inBounds() {
    return this.x - this.radius >= 0 &&
      this.x + this.radius <= this.ctx.canvas.width &&
      this.y - this.radius >= 0 &&
      this.y + this.radius <= this.ctx.canvas.height;
  }
  clamp() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= this.ctx.canvas.height) {
      this.velocity.y = -this.velocity.y;
    }
  }
  update(entities = []) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
    this.clamp();
    entities.filter(entity => entity !== this)
      .forEach(entity => {
        if (distance(this.x, this.y, entity.x, entity.y) - (this.radius + entity.radius) <= 0) {
          resolveCollision(this, entity);
        }
      });
    if (this.velocity.x > 25) this.velocity.x = 25;
    if (this.velocity.y > 25) this.velocity.y = 25;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
