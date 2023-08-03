const mongoose = require('mongoose');
const Word = require('./Word.js');

const cardSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    turned: {
        type: Boolean,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: true
    }
})

const gameSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    game_state: {
        type: [cardSchema],
        required:true
    },
    turn: {
        type: String,
        required: true
    },
    timer: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Game', gameSchema)