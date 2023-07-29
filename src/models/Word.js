const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required:true
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Word', wordSchema)