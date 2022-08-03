const express = require('express');
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server)

app.set('port', process.env.PORT || 3000);
// habilitar cross origin
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
//Generar fichero estatico para descarga
app.use(express.static("./public"));
/*************************************** */
app.get("/", (req,res) => {
    res.send("hola");
})
io.on("connection", (socket) => {
    let identificador = socket.id;
    console.log(identificador);
   console.log("usuario conectado");

   io.on("disconnected", () => {
    console.log("usuario desconectado");
   })
})

/*************************************** */

app.listen(app.get("port"), () => {
 console.log("server on")
 console.log(app.get("port"))
})