const express = require('express');
const morgan = require("morgan");

const usersRouter = require("./users/userRouter.js");
const postsRouter = require("./posts/postRouter.js");

const server = express();
server.use(express.json());
server.use(morgan('combined'))
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
