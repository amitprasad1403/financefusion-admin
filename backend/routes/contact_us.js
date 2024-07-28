const express = require('express')
const {addEnquries,getEnquiries,updateStatus,getDetailsById} = require('../controller/ContactUs_controller')
const router = express.Router();

router.post("/add",addEnquries);
router.get("/list",getEnquiries);
router.post("/updateStatus/:id",updateStatus);
router.get("/getDetails/:id",getDetailsById);

module.exports = router;