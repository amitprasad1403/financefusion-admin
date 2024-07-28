const express = require('express');
const {
    loginVendor,
    getAllVendors,
    addVendorDetails,
    getVendorById,
    updateVendor,
    deleteVendor,
    addVendorCustomers,
    vendorCustomersList,
    getCustomerdetails,
    updateVendorCustomer,
    deleteCustomer,
    getAllAdminlist,
    updateVendorCustomerStatus
} = require("../controller/Vendors_controller");
const router = express.Router();

router.post("/login",loginVendor)   
router.post("/add",addVendorDetails)   
router.get("/list",getAllVendors)
router.get("/get/:id",getVendorById)
router.post("/delete/:id",deleteVendor)
router.post("/update/:id",updateVendor)
router.post("/updateStatus/:id",updateVendorCustomerStatus)
router.post("/addCustomer",addVendorCustomers)
router.get("/customerList/:role/:id",vendorCustomersList)
router.get("/getCustomer/:id",getCustomerdetails)
router.post("/updateCustomer/:id",updateVendorCustomer)
router.post("/deleteCustomer/:id",deleteCustomer)
router.get("/userList",getAllAdminlist)

module.exports = router;