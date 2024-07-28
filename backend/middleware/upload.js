const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,'./public/enquiry/userIdentity')
    },
    filename: function(req,file,cb){
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
        return cb(null, `${timestamp}_${originalName}`);
    }
})

const upload = multer({storage})

module.exports = upload