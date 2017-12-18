const Entity = require('./Entity');

const VMAG = 1200;
class Bullet extends Entity {
  constructor(x, y, velocity, radius, owner, damage = 5) {
    super(x, y, velocity, radius, VMAG);
    this.timer = 0;
    this.mass = 0.1;
    this.damage = damage;
    this.owner = owner;
  }
  inBounds() {
    return this.x - this.radius >= 0 &&
      this.x + this.radius <= this.xmax &&
      this.y - this.radius >= 0 &&
      this.y + this.radius <= this.ymax;
  }
  update(entities = []) {
    super.update(entities);
    this.timer++;
    this.active = this.timer < 50;
  }
}

module.exports = Bullet;
