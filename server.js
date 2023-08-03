"use strict";
const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDatabase = require('./src/database/index.js');

const port = process.env.PORT || 5000;
app.set("port", port);

const server = http.createServer(app);

connectDatabase.then(r => {

  const io = new Server(server, {
    pingInterval: 24 * 60 * 60 * 1000,
    pingTimeout: 3 * 24 * 60 * 60 * 1000,
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const onlinePlayers = new Map();

io.on('connection', (socket) => {
  global.gameSocket = socket;
  
  socket.on("add-player", (session) => {
    onlinePlayers.set({id: autoincrement(), session}, socket.id);
  });
  
  socket.on('disconnect', (disconnected) => {
    console.log('Return of disconnection ------> ', disconnected)
    // const playerId = getPlayerIdBySocketId(socket.id);
    // if (playerId) {
    //   onlinePlayers.delete(playerId);
    // }
  });

  socket.on('change-game', (session) => {
    onlinePlayers.forEach((socketId, playerData) => {
      if (playerData.session === session) {
       
        io.to(socketId).emit("get-game", { message: 'get-game' });
      }
    });
  });
});
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


global.ids = 0;
// Helper function to get playerId by socketId from the onlinePlayers Map
function autoincrement() {
  global.ids+=1;
  return global.ids
}