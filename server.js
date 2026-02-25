const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));

const SECRET_KEY = "mySuperSecretKey123";

/* ===============================
   MONGODB
================================ */
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

/* ===============================
   REGISTER
================================ */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashedPassword });

  res.json({ success: true });
});

/* ===============================
   LOGIN
================================ */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.json({ success: false });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ success: false });

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ success: true, token });
});

/* ===============================
   SOCKET.IO
================================ */

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected 🔥");

  socket.on("join", (username) => {
    socket.username = username;
    onlineUsers[username] = socket.id;

    io.emit("user-list", Object.keys(onlineUsers));
    io.emit("receive-message", `🔵 ${username} joined the chat`);
  });

  socket.on("send-message", ({ to, message }) => {

    // PRIVATE MESSAGE
    if (to && onlineUsers[to]) {
      io.to(onlineUsers[to]).emit("receive-message", {
        username: socket.username,
        message: "(Private) " + message
      });

      return;
    }

    // PUBLIC MESSAGE
    io.emit("receive-message", {
      username: socket.username,
      message: message
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      delete onlineUsers[socket.username];
      io.emit("user-list", Object.keys(onlineUsers));
      io.emit("receive-message", `🔴 ${socket.username} left the chat`);
    }
  });
});
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000 ");
});