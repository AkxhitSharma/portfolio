const express= require('express')
const router = express.Router();
const {getresponse}= require('../controllers/response')

router.get('/getresponse',getresponse)

module.exports = router;