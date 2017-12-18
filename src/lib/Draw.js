import { lightenDarkenColor } from './utils';

export default class Draw {
  constructor(ctx) {
    this.ctx = ctx;
  }
  createImage(src, width, height) {
    const img = new Image(width, height);
    img.src = src;
    return img;
  }
  drawBackground(img) {
    const pattern = this.ctx.createPattern(img, 'repeat');
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  drawPlayer(x, y, radius, angle, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.fillStyle = lightenDarkenColor(color, -50);
    this.ctx.fillRect(-10, 0, 20, radius * 1.5);
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.fillStyle = lightenDarkenColor(color, 50);
    this.ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBullet(x, y, radius, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawImage(src, x, y, radius, angle) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.drawImage(src, 0, 0, radius, radius);
    this.ctx.restore();
  }
}
