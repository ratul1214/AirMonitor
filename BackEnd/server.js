const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
var https = require('https');
var fs = require('fs');

var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cookieParser());
app.use(cors());
/*var options = {
     key: fs.readFileSync('/etc/letsencrypt/live/app.ohioh.de/privkey.pem'),
     cert: fs.readFileSync('/etc/letsencrypt/live/app.ohioh.de/fullchain.pem'),
     ca: fs.readFileSync('/etc/letsencrypt/live/app.ohioh.de/chain.pem')
}*/


//var privateKey  = fs.readFileSync('sslcert/server.cert', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.key', 'utf8');

//var credentials = {key: privateKey, cert: certificate};
//var httpsServer = https.createServer(options, app);
//httpsServer.listen(8442);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



  const dbairdata = require("./app/airdatamodel");
dbairdata.mongoose
  .connect(dbairdata.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  

  

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
