const AccountModel = require('../models/AccountModel')
const UserModel = require('../models/UserModel')
const passport = require('passport');

class AccountController {

    async create(req, res, next){
        const email = req.body.email;
        const password = req.body.password;
        const balance = req.body.balance;
        const user = req.body.person_id;

        const emailAlreadyExists = await AccountModel.exists({ 'email': email });
        if (emailAlreadyExists) return res.status(406).json('email already in use')

        const idAlreadyExists = await AccountModel.exists({ 'user': user });
        if (idAlreadyExists) return res.status(406).json('user already in use')

        const idDoNotExists = await UserModel.exists({'_id':user});
        if(idDoNotExists == false) return res.status(406).json('user doesnt exist')

        try {
            const account = passport.authenticate('signup', { session: false })(req,res,next)
            return res.status(200).json({
                message: "Signup successful",
            });
        } catch (error) {
            return res.status(400).json('error');
        }
    }


}

module.exports = AccountController;