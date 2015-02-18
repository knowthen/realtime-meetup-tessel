'use scrict';
var tessel = require('tessel'),
    send = require('./send'),
    climatelib = require('climate-si7020'),
    climate = climatelib.use(tessel.port['A']);

function start(delay){ 
  climate.on('ready', climateReady);

  function climateReady () {
    function processHumidity () {
      climate.readHumidity(handleReading);
    }
    processHumidity();
    function handleReading (err, humidity) {
      if(err){
        console.log(err);
      }
      else{
        humidity = Math.round(humidity * 100) / 100;
        send('humidity', {measure: humidity});
        setTimeout(processHumidity, delay);
      }
    }
  }
}

module.exports = start;