import { Server } from "socket.io";
import "dotenv/config";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

//auth middleware to all socket connections
io.use(socketAuthMiddleware);

// for storing online users
const userSocketMap = {};

io.on("connection", (socket) => {
  //Each client gets its own socket object.
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all connected clients -> io.emit(eventName, data);
  //socket.emit() sends the event to only that specific client represented by socket.
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on listens for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
