const express = require('express');
const redisClient = require("./redis")
const app = express();
const { Server } = require('socket.io');
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const server = require("http").createServer(app)
const RedisStore = require("connect-redis").default
require("dotenv").config();
const router = require('./router/authRouter');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: "true",
    },
});

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        credentials: true,
        name: "sid",
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
            httpOnly: true,
            sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
            expires: 1000 * 60 * 60 * 24 * 7
        }
    })
)
app.use('/auth', router)


io.on("connect", socket => { });

server.listen(8000, () => {
    console.log("Server listining on port 8000")
})