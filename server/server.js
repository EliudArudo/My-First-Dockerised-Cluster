const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();

// app.use(cors());
app.use(bodyParser.json());

const sendNumber = require('./controllers/sendNumber');

const port = 3001;

const redisClient = require('./connection').redisClient;


app.get('/', (req, res) => {
    res.send('Congrats, your app is runnning my guy!!!');
});

app.post('/number', (req, res) => {
    //// Check redis, then save to mongodb
    sendNumber(req.body.value, redisClient).then(data => {
        res.send(data);
    }).catch(e => {
        res.status(500).send(e);
    })
});

app.listen(port, () => {
    console.log(`Listening on port:${port}`);
})