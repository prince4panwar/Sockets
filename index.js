const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("msg_send", (data) => {
    io.emit("msg_receive", data);
    // socket.emit("msg_receive", data);
    // socket.broadcast.emit("msg_receive", data);
  });
});

app.use("/", express.static(__dirname + "/public"));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
