//set up server
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/");
});

//namespace
const tech = io.of("/tech");

tech.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    tech.in(data.room).emit("message", `New user joined ${data.room} room`);
  });
  socket.on("message", (data) => {
    console.log(`message: ${data.msg}`);
    tech.emit("message", data.msg);
  });
  socket.on("another event", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    tech.emit("message", "user disconnected");
  });
});
