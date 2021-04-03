const P2PModel = require("../models/P2PModel");
const AccountModel = require('../models/AccountModel')

class P2PController{

    async transfer(req,res){
        const senderAccount = req.body.sender;
        const receiverAccount = req.body.receiver;
        const value = req.body.value;
        const dateOfTransaction = new Date();

        const senderExists = await AccountModel.findById(senderAccount)
        if(!senderExists) return res.status(404).json('sender does not exists')
        
        const receiverExists = await AccountModel.findById(receiverAccount)
        if(!receiverExists) return res.status(404).json('receiver does not exists')

        if((senderExists.balance - value)< 0) return res.status(401).json('value unavailable in sender balance')

        const senderBalance = senderExists.balance - value;    

        const receiverBalance = Number(receiverExists.balance) + Number(value);

        AccountModel.findByIdAndUpdate(
        senderAccount,
        {$set: {balance: senderBalance}},
        {upsert: true},
        (error, result) => {
            try {
                console.log('ok');
            } catch (error) {
                res.send(error)
            }
        })

        AccountModel.findByIdAndUpdate(
        receiverAccount,
        {$set: {balance: receiverBalance}},
        {upsert: true},
        (error, result) => {
            try {
                console.log('ok');
            } catch (error) {
                res.send(error)
            }
        })

        try {
            const p2p = await P2PModel.create({senderAccount,receiverAccount,value,dateOfTransaction});
            res.status(200).json('The transaction was made with success')
        } catch (error) {
            res.status(400).json('error')
        }
        
    }


}

module.exports = P2PController;