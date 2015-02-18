'use strict';
var tessel = require('tessel'),
    send = require('./send'),
    climatelib = require('climate-si7020'),
    climate = climatelib.use(tessel.port['A']);

function start(delay){
  climate.on('ready', climateReady);

  function climateReady(){
    function processTemperature(){
      climate.readTemperature('f', handleReading);
    }
    processTemperature();
    function handleReading(err, temperature){
      if(err){
        console.log(err);
      }
      else{
        temperature = Math.round(temperature * 100) / 100;
        send('temperature', {measure: temperature});
        setTimeout(processTemperature, delay);
      }
    }
  }
}

module.exports = start;