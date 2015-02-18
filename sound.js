'use strict';
var tessel = require('tessel'),
    send = require('./send'),
    ambientLib = require('ambient-attx4'),
    ambient = ambientLib.use(tessel.port['D']);

function start (delay) {
  ambient.on('ready', ambientReady);

  function ambientReady () {
    function processSound () {
      ambient.getSoundLevel(handleSound);
    }
    processSound();
    function handleSound(err, soundLevel){
      if(err){
        console.log(err);
      }
      else{
        soundLevel = Math.round(soundLevel * 100);
        send('sound', {measure: soundLevel});
        setTimeout(processSound, delay);
      }
    }
  }
}

module.exports = start;