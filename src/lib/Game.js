import {
  randIntFromRange,
  randomColor
} from './utils';

import addListeners from './Input';

import Entity from './Entity';
import Player from './Player';
import Draw from './Draw';

import bgImage from '../assets/water.png';
import explosionImage from '../assets/explosion.png';
import explosionSound from '../assets/explosion.mp3';

export default class Game {
  constructor(ctx, socket) {
    this.ctx = ctx;
    this.socket = socket;
    this.self = null;
    this.players = [];
    this.keyboardState = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    }
    addListeners(this.keyboardState);
    this.animationFrameId = 0;
    this.drawing = new Draw(this.ctx);
  }
  init() {
    this.socket.on('update', (data) => {
      this.receiveGameState(data);
    });
    this.socket.emit('player-join');
    this.bgImage = this.drawing.createImage(bgImage);
    this.explosionImage = this.drawing.createImage(explosionImage);
    this.explosionSound = new Audio(explosionSound);
  }
  receiveGameState(data) {
    this.self = data.self;
    this.players = data.players;
  }
  animate() {
    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
  }
  stopAnimation() {
    cancelAnimationFrame(this.animationFrameId);
  }
  update() {
    this.socket.emit('player-action', this.keyboardState);
    this.draw();
    this.animate();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawing.drawBackground(this.bgImage);
    if (this.self) {
      const { x, y, radius, angle } = this.self;
      if (this.self.alive) {
        this.drawing.drawPlayer(x, y, radius, angle, '#60ac49');
      } else {
        this.drawing.drawImage(this.explosionImage, x, y, radius, angle);
        this.explosionSound.play();
      }
      this.self.bullets.forEach(bullet => this.drawing.drawBullet(bullet.x, bullet.y, bullet.radius, '#1953e7'));
      this.players.forEach(({ x, y, radius, angle, bullets, alive }) => {
        if (alive) {
          this.drawing.drawPlayer(x, y, radius, angle, '#dd7042');
        } else {
          this.drawing.drawImage(this.explosionImage, x, y, radius, angle);
          this.explosionSound.play();
        }
        bullets.forEach(bullet => this.drawing.drawBullet(bullet.x, bullet.y, bullet.radius, '#f12c11'));
      });
    }
  }
}
