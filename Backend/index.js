const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:4200"
      }
});

io.on("connection",(socket)=>{
    socket.addListener("test1",(data)=>{
        console.log("Got ",data)
        socket.broadcast.emit("test1",data);
    })
})


httpServer.listen(3000,"localhost",12,()=>{
    console.log("Lstening at 3000")
})