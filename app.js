const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
  console.log("connected");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
