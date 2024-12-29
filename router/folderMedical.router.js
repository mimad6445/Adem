const express = require('express')
const router = express.Router()
const controller = require('../controller/folderMedical.controller')
const multer = require("multer")
const httpStatusText = require('../utils/httpStatusText')



const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`
        cb(null,filename)
    }
})
const upload = multer({ storage: diskStorage ,
fileFilter: (req,file,cb)=>{
    const filetype = file.mimetype.split('/')[0];
    if(filetype === "image"){
        return cb(null,true);
    }
    else{
        return cb(AppError.create("file must be image",400,httpStatusText.FAIL),false);
    }
}})



router.route('/')
        .post(upload.single('bilan'),controller.createfolderMedical)
        .get(controller.getAllfolderMedicals)


router.route('/addRapport/:id')
        .post(controller.addRapportToFolder) //add rapport to folderMedical

router.route('/:id')
        .patch(controller.updatefolderMedical)
        .delete(controller.deletefolderMedical)

module.exports=router