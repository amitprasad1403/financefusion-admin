const express = require('express')
const {
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
} = require('../controller/Customer_controller')
const upload = require('../middleware/upload')
const router = express.Router()

router.post("/add",addCustomer)
router.get("/verifyEmail",verifyEmail)
router.post("/login",sendOtp)
router.post("/checkLogin",checkLogin)
router.get("/details/:id",getCustomerData)
router.get("/dashboardCount/:id",getDashboardCount)
router.get("/list",getAllCustomersList)
router.post("/addEnquiry/:id",upload.single('file'),addEnquiry)
router.get("/enquries",getAllEnquries)
router.post("/convertEnquiry",convertEnquiry)
router.get("/leads/:role/:id",getAdminLeads)
router.get("/leadsDetail/:id",getLeadDetails)
router.post("/updateLead/:id",updateLead)


module.exports = router;