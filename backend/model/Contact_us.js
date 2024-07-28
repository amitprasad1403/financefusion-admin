const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const ContactUs = new Schema({
    contact_id:{
        type:Number
    },
    name:{
        type:String,
    },
    phone_number:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    status:{
        type:String,
        enum:['Pending','Completed','Closed']
    },
    date:{
        type:Date
    },
    updated_on:{
        type:Date
    }
})

ContactUs.plugin(AutoIncrement, {inc_field:'contact_id'})
module.exports = mongoose.model("contact_us",ContactUs)