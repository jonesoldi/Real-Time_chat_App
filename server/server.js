const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("A user connected successfully");

    socket.on("disconnect", ()=> {
        console.log("user disconnected");
    }); 
});


// listening the server 
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});