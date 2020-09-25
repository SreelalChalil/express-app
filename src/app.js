const express = require("express");
require("./mongoose/db/mongoose");
const teamsRouter = require("./routers/teams");
const playersRouter = require("./routers/players");
const adminRouter = require("./routers/admin");
const mappingRouter = require("./routers/mappings");

const bodyParser = require("body-parser");


//setting up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });


app.use(express.json());
app.use(teamsRouter);
app.use(playersRouter);
app.use(adminRouter);
app.use(mappingRouter);


module.exports = app;
