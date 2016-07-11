var express = require('express');
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { drived: 'led' }
  },

  work: function() {
    every((1).second(), function(){
      num = Math.random() * 255
      my.led.brightness(num)
    })
  }
}).start();
