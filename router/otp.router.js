const express = require('express')
const router = express.Router()
const otp = require('../controller/otp.controller')


router.route('/sendOtp')
        .post(otp.otpLoginEmail)

router.route('/verifyOtp')
        .post(otp.virefyOtpEmail)


module.exports=router