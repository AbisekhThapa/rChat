const express = require('express');
const app = express();
const { Server } = require('socket.io');
const helmet = require("helmet");
const cors = require("cors");
const server = require("http").createServer(app)
require("dotenv").config();
const router = require('./router/authRouter');
const { corsConfig, sessionMiddleware, wrap } = require('./controllers/serverController');
const { authorizeUser, initializeUser, addFriend, onDisconnect, dm } = require('./controllers/socketController');


const io = new Server(server, {
    cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig))
app.use(express.json())
app.use(sessionMiddleware)
app.use('/auth', router)

io.use(wrap(sessionMiddleware))
io.use(authorizeUser)
io.on("connect", socket => {
    // console.log(socket.user.userid)
    // console.log(socket.id)
    // console.log(socket.request.session.user.username)

    initializeUser(socket);

    socket.on("add_friend", (friendName, cb) => {
        addFriend(socket, friendName, cb);
    });

    socket.on("dm", (message) => dm(socket, message));

    socket.on("disconnecting", () => onDisconnect(socket))
});

server.listen(8000, () => {
    console.log("Server listining on port 8000")
})