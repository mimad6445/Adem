const employee = require('../models/employee.model');
const entreprise = require('../models/entreprise.model');
const { nanoid } = import('nanoid');
const httpStatusText = require("../utils/httpStatusText");

const createEmployee = async (req, res) => {
    try {
        const {fullName,code,dateOfBirth,dateOfStartWork,email ,telephone,entrprise} = req.body;
        const existingEnterprise = await entreprise.findOne({ id: entrprise });
            if(!existingEnterprise){
                    res.status(400).json({ status: httpStatusText.SUCCESS, mesg: "Entreprise not found"});
            }
        const newEmployee = await employee.create({
            id : nanoid(10),
            fullName,
            code,
            dateOfBirth,
            dateOfStartWork,
            email,
            telephone,
            entrprise
        });
        await newEmployee.save();
        res.status(201).json({status:httpStatusText.SUCCESS , message: "Employee created successfully", data: newEmployee });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR ,message: "Error creating employee", error: error.message });
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employee.find();
        res.status(200).json({status:httpStatusText.SUCCESS , data: employees });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching employees", error: error.message });
    }
}


const getEmployeeById =  async (req, res) => {
    try {
        const employeeId = req.params.id; 
        const existingemployee = await employee.findById(employeeId);
        if (!existingemployee) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Employee not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , data: existingemployee });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error fetching employee", error: error.message });
    }
}


const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updateData = req.body; 
        const updatedEmployee = await employee.findByIdAndUpdate(employeeId,updateData);
        if (!updatedEmployee) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Employee not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Employee updated successfully", data: updatedEmployee });
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error updating Employee", error: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id; 
        const deletedEmployee = await employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({status:httpStatusText.FAIL , message: "Employee not found" });
        }
        res.status(200).json({status:httpStatusText.SUCCESS , message: "Employee deleted successfully"});
    } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR , message: "Error deleting employee", error: error.message });
    }
}


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}