const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// .on is for listening any events
io.on("connection", (socket) => {
    console.log("A user connected successfully");

    // creating a newMessage event
    socket.emit("newMessage", {
        from: "Soldi",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit("newMessage", {
        from: "soldi",
        text: "New User Connected",
        createdAt: new Date().getTime()
    });
    // listening for any message from clients side
    // socket.on('createMessage', (message)=>{
    //     console.log("createMessage", message);
    // });

    /* socket.on("createMessage", (message) => {
        console.log("createMessage", message);

        // This will emit to all, when anyone call createMessage event
        io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
        });
        socket.broadcast.emit('newMassage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    }); */

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// listening the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
