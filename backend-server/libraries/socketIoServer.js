const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');

const connectedUsers = {};

module.exports = http => {
  const ioConnection = socketIO(http, { pingTimeout: 10000, pingInterval: 20000 });

  return ioConnection
    .use((socket, next) => {
      const {
        handshake: {
          query: { token }
        }
      } = socket;

      if (token) {
        const decodedToken = jwt.decode(token);

        if (!decodedToken) {
          return;
        }

        connectedUsers[socket.id] = {
          username: decodedToken.username,
          name: decodedToken.fullname
        };
      }

      next();
    })
    .on('connection', socket => {
      ioConnection.emit('update-online-users-no', getOnlineUsers());

      socket.on('disconnect', () => {
        delete connectedUsers[socket.id];

        ioConnection.emit('update-online-users-no', getOnlineUsers());
      });

      socket.on('current-online-users', callback => {
        callback(getOnlineUsers());
      });
    });
};

function getOnlineUsers() {
  const users = Object.values(connectedUsers).reduce((acc, value) => {
    acc[value.username] = value.name;
    return acc;
  }, {});

  return users;
}
