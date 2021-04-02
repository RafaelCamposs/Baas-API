const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const P2PSchema = new Schema({

    senderAccount:{
        type : String,
        required:true,
        unique:true
    },
    receiverAccount:{
        type : String,
        required:true,
        unique:true
    },
    value:{
        type: Number,
        required:true,
    },
    dateOfTransaction:{
        type:Date,
        required:true
    }
})

const P2PModel = mongoose.model('p2p',P2PSchema)

module.exports = P2PModel;