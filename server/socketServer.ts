import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("User Connected!");

    // Listen for "Notification" from ForntEnd
    socket.on("notification", (data) => {
      // Broadcast the notification to all the connected clients
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });
  });
};
