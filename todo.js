const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todoapp',{
  //useMongoClient:true
  useNewUrlParser: true, // for new version mongodb
  useUnifiedTopology: true // for new versin mongodb
}).then(function(){
  console.log("Database conneted");
});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use('/assets',express.static(__dirname + '/assets'));

const mustacheInstance = mustache();
mustacheInstance.cache = null; 

app.engine("mustache", mustacheInstance);
app.set("view engine","mustache");
app.set("views",__dirname+ "/views");


app.use("/",routes);

app.listen(3000,function(){
  console.log("listening on port 3000");
});
