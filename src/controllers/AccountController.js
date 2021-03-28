const AccountModel = require('../models/AccountModel')
const UserModel = require('../models/UserModel')
class AccountController {

    async create(req,res){
        const email = req.body.email;
        const password = req.body.password;
        const balance = req.body.balance;
        const user = req.body.person_id;
        try{
            const account = await AccountModel.create({ email, password, balance,user})
            return res.status(200).json(account);
        } catch (error) {
            return res.status(400).json('error');
        }
    }
     
    
}

module.exports = AccountController;