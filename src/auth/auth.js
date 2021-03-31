const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const AccountModel = require('../models/AccountModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async(req,email,password,done)=>{
            balance = req.body.balance;
            user = req.body.person_id;
            try{
                const account = await AccountModel.create({email,password,balance,user});
                
                return done(null,account);
            }catch(error){
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done)=>{
            try{
                const user = await AccountModel.findOne({email});

                if(!user){
                    return done(null,false,{message:'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate){
                    return done(null,false,{message:'Wrong Password'});
                }

                return done(null,user,{message:'Logged in Successfully'});
            }catch(error){  
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
        },
        async(token, done)=>{
            try{
                return done(null, token.user);
            }catch(error){
                done(error);
            }
        }
    )
)
