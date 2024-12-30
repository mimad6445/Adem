const express = require('express')
const router = express.Router()
const controller = require('../controller/folderMedical.controller')
const multer = require("multer")
const httpStatusText = require('../utils/httpStatusText')
const virefytoken = require("../middlewares/virefytoken")


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `bilan-${Date.now()}.${ext}`
        cb(null,filename)
    }
})
const upload = multer({ storage: diskStorage ,
fileFilter: (req,file,cb)=>{
    const filetype = file.mimetype.split('/')[0];
    // if(filetype === "image"){
    //     return cb(null,true);
    // }
    // else{
    //     return cb(new Error('Only image files are allowed!'),false);
    // }
    return cb(null,true);
}})



router.route('/')
        .post(virefytoken,upload.single('bilan'),controller.createfolderMedical)
        .get(virefytoken,controller.getAllfolderMedicals)


router.route('/addRapport/:id')
        .post(virefytoken,controller.addRapportToFolder) //add rapport to folderMedical

router.route('/:id')
        .patch(virefytoken,controller.updatefolderMedical)
        .delete(virefytoken,controller.deletefolderMedical)

module.exports=router