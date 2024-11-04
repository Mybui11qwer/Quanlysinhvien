// IOConnection.js
const { Server } = require('socket.io');

class IOConnection {
  constructor(server) {
    this.io = new Server(server);

    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      // You can handle more socket events here
    });
  }
}

module.exports = IOConnection;
