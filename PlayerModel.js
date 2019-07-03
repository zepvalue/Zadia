const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema ({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('Player', playerSchema)