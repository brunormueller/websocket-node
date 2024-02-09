import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware to log POST and GET requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

io.on("connection", (socket) => {
  socket.on("notification", () => {
    io.emit("newNotification");
  });
});

server.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});
