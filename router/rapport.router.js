const express = require('express')
const router = express.Router()
const controller = require('../controller/rapport.controller')




router.route('/')
        .post(controller.createrapport)
        .get(controller.getAllrapports)

router.route('/:id')
        .get(controller.getrapportById)
        .patch(controller.updaterapport)
        .delete(controller.deleterapport)

module.exports=router