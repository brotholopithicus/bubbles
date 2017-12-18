require('dotenv').config();

const http = require('http');
const path = require('path');
const express = require('express');

const Game = require('./lib/Game');

const PORT = process.env.PORT;
const FPS = 60;

const app = express();

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.use(require('morgan')('dev'));

const io = require('socket.io')(server);
const game = new Game();

io.on('connection', (socket) => {
  socket.on('player-join', () => {
    game.addNewPlayer(socket);
  });
  socket.on('player-action', (data) => {
    game.updatePlayerOnInput(socket.id, data);
  });
  socket.on('disconnect', () => {
    game.removePlayer(socket.id);
  });
});

setInterval(() => {
  game.update();
  game.sendState();
}, 1000 / FPS);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
