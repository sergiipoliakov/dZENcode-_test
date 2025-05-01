import { Server } from 'socket.io';

let activeConnections = 0;

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    activeConnections++;
    io.emit('updateCount', activeConnections);
    console.log(`Client connected. Total: ${activeConnections}`);

    socket.on('disconnect', () => {
      activeConnections--;
      io.emit('updateCount', activeConnections);
      console.log(`Client disconnected. Total: ${activeConnections}`);
    });
  });
};