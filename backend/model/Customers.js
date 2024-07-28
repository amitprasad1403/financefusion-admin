const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Customers = new Schema({
    customer_id:{
        type:Number
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    }, 
    email:{
        type:String
    },
    phone_number:{
        type:String
    },
    address:{
        type:String
    },
    pincode:{
        type:Number
    },
    email_verified:{
        type:String,
        enum:['Yes','No']
    },
    otp:{
        type:Number
    },
    otp_end_time:{
        type:Date
    },
    auth_token:{
        type:String
    },
    customer_status:{
        type:String,
        enum:['Active','In-Active']
    },
    date:{
        type:Date
    }
})

Customers.plugin(AutoIncrement,{inc_field: 'customer_id'})
module.exports = mongoose.model("customers",Customers)