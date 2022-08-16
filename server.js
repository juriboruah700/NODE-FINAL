const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3030",
  },
});

const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  console.log("YAHAN HAI 0000");
  socket.on("join-room", (roomId, userId) => {
    console.log("YAHAN HAI 1111: ", { roomId }, { userId });
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
    // messages
    socket.on("message", (message) => {
      //send message to the same room
      io.to(roomId).emit("createMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("userDisconnect chala: ", userId);
      socket.to(roomId).emit("user-disconnected", userId);
      //socket.disconnect();
    });
  });
});

server.listen(process.env.PORT || 3030, () =>
  console.log(`Server running on port ${process.env.PORT || 3030}`)
);
