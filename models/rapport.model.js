const mongoose = require('mongoose')

const RapportSchema = new mongoose.Schema({
    Rapport : {type: String,required: true},
    doctor : {type : mongoose.Types.ObjectId,ref : "doctor",required: true},
    employee : {type : mongoose.Types.ObjectId,ref : "employee",required: true},
    DateRapport : {type: String,default: new Date().toLocaleDateString()},
},{timestamps: true});

module.exports= mongoose.model('Rapport', RapportSchema);