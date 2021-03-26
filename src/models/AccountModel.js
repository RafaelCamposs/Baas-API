const mongoose = require('mongoose');
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
    Person_id:{
        type:String,
        required:true,
        unique:true
    }
})

UserSchema.pre(
    'save',
    async function (next){
        const account = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, account.password);

    return compare;
}

const AccountModel = mongoose.model('account',AccountSchema);

module.exports = AccountModel;