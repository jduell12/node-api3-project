const express = require("express");
const time = require("express-timestamp");

const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use(time.init);
server.use(logger);
server.use(express.json());

server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  //logs to the console the request method, request url and timestamp
  console.log(`${req.method} ${req.url} ${req.timestamp}`);

  next();
}

module.exports = server;
