const express = require('express');
const consign = require('consign');
const cors = require("cors");


module.exports = () => {
    const app = express();
    const corsOptions = {
        exposedHeaders: ["x-access-token"],
      };
      
      app.use(cors(corsOptions));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    consign().include("controllers").into(app);

    return app
}

