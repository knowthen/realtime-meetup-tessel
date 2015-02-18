'use scrict';
var ws = require('nodejs-websocket'),
    config = require('./config'),
    queue = [];

var connection;

openConnection();

function openConnection(){
  connection = ws.connect(config.url);
  connection.on('close', function(code, reason){
    connection.removeAllListeners();
    setTimeout(openConnection, 5000);
  });

  connection.on('error', function(err){
    connection.removeAllListeners();
    setTimeout(openConnection, 5000);
  });

  connection.on('connect', function(){
    sendQueue();
  });

  connection.isOpen = function(){
    return this.readyState === this.OPEN;
  }
}

function send (event, record) {
  var data = {
    event: event,
    record: record
  };
  if(queue.length > 40){
    queue.shift();
  }
  queue.push(data);
  if(connection && connection.isOpen()){
    sendQueue();
  }
}

function sendQueue(){
  for (var i = 0; i < queue.length; i++) {
    var event = queue.shift();
    event = JSON.stringify(event);
    connection.sendText(event);
  };
}

module.exports = send;
