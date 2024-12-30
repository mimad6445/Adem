const mongoose = require('mongoose')

const FolderMedicalSchema = new mongoose.Schema({
    employee : {type: mongoose.Types.ObjectId,ref : "employee",required: true},
    employeeHeight: {type: String,required: true},
    employeeWeight: {type: String,required: true},
    bilan : {type: String,required: true},
    Rapport : [{type: mongoose.Types.ObjectId,ref : "Rapport"}],
},{timestamps: true});

module.exports= mongoose.model('FolderMedical', FolderMedicalSchema);