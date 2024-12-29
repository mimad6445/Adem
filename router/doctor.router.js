const express = require('express')
const router = express.Router()
const controller = require('../controller/doctor.controller')
const otp = require('../controller/otp.controller')



router.route('/register')
        .post(controller.createDoctor)

router.route('/login')
        .post(controller.loginDoctor)

router.route('/AllDoctors')
        .get(controller.getAllDoctors)

router.route('/:id')
        .patch(controller.updateDoctor)
        .delete(controller.deleteDoctor)


module.exports=router