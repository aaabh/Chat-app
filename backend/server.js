const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",//react url
    method: ['GET','POST'],
  }
});
//CONNECTION
io.on("connection", (socket) =>{
  console.log(`Client connected${socket.id}`);
  // Handle incoming messages from the client
  socket.on("sendMessage",(msg)=>{
    io.emit("receviedMessage", msg);
  });
  //disconnection
  socket.on("disconnect", ()=>{
    console.log(`Client disconnected ${socket.id}`);
  });
});

server.listen(5000,()=> console.log(`Server running on Port No 5000`));
