const { distance, rotate } = require('./utils');
const Bullet = require('./Bullet');

const toRad = (deg) => deg * Math.PI / 180;
class Missile extends Bullet {
  constructor(x, y, velocity, radius, owner, damage, angle = 0) {
    super(x, y, velocity, radius, owner, damage);
    this.angle = angle;
    this.lastUpdateTicks = 0;
  }
  update(entities = []) {
    super.update(entities);
    const target = entities
      .filter(t => t.id && t.id !== this.owner && t.alive)
      .sort((a, b) => {
        return distance(this.x, this.y, b.x, b.y) - distance(this.x, this.y, a.x, a.y);
      })[0];
    this.lastUpdateTicks++;
    if (target && this.lastUpdateTicks > 20) {
      this.angle = Math.atan2(target.y - this.y, target.x - this.x);
      this.velocity.x += Math.cos(this.angle);
      this.velocity.y += Math.sin(this.angle);
      this.lastUpdateTicks = 0;
    }
  }
}


module.exports = Missile;
