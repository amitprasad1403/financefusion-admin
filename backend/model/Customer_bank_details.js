const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Customer_bank_details = new Schema({
    bank_details_id:{
        type:Number
    },
    cust_id:{
        type:Number
    },
    bank_name:{
        type:String
    },
    ifsc_code:{
        type:String
    },
    acc_no:{
        type:String
    }
})

Customer_bank_details.plugin(AutoIncrement,{inc_fields:'bank_details_id'})

module.exports = mongoose.module("customer_bank_details",Customer_bank_details)