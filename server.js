const express = require("express");

const server = express();

server.get("/", (req, res) => {
  const message = process.env.MESSAGE || "Hello World!";
  res.status(200).json({ message });
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
