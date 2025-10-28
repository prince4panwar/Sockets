const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const connect = require("./config/database");
const Chat = require("./models/Chat");

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.roomId);
  });

  socket.on("msg_send", async (data) => {
    // io.emit("msg_receive", data);
    // socket.emit("msg_receive", data);
    // socket.broadcast.emit("msg_receive", data);

    const chat = await Chat.create({
      roomId: data.roomId,
      userId: data.username,
      content: data.msg,
    });
    io.to(data.roomId).emit("msg_receive", data);
  });
});

app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomId", async (req, res) => {
  const chats = await Chat.find({ roomId: req.params.roomId }).select(
    "content userId"
  );
  res.render("index.ejs", {
    id: req.params.roomId,
    chats: chats,
  });
});

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connect();
  console.log("mongo db connected");
});
