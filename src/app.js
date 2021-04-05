const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const passport = require('passport');

const connectionString = ""
mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');
const app = express();


app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/', routes);
const secureRoute = require('./routes/secure-routes');

app.use('/account', passport.authenticate('jwt', {session:false}),secureRoute);

app.use(function(err,req,res,next){
    res.status(err.status || 500 );
    res.json({error:err});
});


module.exports = app