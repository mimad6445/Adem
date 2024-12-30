const express = require('express')
const router = express.Router()
const controller = require('../controller/employee.controller')
const virefytoken = require("../middlewares/virefytoken")



router.route('/')
        .post(virefytoken,controller.createEmployee)
        .get(virefytoken,controller.getAllEmployees)

router.route('/:id')
        .get(virefytoken,controller.getEmployeeById)
        .patch(virefytoken,controller.updateEmployee)
        .delete(virefytoken,controller.deleteEmployee)

module.exports=router