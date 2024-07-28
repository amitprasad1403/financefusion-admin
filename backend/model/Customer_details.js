const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Customer_details = new Schema({
    cust_details_id:{
        type:Number
    },
    cust_id:{
        type:Number
    },
    name:{
        type:String
    },
    phone_number:{
        type:String
    },
    pancard_number:{
        type:String
    },
    pancard_image:{
        type:String
    },
    aadharcard_image:{
        type:String
    },
    light_bill_image:{
        type:String
    },
    employement_type:{
        type:String
    },
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    marrital_status:{
        type:String,
        enum:['Married','Unmarried']
    },
    dob:{
        type:Date
    },
    verified:{
        type:String,
        enum:['Yes','No']
    }
})

Customer_details.plugin(AutoIncrement,{inc_field:'cust_details_id'})

module.expoorts = mongoose.model("customer_details",Customer_details);