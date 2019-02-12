const redis = require('redis');
const keys = require('./keys');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisListener = redisClient.duplicate();

redisListener.on('message', (channel, message) => {
    redisClient.hset('values', message, (parseInt(message) + 20));
})
redisListener.subscribe('insert');