const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const {Schema} = mongoose;

const VendorCustomersSchema = new Schema({
    vc_id:{
        type:Number
    },
    vendor_id : {
        type :Number 
    },
    full_name : {
        type :String
    }, 
    phone_number : {
        type :String
    }, 
    address : {
        type :String
    },     
    note : {
        type :String
    }, 
    status : {
        type :String,
        enum:['Pending','Registered','Closed']
    }, 
    created_on : {
        type : Date,
        default : Date.now()
    }, 
    updated_on : {
        type : Date
    }
})

VendorCustomersSchema.plugin(AutoIncrement,{inc_field : 'vc_id'})

module.exports = mongoose.model('vendorcustomers',VendorCustomersSchema)