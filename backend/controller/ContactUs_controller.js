const ContactUs = require('../model/Contact_us');
const { findOne } = require('../model/Customers');

const getEnquiries = async (req, res, next) => {
    try {
        const enquiries = await ContactUs.find({});
        // console.log(enquiries)
        res.status(200).json({ success: true,message:"Contact us list.",data: enquiries });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const addEnquries = async (req,res,next) => {
    try{
        // console.log('submitted details :- ',req.body);
        const add_enquiry = await ContactUs.create({
            name:req.body.full_name,
            phone_number:req.body.phone_number,
            email:req.body.email,
            message:req.body.message,
            status:'Pending',
            date:Date.now()
        })

        res.status(200).json({success:true,data:add_enquiry})
    }
    catch(err){
        return res.status(200).json({err})
    }
}

const getDetailsById = async (req,res,next) => {
    try{
        const contactData = await ContactUs.findOne({contact_id:req.params.id})

        if(!contactData){
            return res.status(400).json({success:false,message:"Failed to get details."})
        }

        return res.status(200).json({success:true,message:"Contact data.",data:contactData})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateStatus = async (req,res,next) => {
    try{
        const contactUsData = await ContactUs.findOne({contact_id:req.params.id})

        if(!contactUsData){
            return res.status(400).json({success:false,message:"Failed to update status."})
        }

        contactUsData.status = req.body.status
        contactUsData.updated_on = Date.now()

        await contactUsData.save();

        return res.status(200).json({success:true,message:"Status updated successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

module.exports = {addEnquries,getEnquiries,updateStatus,getDetailsById}