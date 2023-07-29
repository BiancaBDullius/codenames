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

const indexRoute = require("./routes/index-route");

app.use("/", indexRoute);

module.exports = app;