const folderMedical = require('../models/Foldermedical.model');
const employee = require('../models/employee.model');
const httpStatusText = require("../utils/httpStatusText");
const rapportModel = require('../models/rapport.model');

const createfolderMedical = async (req, res) => {
    try {
        const {employeeHeight,employeeWeight,Rapport,employe} = req.body;
        const existingEmployee = await employee.findById(employe);
            if(!existingEmployee){
                return res.status(400).json({ status: httpStatusText.FAIL, mesg: "employee not found"});
            }
        const newfolderMedical = await folderMedical.create({
            bilan : req.file.filename,
            Rapport,
            employeeHeight,
            employeeWeight,
            employee:employe
        });
        existingEmployee.folderMedical = newfolderMedical._id;
        await existingEmployee.save()
        await newfolderMedical.save();
        res.status(201).json({status:httpStatusText.SUCCESS , message: "folderMedical created successfully", data: newfolderMedical });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating folderMedical", error: error.message });
    }
}

const addRapportToFolder = async (req,res) => {
    try {
        const folderMedicalId = req.params.id
        const { rapportId } = req.body
        const existingfolderMedical = await folderMedical.findById(folderMedicalId);
            if (!existingfolderMedical) {
                return res.status(404).json({status:httpStatusText.FAIL , message: "folderMedical not found" });
            }
        const existingRapport = await rapportModel.findOne({ id: rapportId });
            if(!existingRapport){
                res.status(400).json({ status: httpStatusText.FAIL, mesg: "rapport not found"});
            }
        existingfolderMedical.Rapport = rapportId;
        await existingfolderMedical.save()
        res.status(201).json({status:httpStatusText.SUCCESS , message: "Rapport added successfully to  folderMedical", data: existingfolderMedical });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating folderMedical", error: error.message });
    }
}


const getAllfolderMedicals = async (req, res) => {
    try {
        const folderMedicals = await folderMedical.find();
        res.status(200).json({status:httpStatusText.SUCCESS , data: folderMedicals });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching folderMedicals", error: error.message });
    }
}


const getfolderMedicalById =  async (req, res) => {
    try {
        const folderMedicalId = req.params.id; 
        const existingfolderMedical = await folderMedical.findById(folderMedicalId);
        if (!existingfolderMedical) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "folderMedical not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , data: existingfolderMedical });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching folderMedical", error: error.message });
    }
}


const updatefolderMedical = async (req, res) => {
    try {
        const folderMedicalId = req.params.id;
        const updateData = req.body; 
        const updatedfolderMedical = await folderMedical.findByIdAndUpdate(folderMedicalId,updateData);
        if (!updatedfolderMedical) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "folderMedical not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "folderMedical updated successfully", data: updatedfolderMedical });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error updating folderMedical", error: error.message });
    }
}

const deletefolderMedical = async (req, res) => {
    try {
        const folderMedicalId = req.params.id; 
        const deletedfolderMedical = await folderMedical.findByIdAndDelete(folderMedicalId);
        if (!deletedfolderMedical) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "folderMedical not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "folderMedical deleted successfully"});
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error deleting folderMedical", error: error.message });
    }
}


module.exports = {
    createfolderMedical,
    addRapportToFolder,
    getAllfolderMedicals,
    getfolderMedicalById,
    updatefolderMedical,
    deletefolderMedical
}