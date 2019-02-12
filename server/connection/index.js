const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const keys = require('../keys');

const mongoURI = `mongodb://${keys.mongoUri}:${keys.mongoPort}/${keys.mongoDatabase}`;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(err);
        return console.log('Mongo DB connection issues');
    }
    console.log('Mongodb connected')
})

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

redisClient.hget = util.promisify(redisClient.hget);
redisClient.hgetall = util.promisify(redisClient.hgetall);

const redisPublisher = redisClient.duplicate();

global.redisClient = redisClient;
global.redisPublisher = redisPublisher;