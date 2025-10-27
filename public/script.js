const socket = io();

setInterval(() => {
  socket.emit("from_client", "from client to server : hello server");
}, 1000);

socket.on("from_server", (arg) => {
  console.log(arg);
});
