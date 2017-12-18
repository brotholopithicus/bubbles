const Entity = require('./Entity');
const Bullet = require('./Bullet');
const Missile = require('./Missile');

const VMAX = 300;

class Player extends Entity {
  constructor(id, x, y, velocity = { x: 0, y: 0 }, radius = 50) {
    super(x, y, velocity, radius, VMAX);
    this.id = id;
    this.angle = 0;
    this.turnRate = 0.04;
    this.bullets = [];
    this.health = 1000;
    this.alive = true;
    this.respawning = false;
  }
  respawn() {
    this.x = Math.random() * 800 - this.radius;
    this.y = Math.random() * 600 - this.radius;
    this.health = 1000;
    this.alive = true;
    this.respawning = false;
  }
  updateOnInput(keysDown) {
    if (keysDown.up) {
      this.velocity = {
        x: -Math.sin(this.angle),
        y: Math.cos(this.angle)
      }
    }
    if (keysDown.down) {
      this.velocity = {
        x: Math.sin(this.angle),
        y: -Math.cos(this.angle)
      }
    }
    if (!keysDown.up && !keysDown.down) {
      this.velocity = { x: 0, y: 0 };
    }
    if (keysDown.right) {
      this.angle += this.turnRate;
    }
    if (keysDown.left) {
      this.angle -= this.turnRate;
    }
    if (keysDown.space) {
      const gunPos = this.radius * 1.75;
      const x = this.x - gunPos * Math.sin(this.angle);
      const y = this.y + gunPos * Math.cos(this.angle);
      const velocity = {
        x: -Math.sin(this.angle),
        y: Math.cos(this.angle)
      }
      this.bullets.push(new Bullet(x, y, velocity, 5, this.id));
    }
    if (keysDown.missile) {
      const gunPos = this.radius * 1.75;
      const x = this.x - gunPos * Math.sin(this.angle);
      const y = this.y + gunPos * Math.cos(this.angle);
      const velocity = {
        x: -Math.sin(this.angle),
        y: Math.cos(this.angle)
      }
      this.bullets.push(new Missile(x, y, velocity, 15, this.id));
    }
  }
  update(entities = [], friction = 0) {
    super.update(entities, friction);
    this.bullets = this.bullets.filter(bullet => bullet.active);
    this.bullets.forEach(bullet => bullet.update(entities));
    if (this.health <= 0 && !this.respawning) {
      this.respawning = true;
      this.alive = false;
      setTimeout(() => {
        this.respawn();
      }, 2000);
    }
  }
}

module.exports = Player;
