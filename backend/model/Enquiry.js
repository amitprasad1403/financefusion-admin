const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose;

const Enquiry = new Schema({
    enquiry_id:{
        type:Number
    },
    customer_id:{
        type:Number
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    dob:{
        type:Date
    },
    user_identity:{
        type:String
    },
    pan_number:{
        type:String
    },
    applied_for:{
        type:String
    },
    date:{
        type:Date
    },
    assigned_to:{
        type:Number
    },
    status:{
        type:String,
        enum:['Pending','Converted','Closed','In-Process'],
        default:'Pending'
    },
    created_on:{
        type:Date 
    }, 
    updated_on:{
        type:Date 
    }, 
    deleted_on:{
        type:Date 
    }  
})

Enquiry.plugin(AutoIncrement,{inc_field:'enquiry_id'})
module.exports = mongoose.model("enquiry",Enquiry)