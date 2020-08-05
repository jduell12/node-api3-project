const express = require("express");
const time = require("express-timestamp");

const server = express();

server.use(time.init);
server.use(logger);

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
