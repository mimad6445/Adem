const express = require('express')
const router = express.Router()
const controller = require('../controller/rapport.controller')
const virefytoken = require("../middlewares/virefytoken")



router.route('/')
        .post(virefytoken,controller.createrapport)
        .get(virefytoken,controller.getAllrapports)

router.route('/:id')
        .get(virefytoken,controller.getrapportById)
        .patch(virefytoken,controller.updaterapport)
        .delete(virefytoken,controller.deleterapport)

module.exports=router