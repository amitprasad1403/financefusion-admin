//Express is a NodeJs FrameWork
const express = require('express');
//Mongoose is a mongoDB library
const mongoose = require('mongoose');
//CORS worked as a middleware
const cors = require('cors');

const vendor_routes = require('./routes/vendors_routes')
const contact_us = require('./routes/contact_us')
const customer = require('./routes/customer')
const user_routes = require('./routes/user_routes')


const path = require('path');

//
require('dotenv').config();

const app = express();

//Middlewares
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log("HTTP method = " + req.method +" , URL - " +req.url);
    next();
})

//routing
app.use('/api/vendors',vendor_routes)
app.use('/api/contact_us',contact_us)
app.use('/api/customer',customer)
app.use('/api/users',user_routes)

app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_DB_URL)
.then(() => app.listen(process.env.PORT))
.then(()=>console.log("Connected to mongoose on port : ",process.env.PORT))
.catch((err)=>{
    console.log(err)
})

// async function startServer() {
//     try {
//         await mongoose.connect(process.env.MONGO_DB_URL);
//         await app.listen(process.env.PORT);
//         console.log("Connected to mongoose on port : ", process.env.PORT);
//     } catch (err) {
//         console.error(err);
//     }
// }

// startServer()
