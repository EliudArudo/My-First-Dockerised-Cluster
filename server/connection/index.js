const mongoose = require('mongoose');
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