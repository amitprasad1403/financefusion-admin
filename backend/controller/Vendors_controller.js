const Vendors = require('../model/Vendors')
const Users = require('../model/Users')
const VendorsCustomers = require('../model/Vendors_customers')
const bcryptJs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginVendor = async (req,res,next) => {
    try{
        // console.log("Login user :- ",req.body)
        const vendorData = await Vendors.findOne({username:req.body.username,status:'Active'})
        if(!vendorData){
            return res.status(400).json({success:false,message:"Vendor not found."})
        }
        // console.log(vendorData);
        const comparePass = await bcryptJs.compare(req.body.password,vendorData.password);
        if(!comparePass){
            return res.status(400).json({success:false,message:"Incorrect password."})
        }

        const data = {
            user_id:vendorData.vendor_id,
            username:vendorData.username,
            full_name:vendorData.vendor_name, 
            email:vendorData.email,
            phone_number:vendorData.phone_number,
            role:'Vendor',
        }

        const auth_token = jwt.sign(data,process.env.SECRET_KEY);

        return res.status(200).json({success:true,message:"Vendor logged in successfully",data:data,tocken:auth_token})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}


const addVendorDetails = async (req,res,next) => {
    try{

        // console.log(req.body)
        const checkUsername = await Vendors.findOne({username:req.body.username,status:'Active'})
        if(checkUsername){
            return res.status(400).json({success:false,message:"Username already exists."})
        }

        const checkEmail = await Vendors.findOne({email:req.body.email,status:'Active'})
        if(checkEmail){
            return res.status(400).json({success:false,message:"Email already exists."})
        }

        const checkPhoneNumber = await Vendors.findOne({phone_number:req.body.phone_number,status:'Active'})
        if(checkPhoneNumber){
            return res.status(400).json({success:false,message:"Phone number already exists"})
        }

        // console.log("Here")

        const salt = await bcryptJs.genSalt(10)
        const secure_pass = await bcryptJs.hashSync(req.body.password,salt)
        
        const addVendor = await Vendors.create({
            username:req.body.username,
            password:secure_pass,
            vendor_name:req.body.vendor_name, 
            email:req.body.email, 
            location:req.body.location, 
            status:'Active',
            phone_number:req.body.phone_number,
            created_on:Date.now(),
        })

        if(!addVendor){
            return res.status(400).json({success:false,message:"Failed to add vendor."})
        }

        return res.status(200).json({success:true,message:"Vendor added successfully",data:addVendor})

    }
    catch(err){
        res.status(400).json({err})
    }
} 

const getAllVendors = async (req,res,next) => {
    try{
        const vendorsList = await Vendors.find()

        if(!vendorsList){
            return res.status(400).json({success:false,message:"Failed to get vendor list."})
        }

        // console.log(vendorsList)

        return res.status(200).json({success:true,message:"Vendors list.",data:vendorsList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}


const getVendorById = async (req,res,next) => {
    try{
        const vendorDetails = await Vendors.findOne({vendor_id:req.params.id})

        if(!vendorDetails){
            return res.status(400).json({success:false,message:"Failed to get vendor data."})
        }

        // console.log(vendorDetails)

        return res.status(200).json({success:true,message:"Vendor data.",data:vendorDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateVendor = async (req,res,next) => {
    try{
        console.log(req.body)
        const vendorData = await Vendors.findOne({vendor_id:req.params.id})

        if(!vendorData){
            return res.status(400).json({success:false,message:"Failed to update vendor details"})
        }
        
        const comparePass = await bcryptJs.compare(req.body.password,vendorData.password);
        if(!comparePass){
            const salt = await bcryptJs.genSalt(10)
            var secure_pass = await bcryptJs.hashSync(req.body.password,salt)
        }

        vendorData.username = req.body.username,
        vendorData.password = secure_pass,
        vendorData.vendor_name = req.body.vendor_name,
        vendorData.email = req.body.email,
        vendorData.phone_number = req.body.phone_number,
        vendorData.location = req.body.location,
        vendorData.assigned_to = req.body.assigned_to,
        vendorData.status = req.body.status

        await vendorData.save()

        return res.status(200).json({success:true,message:"Vendor updated successfully."})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const deleteVendor = async (req,res,next) => {
    try{
        const vendorData = await Vendors.findOne({vendor_id:req.params.id})

        if(!vendorData){
            return res.status(200).json({success:false,message:"Failed to delete vendor."})
        }

        vendorData.status = 'In-Active'

        await vendorData.save()

        return res.status(200).json({success:true,message:"Vendor deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const vendorCustomersList = async (req, res, next) => {
    try {
        const role = req.params.role;
        const id = req.params.id;

        if (role === 'Vendor') {
            let customerList = await VendorsCustomers.find({ vendor_id: id });

            if (!customerList) {
                return res.status(400).json({ success: false, message: "Failed to get customer list" });
            }

            return res.status(200).json({ success: true, message: "Customer list", data: customerList });
        }

        if (role === 'Admin') {
            let customerList = await VendorsCustomers.aggregate([
                {
                    $lookup: {
                        from: 'vendors',
                        localField: 'vendor_id',
                        foreignField: 'vendor_id',
                        as: 'vendorDetails'
                    }
                },
                {
                    $unwind: '$vendorDetails'
                },
                {
                    $match: {
                        'vendorDetails.assigned_to': parseInt(id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'vendorDetails.assigned_to',
                        foreignField: 'user_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$userDetails'
                }
                // {
                //     $project: {
                //         _id: 1,
                //         vendor_id: 1,
                //         full_name: 1,
                //         phone_number: 1,
                //         address: 1,
                //         note: 1,
                //         status: 1,
                //         created_on: 1,
                //         updated_on: 1,
                //         'vendorDetails.vendor_name': 1,
                //         'userDetails.first_name': 1,
                //         'userDetails.last_name': 1
                //     }
                // }
            ]);

            if (!customerList || customerList.length === 0) {
                return res.status(400).json({ success: false, message: "Failed to get customer list" });
            }

            return res.status(200).json({ success: true, message: "Customer list", data: customerList });
        }

        if (role === 'SuperAdmin') {
            let customerList = await VendorsCustomers.aggregate([
                {
                    $lookup: {
                        from: 'vendors',
                        localField: 'vendor_id',
                        foreignField: 'vendor_id',
                        as: 'vendorDetails'
                    }
                },
                {
                    $unwind: '$vendorDetails'
                }, 
                {
                    $lookup: {
                        from: 'users',
                        localField: 'vendorDetails.assigned_to',
                        foreignField: 'user_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$userDetails'
                }
                // {
                //     $project: {
                //         _id: 1,
                //         vendor_id: 1,
                //         full_name: 1,
                //         phone_number: 1,
                //         address: 1,
                //         note: 1,
                //         status: 1,
                //         created_on: 1,
                //         updated_on: 1,
                //         'vendorDetails.vendor_name': 1,
                //         'userDetails.first_name': 1,
                //         'userDetails.last_name': 1
                //     }
                // }
            ]);

            if (!customerList || customerList.length === 0) {
                return res.status(400).json({ success: false, message: "Failed to get customer list" });
            }

            return res.status(200).json({ success: true, message: "Customer list", data: customerList });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
};


const addVendorCustomers = async (req,res,next) => {
    try{

        const customerAdd = await VendorsCustomers.create({
            vendor_id:req.body.vendor_id,
            full_name:req.body.full_name,
            phone_number:req.body.phone_number,
            address:req.body.address,
            note:req.body.note,
            status:'Pending',
            created_on:Date.now()
        })

        if(!customerAdd){
            return res.status(400).json({success:false,message:"Failed to add customer data."})
        }

        return res.status(200).json({success:true,message:"Cunstomer details added."})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getCustomerdetails = async (req,res,next) => {
    try{
        const customerData = await VendorsCustomers.findOne({vc_id:req.params.id})

        if(!customerData){
            return res.status(400).json({success:false,message:"Failed to fetch details",data:[]})
        }

        return res.status(200).json({success:true,message:"Customer details",data:customerData})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getAllAdminlist = async (req,res,next) => {
    try{
        const userList = await Users.find({role:'Admin',status:'Active'})

        return res.status(200).json({success:true,message:"User list",data:userList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateVendorCustomer = async (req,res,next) => {
    try{
        const customerData = await VendorsCustomers.findOne({vc_id:req.params.id})

        if(!customerData){
            return res.status(400).json({success:false,message:"Failed to update customer"})
        }

        customerData.full_name = req.body.full_name,
        customerData.phone_number = req.body.phone_number,
        customerData.address = req.body.address,
        customerData.note = req.body.note,
        customerData.status = 'Pending',
        customerData.updated_on = Date.now()

        await customerData.save();

        return res.status(200).json({success:true,message:"Customer updated successfully."})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateVendorCustomerStatus = async (req,res,next) => {
    try{
        // console.log(req.body)
        const customerData = await VendorsCustomers.findOne({vc_id:req.params.id})

        if(!customerData){
            return res.status(400).json({success:false,message:"Failed to update customer"})
        }

        customerData.status = req.body.status
        customerData.updated_on = Date.now()

        await customerData.save();

        return res.status(200).json({success:true,message:"Customer updated successfully."})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})``
    }
}

const deleteCustomer = async (req,res,next) => {
    try{
        const result = await VendorsCustomers.findOneAndDelete({ vc_id: req.params.id });

        if (!result) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        return res.status(200).json({ success: true, message: "Customer deleted successfully" });
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}


module.exports = {
    loginVendor,
    addVendorDetails,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    vendorCustomersList,
    addVendorCustomers,
    getCustomerdetails,
    updateVendorCustomer,
    deleteCustomer,
    getAllAdminlist,
    updateVendorCustomerStatus
}