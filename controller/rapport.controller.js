const rapport = require('../models/rapport.model');
const doctorDb = require('../models/doctor.model');
const httpStatusText = require("../utils/httpStatusText");

const createrapport = async (req, res) => {
    try {
        const {Rapport,doctor,employee} = req.body;
        const existingDoctor = await doctorDb.findById(doctor);
            if(!existingDoctor){
                    return res.status(400).json({ status: httpStatusText.SUCCESS, mesg: "doctor not found"});
            }
        const newrapport = await rapport.create({
            Rapport,
            doctor,
            employee
        });
        await newrapport.save();
        res.status(201).json({status:httpStatusText.SUCCESS , message: "rapport created successfully", data: newrapport });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating rapport", error: error.message });
    }
}


const getAllrapports = async (req, res) => {
    try {
        const rapports = await rapport.find();
        res.status(200).json({status:httpStatusText.SUCCESS , data: rapports });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching rapports", error: error.message });
    }
}


const getrapportById =  async (req, res) => {
    try {
        const rapportId = req.params.id; 
        const existingrapport = await rapport.findById(rapportId);
        if (!existingrapport) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "rapport not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , data: existingrapport });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching rapport", error: error.message });
    }
}


const updaterapport = async (req, res) => {
    try {
        const rapportId = req.params.id;
        const updateData = req.body; 
        const updatedrapport = await rapport.findByIdAndUpdate(rapportId,updateData);
        if (!updatedrapport) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "rapport not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "rapport updated successfully", data: updatedrapport });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error updating rapport", error: error.message });
    }
}

const deleterapport = async (req, res) => {
    try {
        const rapportId = req.params.id; 
        const deletedrapport = await rapport.findByIdAndDelete(rapportId);
        if (!deletedrapport) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "rapport not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "rapport deleted successfully"});
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error deleting rapport", error: error.message });
    }
}


module.exports = {
    createrapport,
    getAllrapports,
    getrapportById,
    updaterapport,
    deleterapport
}