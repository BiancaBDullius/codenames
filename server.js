"use strict";
const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDatabase = require('./src/database/index.js');

const port = process.env.PORT || 5000;
app.set("port", port);

const server = http.createServer(app);

connectDatabase.then(r => {
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("API rodando na porta " + port);
})
.catch(e => console.log("Erro de conexão com o banco", e));


function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "codenames" + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "codenames " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

const io = new Server(server, { cors: { origin: '*' } });

const onlinePlayers = new Map();

io.on('connection', (socket) => {
  console.log("---------- IO CONNECTION --------")
  global.gameSocket = socket;
  
  socket.on("add-player", (session) => {
    console.log("---------- EVENDO CONNECT DISPARADO --------")
    onlinePlayers.set({id: autoincrement(), session}, socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log("---------- EVENDO DISCONNECT DISPARADO - Tentando reconectar --------")
    socket.socket.reconnect();
    // const playerId = getPlayerIdBySocketId(socket.id);
    // if (playerId) {
    //   onlinePlayers.delete(playerId);
    // }
  });

  socket.on('change-game', (session) => {
    console.log("---------- EVENDO CHANGE-GAME DISPARADO --------")
    onlinePlayers.forEach((socketId, playerData) => {
      if (playerData.session === session) {
       
        io.to(socketId).emit("change-game", { message: 'get-game' });
      }
    });
  });
});
global.ids = 0;
// Helper function to get playerId by socketId from the onlinePlayers Map
function autoincrement() {
  global.ids+=1;
  return global.ids
}