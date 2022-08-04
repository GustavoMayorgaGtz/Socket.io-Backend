const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});
const cors = require("cors");
const parser = require("body-parser")
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    const id = socket.id;
    const {nameRoom} = socket.handshake.query;
    socket.join(nameRoom);
   console.log(`user connected with id ${id} in room ${nameRoom}`);
   //Grupo test
   socket.on("test", (res) => {
     console.log("connected to test");
   
     socket.to(nameRoom).emit('test', res)
   })

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});