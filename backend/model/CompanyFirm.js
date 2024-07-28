const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const {Schema} = mongoose;

const CompanyFirm = new Schema({
    firm_id:{
        type:Number,
    },
    firm_name:{
        type:String,
    },
    firm_location:{
        type:String,
    }
})

CompanyFirm.plugin(AutoIncrement, {inc_field: 'firm_id'})

module.exports = mongoose.model("companyFirms",CompanyFirm);
