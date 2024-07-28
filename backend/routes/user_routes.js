const express = require('express')
const {addUserDetails,loginUser,getAllUsers,deleteUser,getUserById,updateUser} = require('../controller/User_controller')
const router = express.Router()

router.post("/addUser",addUserDetails)
router.post("/login",loginUser)
router.get("/list",getAllUsers)
router.get("/get/:id",getUserById)
router.post("/delete/:id",deleteUser)
router.post("/update/:id",updateUser)

module.exports = router