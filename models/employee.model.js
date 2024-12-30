const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    fullName: {type: String,required: true},
    code: {type: String,required: true},
    dateOfBirth : {type: String,required: true},
    dateOfStartWork: {type: String,required: true},
    email : {type: String,required: true,unique: true},
    telephone : {type: String,required: true},
    entrprise : {type: mongoose.Types.ObjectId,ref : "entreprise",required: true},
    folderMedical : {type: mongoose.Types.ObjectId,ref : "FolderMedical"},
},{timestamps: true});

module.exports= mongoose.model('employee', EmployeeSchema);