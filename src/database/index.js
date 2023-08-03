const mongoose = require('mongoose');

async function connectDatabase(){
    await mongoose.connect(process.env.MONGOOSE_CONECT)
}

module.exports = connectDatabase()