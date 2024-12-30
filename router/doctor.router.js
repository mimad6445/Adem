const express = require('express')
const router = express.Router()
const controller = require('../controller/doctor.controller')
const otp = require('../controller/otp.controller')
const virefytoken = require("../middlewares/virefytoken")


router.route('/register')
        .post(controller.createDoctor)

router.route('/login')
        .post(controller.loginDoctor)

router.route('/AllDoctors')
        .get(virefytoken,controller.getAllDoctors)

router.route('/:id')
        .patch(virefytoken,controller.updateDoctor)
        .delete(virefytoken,controller.deleteDoctor)


module.exports=router