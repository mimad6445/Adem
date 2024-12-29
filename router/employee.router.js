const express = require('express')
const router = express.Router()
const controller = require('../controller/employee.controller')




router.route('/')
        .post(controller.createEmployee)
        .get(controller.getAllEmployees)

router.route('/:id')
        .get(controller.getEmployeeById)
        .patch(controller.updateEmployee)
        .delete(controller.deleteEmployee)

module.exports=router