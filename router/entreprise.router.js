const express = require('express')
const router = express.Router()
const controller = require('../controller/entreprise.controller')



router.route('/register')
        .post(controller.createEntreprise)

router.route('/login')
        .post(controller.loginEntreprise)

router.route('/AllEntreprises')
        .get(controller.getAllEntreprises)

router.route('/:id')
        .patch(controller.updateEntreprise)
        .delete(controller.deleteEntreprise)


module.exports=router