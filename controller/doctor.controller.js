const doctor = require('../models/doctor.model');
const { nanoid } = import('nanoid');
const httpStatusText = require("../utils/httpStatusText");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const createDoctor = async (req, res) => {
    try {
        const {fullName,WorkPlace,dateOfBirth,dateOfStartWork,email,telephone,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const existingEmail = await doctor.findOne({ email });
        if(existingEmail){
            res.status(400).json({ status: httpStatusText.SUCCESS, mesg: "E-mail already exists"});
        }
        const newDoctor = await doctor.create({
            id : nanoid(10),
            fullName,
            WorkPlace,
            dateOfBirth,
            dateOfStartWork,
            email,
            telephone,
            password: hashedPassword
        });
        const token = await generateToken({ email:email , id: newDoctor.id });
        addNewAccount.token = token;
        await newDoctor.save();
        res.status(201).json({status:httpStatusText.SUCCESS , message: "Doctor created successfully", data: newDoctor });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating doctor", error: error.message });
    }
}

const loginDoctor = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existingDoctor = await doctor.findOne({ email });
        if(!existingDoctor){
            res.status(404).json({status:httpStatusText.FAIL , message: "Doctor not found" });
        }
        const isPasswordValid = await bcrypt.compare(password,existingDoctor.password);
        if(!isPasswordValid){
            res.status(404).json({status:httpStatusText.FAIL , message: "Password not much" });
        }
        const token = await generateToken({ email:email , id: existingDoctor.id });
        existingDoctor.token = token ;
        await existingDoctor.save();
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Doctor logged in successfully", token: token });
    }catch(e){
        res.status(500).json({status:httpStatusText.ERROR , message: "Error logging in doctor", error: e.message });
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctor.find();
        res.status(200).json({status:httpStatusText.SUCCESS , data: doctors });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching doctors", error: error.message });
    }
}


const getDoctorById =  async (req, res) => {
    try {
        const doctorId = req.params.id; 
        const existingdoctor = await doctor.findById(doctorId);
        if (!existingdoctor) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Doctor not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , data: existingdoctor });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching doctor", error: error.message });
    }
}


const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const updateData = req.body; 
        const updatedDoctor = await doctor.findByIdAndUpdate(doctorId,updateData);
        if (!updatedDoctor) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Doctor not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error updating doctor", error: error.message });
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id; 
        const deletedDoctor = await doctor.findByIdAndDelete(doctorId);
        if (!deletedDoctor) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Doctor not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Doctor deleted successfully"});
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error deleting doctor", error: error.message });
    }
}

module.exports = {
    createDoctor,
    loginDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
}