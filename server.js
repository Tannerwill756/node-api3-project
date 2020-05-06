const express = require("express");
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// server.use("/api/posts", postRouter);

server.use("/api/users", userRouter);

//custom middleware

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`[${today}] ${req.method} a ${req.url}`);
  next();
}

module.exports = server;
