const mongoose = require('mongoose');

async function connectDatabase(){
    await mongoose.connect(`mongodb+srv://biancabeppler:mj63oynIHXCvsA8E@cluster0.nsqhvni.mongodb.net/?retryWrites=true&w=majority`)
}

module.exports = connectDatabase()