const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const server = express();

const { SERVER_PORT } = process.env;

server.listen(SERVER_PORT, () => {
  console.log(`$$Server is listening on port: ${SERVER_PORT}`);
});
