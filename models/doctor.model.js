const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    fullName: {type: String,required: true},
    WorkPlace: {type: String,required: true},
    dateOfBirth : {type: String,required: true},
    dateOfStartWork: {type: String,required: true},
    email : {type: String,required: true,unique: true},
    telephone : {type: String,required: true},
    password : {type: String,required: true},
    token: {type: String},
},{timestamps: true});

module.exports= mongoose.model('doctor', doctorSchema);