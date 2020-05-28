//set up server
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});

//set up socket
//somone connects
io.on("connection", (socket) => {
  //alert in the console what is happening
  console.log("user connected");
  //we then emit a message on that event
  socket.emit("message", { manny: "hey how are you?" });
  //we wait for another event from the client and whatever data is passed we print it
  socket.on("another event", (data) => {
    console.log(data);
  });
});
