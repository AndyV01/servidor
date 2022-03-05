const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        console.log(file)
    }
      
})

const upload = multer({ storage: storage })
 
exports.upload = upload.single('file');