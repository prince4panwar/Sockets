const socket = io();

let btn = document.getElementById("btn");
let inputMsg = document.getElementById("inputMsg");
let msgList = document.getElementById("msglist");

btn.addEventListener("click", () => {
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
});

socket.on("msg_receive", (data) => {
  console.log("prince", data);
  let listMsg = document.createElement("li");
  listMsg.innerText = data.msg;
  msgList.appendChild(listMsg);
});
