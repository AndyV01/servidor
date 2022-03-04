const express = require('express')

const controller = require('../controllers/upload')
const router = express.Router()

router.post('/', controller.upload, 
    (req, res) => {
        res.redirect('/archivos')
    }
)
module.exports = {
    router: router
}