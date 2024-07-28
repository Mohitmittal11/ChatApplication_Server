require("dotenv").config();
require("./Mongodb_configuration/config");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
var session = require("express-session");
const allRoute = require("./Routes/AllRoute");
const { Server } = require("socket.io");
const { DateTime } = require("luxon");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SessionSecurity,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(allRoute.roomroute);
app.use(allRoute.room_type_route);
app.use(allRoute.messageRoute);
app.use(allRoute.sigininRoute);
app.get("/", async (req, res) => {
  res.send("Hello I am Going to create a chat Application using Socket");
});

io.on("connection", async (socket) => {
  socket.on("join", (roomid) => {
    console.log("Room id for specify the data is ", roomid);
    socket.join(roomid);
    console.log(
      "Size of user conected to ",
      io.sockets.adapter.rooms.get(roomid).size
    );

    socket.to(roomid).emit("join", crypto.randomUUID());
  });

  socket.on("message", (broadcastData) => {
    const { messageinfo } = broadcastData;
    console.log(
      "Data that is received from frontend is",
      messageinfo[0].room_id
    );

    io.to(messageinfo[0].room_id).emit("receivedMessage", broadcastData);
  });

  socket.on("disconnect", () => {
    console.log("Some one is Disconnected");
    return () => socket.removeAllListeners();
  });
});

const dateTime = DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE);
console.log("Date and time is", dateTime);

server.listen(8001, () => {
  console.log("Server is Started at port 8001");
});
