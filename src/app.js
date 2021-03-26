const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

const connectionString = ""
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;


const app = express();



app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/', routes);


module.exports = app