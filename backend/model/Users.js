const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Users = new Schema({
    user_id:{
        type:Number
    },
    username:{
        type:String
    },
    password:{
        type:String
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
    role:{
        type:String,
        enum:['Vendor','Admin','SuperAdmin']
    },
    status:{
        type:String,
        enum:['Active','In-Active'],
        defasult:'Active'
    },
    phone_number:{
        type:String,
    },
    created_on:{
        type:Date
    }
})

Users.plugin(AutoIncrement,{inc_field:'user_id'});

module.exports = mongoose.model("users",Users)