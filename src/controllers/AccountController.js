const AccountModel = require('../models/AccountModel')
const UserModel = require('../models/UserModel')
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

    async login(req, res, next){
        
        const email = req.body.email;
        const password = req.body.password;
        
        const userDontExist = await AccountModel.findOne({email});
        if(!userDontExist){
            return res.status(404).json('user was not found');
        }

        const validatePassword = await userDontExist.isValidPassword(password);

        if(!validatePassword){
            return res.status(401).json('wrong password')
        }

        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');

                        return next(error);
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');

                            return res.json({ token });
                        }
                    );
                }catch(error){
                    return next(error);
                }
            }
        )(req,res,next);
    }

    async list(req,res){
        const all = await AccountModel.find();
        
        return res.json(all);
    }

    async detail(req, res){
        const id = req.body.account_Id;
        await AccountModel.findById(id).exec(function (err, account) {
            const id_user = account.user
            UserModel.findById(id_user).exec(function (err, user) {
                res.json({
                    account : account,
                    user : user
                });
            })
        })
    }

}

module.exports = AccountController;