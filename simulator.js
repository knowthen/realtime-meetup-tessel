var send    = require('./send'),
    config  = require('./config'),
    repl    = require('repl');

var run = true;

var app = repl.start({
  prompt: 'tessel simulator>'
});

app.context.temperature = 80;
app.context.light = 50;
app.context.sound = 20;
app.context.humidity = 45;
app.context.delay = 1000;
app.context.start = start;
app.context.stop = stop;
app.context.help = 'usage: start(), stop(), temperature = 60, ' +
  'light = 50, sound = 20, humidity = 50, delay = 1000';

function stop () {
  run = false;
}

function start(){
  if(!run){
    run = true;
    return;
  }
  send('temperature', {measure: app.context.temperature});
  send('light', {measure: app.context.light});
  send('humidity', {measure: app.context.humidity});
  send('sound', {measure: app.context.sound});
  setTimeout(start, app.context.delay);
}
