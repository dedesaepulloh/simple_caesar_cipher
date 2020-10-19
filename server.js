const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    var data = {
      encrypt: "",
      decrypt: ""
    };
    res.render(__dirname + "/index.ejs", { data });
});

app.post("/", (req, res) => {  
    res.render(__dirname + "/index.ejs", { data });
  });


app.listen(4000);
console.log("Server Running On Port 4000");