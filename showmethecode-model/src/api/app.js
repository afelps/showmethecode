const express = require("express");
const cors = require("cors");
const generateRoutes = require("./routes");
const { Router } = require("express");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  router() {
    const routes = new Router();
    generateRoutes(routes);
    this.server.use(routes);
  }
}

module.exports = App;
