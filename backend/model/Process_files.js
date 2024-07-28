const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Process_files = new Schema({
    file_id:{
        type:Number
    },
    customer_id:{
        type:Number
    },
    handled_by:{
        type:Number
    },
    status:{
        type:String,
        enum:['Pending','Process','Completed','Closed']
    },
    date:{
        type:Date
    },  
    approved:{
        type:String,
        enum:['Yes','No']
    },
    approved_on:{
        type:Date
    }
})

Process_files.plugin(AutoIncrement,{inc_field:'file_id'})
module.exports = mongoose.export("process_files",Process_files)