// Global variables
// redisClient
// redisPublisher
const Number = require('../models/number');

module.exports = (number, redisClient, redisPublisher) => {

    return new Promise(async (resolve, reject) => {

        const fromRedis = await redisClient.hget('values', String(number));

        if (fromRedis) {
            reject(`Number '${number}' already exists`);
            return;
        }

        new Number({
            value: number
        }).save().then(doc => {
            if (!doc) {
                return Promise.reject();
            }

            /// After it's saved
            console.log(doc, 'saved in mongodb')
            redisClient.hset('values', number, 'Nothing Yet!!!');
            redisPublisher.publish('insert', number);

            console.log('Worker is working');
            setTimeout(async () => {
                const values = await redisClient.hgetall('values');
                resolve(values);
            }, 2000);

        }).catch(e => {
            reject(e);
        })


    })

}