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

//to check if user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap.get(userId) ?? new Set();
}

// for storing online users -> used a map to allow multiple sessions like in laptop, mobile, tablets
const userSocketMap = new Map();

// on-> listen for events
io.on("connection", (socket) => {
  //Each client gets its own socket object.
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  const sockets = userSocketMap.get(userId) ?? new Set(); //checks whether the map has the userId key or not
  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  //io.emit() is used to send events to all connected clients -> io.emit(eventName, data);
  //socket.emit() sends the event to only that specific client represented by socket.
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  //socket.on listens for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    const sockets = userSocketMap.get(userId); //sockets is not a copy. It's a reference to the actual Set stored inside the Map.
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) userSocketMap.delete(userId);
    }
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
