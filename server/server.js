const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const redis = require('redis');
const util = require('util');

const keys = require('./keys');

const app = express();

const port = 3001;

const sendNumber = require('./controllers/sendNumber');

require('./connection');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

redisClient.hget = util.promisify(redisClient.hget);
redisClient.hgetall = util.promisify(redisClient.hgetall);

const redisPublisher = redisClient.duplicate();

// app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Congrats, your app is runnning my guy!!!');
});

app.post('/number', (req, res) => {
    //// Check redis, then save to mongodb
    sendNumber(req.body.value, redisClient, redisPublisher).then(data => {
        console.log('Data sent to you', data);
        res.send(data);
    }).catch(e => {
        console.log('Error', e);
        res.status(500).send(e);
    })
});

app.listen(port, () => {
    console.log(`Listening on port:${port}`);
})