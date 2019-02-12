const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const numberSchema = new Schema({
    value: Number
});

module.exports = mongoose.model("number", numberSchema);