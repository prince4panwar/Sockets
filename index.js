const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("from_client", (arg) => {
    console.log(arg);
  });

  setInterval(() => {
    socket.emit("from_server", "from server to client : hello client");
  }, 1000);
});

app.use("/", express.static(__dirname + "/public"));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
