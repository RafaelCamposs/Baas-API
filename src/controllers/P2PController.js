const P2PModel = require("../models/P2PModel");
const AccountModel = require('../models/AccountModel')

class P2PController{

    async transfer(req,res){
        const sender = req.body.sender;
        const receiver = req.body.receiver;
        const value = req.body.value;
        const dateOfTransaction = new Date();

        const senderExists = await AccountModel.findById(sender)
        if(!senderExists) return res.status(404).json('sender does not exists')
        
        const receiverExists = await AccountModel.findById(receiver)
        if(!receiverExists) return res.status(404).json('receiver does not exists')

        if((senderExists.balance - value)< 0)
            return res.status(401).json('value unavailable in sender balance')

            

    }


}

module.exports = P2PController;