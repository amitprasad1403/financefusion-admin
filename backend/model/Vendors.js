const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Vendors = new Schema({
    vendor_id:{
        type:Number
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    vendor_name:{
        type:String
    },
    email:{
        type:String
    },
    phone_number:{
        type:String
    },
    location:{
        type:String
    },
    assigned_to:{
        type:Number
    },
    status:{
        type:String,
        enum:['Active','In-Active']
    },
    created_on:{
        type:Date
    }
})

Vendors.plugin(AutoIncrement, {inc_field: 'vendor_id'})
module.exports = mongoose.model("vendors",Vendors);