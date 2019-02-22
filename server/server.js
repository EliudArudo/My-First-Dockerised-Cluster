const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();

// app.use(cors());
app.use(bodyParser.json());

const sendNumber = require('./controllers/sendNumber');

const port = 3001;

require('./connection');

app.use(function (req, res, next) {
    console.log(`SERVER: Got request to link "${req.originalUrl}"`);
    next();
});

app.get('/', (req, res) => {
    res.send('Congrats, your app is runnning my guy!!!');
});

app.post('/number', (req, res) => {
    //// Check redis, then save to mongodb
    console.log('Got a request to "/number"')
    console.log(req.body);
    sendNumber(req.body.value).then(data => {
        console.log('Got data to send', JSON.stringify(data));
        res.send(data);
    }).catch(e => {
        console.log('Got an error', JSON.stringify(e));
        res.status(500).send(e);
    })
});

app.listen(port, () => {
    console.log(`Listening on port:${port}`);
})