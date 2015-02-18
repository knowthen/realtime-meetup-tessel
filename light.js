'use strict';
var tessel = require('tessel'),
    send = require('./send'),
    ambientLib = require('ambient-attx4'),
    ambient = ambientLib.use(tessel.port['D']);

function start (delay) {
  ambient.on('ready', ambientReady);

  function ambientReady () {
    function processLight () {
      ambient.getLightLevel(handleLightReading);
    }
    processLight();
    function handleLightReading (err, lightLevel) {
      if(err){
        console.log(err);
      }
      else{
        lightLevel = Math.round(lightLevel * 100);
        send('light', {measure: lightLevel});
        setTimeout(processLight, delay);
      }
    }
  }
}

module.exports = start;