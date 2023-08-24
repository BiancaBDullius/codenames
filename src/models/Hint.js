const mongoose = require('mongoose');

const hintSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
    },
    team: {
        type:String,
        required: true,
    },
    text: {
        type: String,
        required:true
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Hint', hintSchema)
