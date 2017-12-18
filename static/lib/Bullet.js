import Entity from './Entity';
export default class Bullet extends Entity {
  constructor(x, y, velocity, radius, color, ctx) {
    super(x, y, velocity, radius, color, ctx, 'bullet');
    this.timer = 0;
    this.mass = 0.1;
  }
  update() {
    super.update();
    this.timer++;
    if (this.timer > 50) {
      this.active = false;
    }
  }
}
