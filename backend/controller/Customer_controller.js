const Customers = require('../model/Customers')
const Enquiry = require('../model/Enquiry')
const Leads = require('../model/Leads')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const path = require('path');
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');

const addCustomer = async (req,res,next) => {
    try{
        // console.log(req.body);

        const findEmail = await Customers.findOne({ email: req.body.email, email_verified: 'Yes' });

        // console.log(findEmail);

        if (findEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }

        const add_user = await Customers.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            phone_number:req.body.phone_number,
            address:req.body.address,
            pincode:req.body.pincode,
            email_verified:'No',
            date: Date.now()
        })

        // console.log(add_user);

        if(!add_user){
            return res.status(400).json({success:false,message:'Failed to add customer.'})
        }

        res.status(200).json({success:true,message:'Customer details added successfully.'})
        
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.GMAIL_ID,
                pass:process.env.GMAIL_PASSWORD,
            }
        });
    
        //2. Configure email content
        const mailOptions = {
            from: `"FinanceFusion" <${process.env.GMAIL_ID}>`,
            to: req.body.email,
            subject: 'Email verification.', 
            text : `Welcome to FinanceFusion. Please verify your email: http://localhost:5000/api/customer/verifyEmail?custId=${add_user.customer_id}&email=${add_user.email}`
        };
    
        //3. Send the email
        try{
            const result = await transporter.sendMail(
                mailOptions
            );
            console.log('Email sent successfully');
            return res.status(200).json({success:true,message:'Please check your mail to verify your email.'})
        }catch(err){
            console.log('Email sent failed with error: '+ err);
            return res.status(400).json({success:false,message:'Failed to verify customer.'})
        }

    }
    catch(err){
        return res.status(400).json({err})
    }
}

const verifyEmail = async (req,res,next) => {

    // console.log(req.query);

    try {
        const custDetails = await Customers.findOne({ customer_id: req.query.custId, email: req.query.email });

        if (!custDetails) {
            // return res.status(404).send('Customer not found');
            res.sendFile(path.join(__dirname, '..', 'public', 'error.html'));
        }

        // console.log(custDetails);

        custDetails.email_verified = 'Yes';
        await custDetails.save();

        res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));

    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Error verifying email');
    }
}

const sendOtp = async (req,res,next) => {
    try{
        // console.log(req.body)

        const checkEmail = await Customers.findOne({email:req.body.email})

        if(!checkEmail){
            return res.status(400).json({success:false,message:"User dosen't exists."})
        }

        if(checkEmail.email_verified=='No'){
            return res.status(400).json({success:false,message:"User is not verified."})
        }

        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD,
            }
        });
    
        //2. Configure email content
        const mailOptions = {
            from: `"FinanceFusion" <${process.env.GMAIL_ID}>`,
            to: req.body.email,
            subject: 'Login OTP.', 
            text : `Welcome to FinanceFusion. Your otp for login is :-`+otp
        };
    
        //3. Send the email
        try{
            const result = await transporter.sendMail(
                mailOptions
            );
            console.log('Email sent successfully');
            checkEmail.otp = otp
            checkEmail.otp_end_time = expiresAt 

            await checkEmail.save();

            return res.status(200).json({success:true,message:'Otp sent successfully'})

        }catch(err){
            console.log('Email sent failed with error: '+ err);
            return res.status(400).json({success:false,message:'Failed to dend otp.'})
        }
    }
    catch(err){
        return res.status(400).json({err})
    }
}

const checkLogin = async (req,res,next) => {
    try{

        // console.log(req.body)

        const custData = await Customers.findOne({email:req.body.email,otp:req.body.otp})

        if(!custData){
            return res.status(400).json({success:false,message:"Invalid OTP. Failed to login."})
        }

        if(custData.otp_end_time < new Date()){
            return res.status(400).json({success:false,message:"OTP Expired. Failed to login."})
        }

        const auth_token = jwt.sign(custData.email,process.env.SECRET_KEY);
        custData.auth_token = auth_token;
        await custData.save();

        return res.status(200).json({success:true,message:"Successfully loggedIn.",tocken:auth_token,customer_id:custData.customer_id
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getCustomerData = async (req,res,next) => {
    try{
        // console.log(req.params.id);return;
        const custDetails = await Customers.findOne({customer_id:req.params.id})
        // console.log(custDetails); 

        if(!custDetails){
            return res.status(400).json({success:false,message:'Failed to fetch customer details.'})
        }

        return res.status(200).json({success:true,message:"Customer details.",data:custDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const addEnquiry = async (req,res,next) => {
    try{
        console.log(req.body)
        console.log(req.file); 
        if(!req.file){
            return res.status(400).json({success:false,message:"File no found."})
        }

        const addEnquiry = await Enquiry.create({
            customer_id:req.params.id,
            first_name:req.body.firstName,
            last_name:req.body.lastName,
            dob:req.body.dob,
            user_identity:req.file.filename,
            pan_number:req.body.panNumber,
            applied_for:req.body.appliedFor,
            date:Date.now(), 
            created_on:Date.now()
        })

        if(!addEnquiry){
            return res.status(400).json({success:false,message:"Failed to add Enquiry."})
        }

        return res.status(200).json({success:true,message:"Enquiry added.",data:addEnquiry})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getDashboardCount = async (req,res,next) => {
    try{
        const allEnquries = await Enquiry.find({customer_id:req.params.id});
        const allPendingEnquries = await Enquiry.find({customer_id:req.params.id,status:'Pending'})

        return res.status(200).json({success:true,message:"Dashboard count",enquiryCount:allEnquries.length,pendingEnq:allPendingEnquries.length,enquiryData:allEnquries,pendingEnqData:allPendingEnquries})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getAllCustomersList = async (req,res,next) => {
    try{
        const customerlist = await Customers.find()
        if(!customerlist){
            return res.status(400).json({success:false,message:"Failed to get customer list"})
        }

        return res.status(200).json({success:true,message:"Customers List",data:customerlist})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}


const getAllEnquries = async (req,res,next) => {
    try{
        const enquriesList = await Enquiry.find({})

        if(!enquriesList){
            return res.status(400).json({success:false,message:"Failed to get enquiry list."})
        }

        return res.status(200).json({success:true,message:"Enquiry list.",data:enquriesList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const convertEnquiry = async (req,res,next) => {
    try{
        const leads = await Leads.create({
            enquiry_id:req.body.enquiry_id,
            handeled_by:req.body.handeled_by,
            lead_for:req.body.lead_for,
            lead_status:'Pending',
            date: Date.now(),
            created_on: Date.now(),
        })

        if(!leads){
            return res.status(400).json({success:false,message:"Failed to convert enquiry."})
        }

        const enquiryData = await Enquiry.findOne({enquiry_id:req.body.enquiry_id})

        enquiryData.status = 'Converted',
        enquiryData.updated_on =  Date.now()

        await enquiryData.save();

        return res.status(200).json({success:true,message:"Enquiry converted successfully",data:leads})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getAdminLeads = async (req,res,next) => {
    try{
        // const leadsData = await Leads.findOne({handeled_by:req.params.id})
        const leadsData = await Leads.aggregate([
            {
                $lookup:{
                    from:'enquiries',
                    localField:'enquiry_id',
                    foreignField:'enquiry_id',
                    as:'enquirydetails'
                }
            },
            {
                $lookup:{
                    from:'customers',
                    localField:'enquirydetails.customer_id',
                    foreignField:'customer_id',
                    as:'customerDetails'
                }
            }
        ])

        if(!leadsData){
            return res.status(400).json({success:false,message:"Failed to get leads data."})
        }

        return res.status(200).json({success:true,message:"Leads data.",data:[leadsData]})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getLeadDetails = async (req, res, next) => {
    try {
        const leadDetails = await Leads.findOne({ leads_id: req.params.id });
        
        if (!leadDetails) {
            return res.status(400).json({ success: false, message: "Failed to fetch lead details" });
        }

        const enquiryDetails = await Enquiry.aggregate([
            {
                $match: {
                    enquiry_id: leadDetails.enquiry_id
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer_id',
                    foreignField: 'customer_id',
                    as: 'customerDetails'
                }
            }
        ]);

        const assignedUserDetails = await Users.findOne({user_id:leadDetails.handeled_by})

        return res.status(200).json({ success: true, message: "Lead details.", leadData: leadDetails, enquiryDetail: enquiryDetails, assignedUserDetails:assignedUserDetails });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, error: err.message });
    }
}

const updateLead = async (req,res,next) => {
    try{
        const leadData = await Leads.findOne({leads_id:req.params.id})

        if(!leadData){
            return res.status(400).json({success:false,message:"Failed to update."})
        }

        if(req.body.document_verification != ''){
            leadData.document_verification = req.body.document_verification
        }

        if(req.body.verification != ''){
            leadData.verification = req.body.verification            
        }

        if(req.body.lead_status != ''){
            leadData.lead_status = req.body.lead_status
        }

        await leadData.save()

        return res.status(200).json({success:true,message:"Lead updated successfully."})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}


module.exports = {
    addCustomer,
    verifyEmail,
    sendOtp,
    checkLogin,
    getCustomerData,
    addEnquiry,
    getDashboardCount,
    getAllCustomersList,
    getAllEnquries,
    convertEnquiry,
    getAdminLeads,
    getLeadDetails,
    updateLead
}