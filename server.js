const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const mode = "caesar";
const encrypt = (text, shift) => {
  var result = "";
  if (mode == "caesar") {
    for (let i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
        } else if (c >= 97 && c <= 122) {
            result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
        } else {
            result += text.charAt(i);
        }
    }
  }
  return result;
};

const decrypt = (text, shift) => {
    var result = "";
    shift = (26 - shift) % 26;
    result = encrypt(text, shift);
    return result;
  };

app.get("/", (req, res) => {
    var data = {
      encrypt: "",
      decrypt: ""
    };
    res.render(__dirname + "/index.ejs", { data });
});

app.post("/", (req, res) => { 
    
    const btnSubmit = req.body.submit;
    const encryptKey = req.body.encrypt_key * 1;
    const decryptKey = req.body.decrypt_key * 1;
    const encryptString = req.body.encrypt_string;
    const decryptString = req.body.decrypt_string;

    if (btnSubmit == "encrypt") {
        data = {
          encrypt: encrypt(encryptString, encryptKey),
          decrypt: ""
        };
      } else if (btnSubmit == "decrypt") {
        data = {
          encrypt: "",
          decrypt: decrypt(decryptString, decryptKey)
        };
      } else {
        data = {
          encrypt: "",
          decrypt: ""
        };
      }
    res.render(__dirname + "/index.ejs", { data });
  });


app.listen(4000);
console.log("Server Running On Port 4000");