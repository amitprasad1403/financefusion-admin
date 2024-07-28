const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Customer_comm = new Schema({
    comm_id:{
        type:Number
    },
    cust_id:{
        type:String
    },
    remark:{
        type:String
    },
    call_no:{
        type:String
    },
    date:{
        type:Date
    },
    call_by:{
        type:String
    },
    status:{
        type:String,
        enum:['Active','In-Active']
    }
})

Customer_comm.plugin(AutoIncrement, {inc_field:'comm_id'})
module.exports = mongoose.model("customer_comm",Customer_comm)