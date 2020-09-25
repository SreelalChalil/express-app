const mogoose = require("mongoose");

//connecting to mongodb
mogoose.connect("mongodb://127.0.0.1:27017/football-tournoment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
