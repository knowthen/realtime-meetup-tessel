var temperature = require('./temperature'),
    light = require('./light');
    sound = require('./sound'),
    humidity = require('./humidity'),
    config = require('./config');

temperature(config.delay);
light(config.delay);
sound(config.delay);
humidity(config.delay);