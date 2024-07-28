const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Leads = new Schema({
    leads_id:{
        type:Number
    },
    enquiry_id:{
        type:Number
    },
    lead_for:{
        type:String
    },
    document_verification:{
        type:String,
        enum:['Yes','No'],
        default:'No'
    },
    verification:{
        type:String,
        enum:['Yes','No'],
        default:'No'
    },
    lead_status:{
        type:String
    },
    date:{
        type:Date
    },
    note:{
        type:String
    },
    handeled_by:{
        type:Number
    },
    created_on:{
        type: Date
    },
    updated_on:{
        type:Date
    }
})

Leads.plugin(AutoIncrement,{inc_field:'leads_id'})
module.exports = mongoose.model("leads",Leads) 