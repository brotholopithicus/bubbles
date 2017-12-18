const { resolveCollision, distance } = require('./utils');

class Entity {
  constructor(x, y, velocity, radius, speed) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.mass = 1;

    this.speed = speed;
    this.active = true;

    this.lastUpdateTime = 0;
    this.deltaTime = 0;
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
  update(entities = [], friction = 0) {
    const currentTime = (new Date()).getTime();

    if (this.lastUpdateTime === 0) {
      this.deltaTime = 0;
    } else {
      this.deltaTime = currentTime - this.lastUpdateTime;
    }

    this.x += this.velocity.x * (this.deltaTime / 1000) * this.speed;
    this.y += this.velocity.y * (this.deltaTime / 1000) * this.speed;

    this.velocity.x = this.velocity.x - (this.velocity.x * friction);
    this.velocity.y = this.velocity.y - (this.velocity.y * friction);

    this.lastUpdateTime = currentTime;
  }
}
module.exports = Entity;
