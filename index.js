var express = require('express');

var app = express();
app.use( express.static("assets") );

app.listen(1337, function(){
  console.log("Server started on port 1337")
});

app.get("/", function(req, res) {
  res.sendFile( __dirname + "/index.html");
});
