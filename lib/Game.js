const { distance, resolveCollision, randIntFromRange } = require('./utils');
const Entity = require('./Entity');
const Player = require('./Player');

class Game {
  constructor() {
    this.clients = new Map();
    this.players = new Map();
    this.friction = 0.05;
  }
  getPlayers() {
    return Array.from(this.players.values());
  }
  getProjectiles(player) {
    return this.getPlayers()
      .filter(p => p !== player)
      .map(p => p.bullets)
      .reduce((a, b) => (a.concat(b)), []);
  }
  addNewPlayer(socket) {
    this.clients.set(socket.id, socket);
    this.players.set(socket.id, new Player(socket.id, Math.random() * 800, Math.random() * 600))
  }
  updatePlayerOnInput(id, data) {
    const player = this.players.get(id);
    if (player) player.updateOnInput(data);
  }
  removePlayer(id) {
    this.clients.delete(id);
    this.players.delete(id);
  }
  sendState() {
    Array.from(this.clients.values()).forEach(client => {
      const state = {
        self: this.players.get(client.id),
        players: Array.from(this.players.values()).filter(p => p.id !== client.id)
      }
      if (typeof client === 'object') {
        client.emit('update', state);
      }
    });
  }
  update() {
    const players = this.getPlayers();
    players.forEach(player => {
      players.filter(p => p !== player)
        .concat(this.getProjectiles(player))
        .forEach(entity => {
          const d = distance(player.x, player.y, entity.x, entity.y);
          if (d <= player.radius + entity.radius) {
            resolveCollision(player, entity);
            if (player.health && entity.damage) player.health -= entity.damage;

          }
        });
      player.update(players, this.friction)
    });
  }
}

module.exports = Game;
