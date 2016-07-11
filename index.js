var express = require('express');
var Cylon = require('cylon');

var pi = Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    pin: { driver: 'direct-pin', pin: 11 }
  },

  work: function(my) {
    var value = 0
    every((1).second(), function(){
      my.pin.digitalWrite(value)
      value = (value == 0) ? 1 : 0;
    })
  }
})

var app = express();
app.use( express.static("assets") );

app.listen(1337, function(){
  console.log("Server started on port 1337")
});

app.all(/.*/, function(req, res, next) {
  console.log( req.method, "request for: ", req.url );
  next();
});

app.get("/", function(req, res) {
  res.sendFile( __dirname + "/index.html");
});

app.get("/on", function(req, res) {
  console.log("on")
  pi.start();
  res.redirect("/")
});

app.get("/off", function(req, res) {
  console.log("off")
  pi.halt();
  res.redirect("/")
});
