const express = require("express");
const helmet = require("helmet");
const app = express(); 
const cors = require('cors');

app.use(cors({
  origin: '*'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const routes = require("./routes.js");

app.use(routes);

module.exports = app;