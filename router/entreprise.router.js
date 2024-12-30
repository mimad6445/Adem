const express = require('express')
const router = express.Router()
const controller = require('../controller/entreprise.controller')
const virefytoken = require("../middlewares/virefytoken")


router.route('/register')
        .post(controller.createEntreprise)

router.route('/login')
        .post(controller.loginEntreprise)

router.route('/AllEntreprises')
        .get(virefytoken,controller.getAllEntreprises)

router.route('/:id')
        .patch(virefytoken,controller.updateEntreprise)
        .delete(virefytoken,controller.deleteEntreprise)


module.exports=router