const mongoose = require('mongoose')

const EntrepriseSchema = new mongoose.Schema({
    NumeroRegistre: {type: String,required: true},
    GroupeIndus: {type: String,required: true},
    NomEts : {type: String,required: true},
    AdresseEts: {type: String,required: true},
    Secteur : {type: String,required: true},
    email : {type: String,required: true,unique: true},
    telephone : {type: String,required: true},
    password : {type: String,required: true},
    token: {type: String},
},{timestamps: true});

module.exports= mongoose.model('entreprise', EntrepriseSchema);