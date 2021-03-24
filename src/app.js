const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

mongoose.connect({
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

app.listen(3000,()=>{
    console.log("Server Running on port 3000");
})