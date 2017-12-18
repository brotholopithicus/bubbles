import Game from './Game';

const canvas = document.querySelector('canvas#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const socket = io();
const game = new Game(ctx, socket);

game.init();
game.animate();
