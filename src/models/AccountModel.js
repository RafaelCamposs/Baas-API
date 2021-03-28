const mongoose = require('mongoose');
const { agent } = require('supertest');
const UserModel = require('./UserModel');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default: 0
    },
    user:{
        type: String,
        required: true
    }
})

AccountSchema.pre(
    'save',
    async function (next){
        const account = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

AccountSchema.methods.isValidPassword = async function(password){
    const account = this;
    const compare = await bcrypt.compare(password, account.password);

    return compare;
}

const AccountModel = mongoose.model('accounts',AccountSchema);

module.exports = AccountModel;