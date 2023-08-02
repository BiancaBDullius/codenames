const express = require("express");
const helmet = require("helmet");
const app = express(); 
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require("./docs/swagger.json");

app.use(cors({
  origin: '*'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const routes = require("./routes.js");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

module.exports = app;