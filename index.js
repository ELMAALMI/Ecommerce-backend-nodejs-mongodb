//import packages 
const express  = require('express');
const mongoose = require('mongoose');
const cookieParser= require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const bodyParser = require('body-parser')
// Import routes
const AuthRoute = require('./Routes/Auth.router');
const UserRoute = require('./Routes/User.route');
const CategoryRoute = require('./Routes/Category.route');
const ProductRoute  = require('./Routes/Product.route');
//Import Middleware
const {requireSigin} = require('./Middlewares/auth');
//config app
require('dotenv').config()  
const app = express();

//connection database
mongoose.connect(process.env.DATABASE,{
    useCreateIndex    : true,
    useNewUrlParser   : true,
    useUnifiedTopology: true
})
.then(()=>{console.log('database connected......')})
.catch(()=>{console.log('database not connected...')});

//Middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(expressValidator());
app.use(cookieParser());


//Routes Middleware
app.use('/api/auth',AuthRoute);
app.use('/api/user',requireSigin,UserRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/product',ProductRoute);



const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("the Server is Running at Port "+port)
})