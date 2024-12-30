const entreprise = require('../models/entreprise.model');
const httpStatusText = require("../utils/httpStatusText");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const createEntreprise = async (req, res) => {
    try {
        const {NumeroRegistre,GroupeIndus,NomEts,AdresseEts,Secteur ,email,telephone,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newentreprise = await entreprise.create({
            NumeroRegistre,
            GroupeIndus,
            NomEts,
            AdresseEts,
            Secteur,
            email,
            telephone,
            password: hashedPassword
        });
        const token = await generateToken({ email:email , id: newentreprise._id });
        newentreprise.token = token;
        await newentreprise.save();
        res.status(201).json({status:httpStatusText.SUCCESS , message: "entreprise created successfully", data: newentreprise });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating entreprise", error: error.message });
    }
}

const loginEntreprise = async (req,res) => {
    try {
        const {email,password} = req.body;
        const existingEnterprise = await entreprise.findOne({ email });
        if(!existingEnterprise){
            res.status(404).json({status:httpStatusText.FAIL , message: "Enterprise not found" });
        }
        const isPasswordValid = await bcrypt.compare(password,existingEnterprise.password);
        if(!isPasswordValid){
            res.status(404).json({status:httpStatusText.FAIL , message: "Password not much" });
        }
        const token = await generateToken({ email:email , id: existingEnterprise.id });
        existingEnterprise.token = token ;
        await existingEnterprise.save();
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Enterprise logged in successfully", token: token });
    } catch (e) {
        
    }
}

const getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await entreprise.find();
        res.status(200).json({status:httpStatusText.SUCCESS , data: entreprises });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching entreprises", error: error.message });
    }
}


const getEntrepriseById =  async (req, res) => {
    try {
        const entrepriseId = req.params.id; 
        const existingentreprise = await entreprise.findById(entrepriseId);
        if (!existingentreprise) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "entreprise not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , data: existingentreprise });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching entreprise", error: error.message });
    }
}


const updateEntreprise = async (req, res) => {
    try {
        const entrepriseId = req.params.id;
        const updateData = req.body; 
        const updatedentreprise = await entreprise.findByIdAndUpdate(entrepriseId,updateData);
        if (!updatedentreprise) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "entreprise not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "entreprise updated successfully", data: updatedentreprise });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error updating entreprise", error: error.message });
    }
}

const deleteEntreprise = async (req, res) => {
    try {
        const entrepriseId = req.params.id; 
        const deletedentreprise = await entreprise.findByIdAndDelete(entrepriseId);
        if (!deletedentreprise) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "entreprise not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "entreprise deleted successfully"});
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error deleting entreprise", error: error.message });
    }
}


module.exports = {
    createEntreprise,
    loginEntreprise,
    getAllEntreprises,
    getEntrepriseById,
    updateEntreprise,
    deleteEntreprise
}