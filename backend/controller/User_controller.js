const Users = require('../model/Users')
const bcryptJs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const addUserDetails = async (req,res,next) => {
    try{

        // console.log(req.body)
        const checkUsername = await Users.findOne({username:req.body.username,status:'Active'})
        if(checkUsername){
            return res.status(400).json({success:false,message:"Username already exists."})
        }

        const checkEmail = await Users.findOne({email:req.body.email,status:'Active'})
        if(checkEmail){
            return res.status(400).json({success:false,message:"Email already exists."})
        }

        const checkPhoneNumber = await Users.findOne({phone_number:req.body.phone_number,status:'Active'})
        if(checkPhoneNumber){
            return res.status(400).json({success:false,message:"Phone number already exists"})
        }

        // console.log("Here")

        const salt = await bcryptJs.genSalt(10)
        const secure_pass = await bcryptJs.hashSync(req.body.password,salt)
        
        const addUser = await Users.create({
            username:req.body.username,
            password:secure_pass,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            role:req.body.role,
            status:'Active',
            phone_number:req.body.phone_number,
            created_on:Date.now(),
        })

        if(!addUser){
            return res.status(400).json({success:false,message:"Failed to add user."})
        }

        return res.status(200).json({success:true,message:"User added successfully",data:addUser})

    }
    catch(err){
        res.status(400).json({err})
    }
} 

const loginUser = async (req,res,next) => {
    try{
        // console.log("Login user :- ",req.body)
        const userData = await Users.findOne({username:req.body.username,status:'Active'})
        if(!userData){
            return res.status(400).json({success:false,message:"User not found."})
        }
        // console.log(userData);
        const comparePass = await bcryptJs.compare(req.body.password,userData.password);
        if(!comparePass){
            return res.status(400).json({success:false,message:"Incorrect password."})
        }

        const data = {
            user_id:userData.user_id,
            username:userData.username,
            full_name:userData.first_name+' '+userData.last_name, 
            email:userData.email,
            phone_number:userData.phone_number,
            role:userData.role,
        }

        const auth_token = jwt.sign(data,process.env.SECRET_KEY);

        return res.status(200).json({success:true,message:"User logged in successfully",data:data,tocken:auth_token})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getAllUsers = async (req,res,next) => {
    try{
        const usersList = await Users.find()

        if(!usersList){
            return res.status(400).json({success:false,message:"Failed to get user list."})
        }

        // console.log(usersList)

        return res.status(200).json({success:true,message:"User list.",data:usersList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getUserById = async (req,res,next) => {
    try{
        const userDetails = await Users.findOne({user_id:req.params.id})

        if(!userDetails){
            return res.status(400).json({success:false,message:"Failed to get user data."})
        }

        // console.log(userDetails)

        return res.status(200).json({success:true,message:"User data.",data:userDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateUser = async (req,res,next) => {
    try{
        const userData = await Users.findOne({user_id:req.params.id})

        if(!userData){
            return res.status(400).json({success:false,message:"Failed to update user details"})
        }
        
        const comparePass = await bcryptJs.compare(req.body.password,userData.password);
        if(!comparePass){
            const salt = await bcryptJs.genSalt(10)
            var secure_pass = await bcryptJs.hashSync(req.body.password,salt)
        }

        userData.username = req.body.username,
        userData.password = secure_pass,
        userData.first_name = req.body.first_name,
        userData.last_Name = req.body.last_Name,
        userData.email = req.body.email,
        userData.phone_number = req.body.phone_number, 
        userData.status = req.body.status

        await userData.save()

        return res.status(200).json({success:true,message:"User updated successfully."})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const deleteUser = async (req,res,next) => {
    try{
        const userData = await Users.findOne({user_id:req.params.id})

        if(!userData){
            return res.status(200).json({success:false,message:"Failed to delete user."})
        }

        userData.status = 'In-Active'

        await userData.save()

        return res.status(200).json({success:true,message:"User deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

module.exports = {addUserDetails,loginUser,getAllUsers,getUserById,updateUser,deleteUser}