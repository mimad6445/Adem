const jwt = require("jsonwebtoken");
const httpStutsText = require("../utils/httpStatusText");
require("dotenv").config();
const httpStatusText = require("../utils/httpStatusText");

module.exports = async(req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({status: httpStutsText.UNAUTHORIZED, msg: "token require"})
    }
    try{
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(400).json({status: httpStatusText.ERROR,msg: "Invalid token format",});
        }
        const token = authHeader.split(' ')[1];
        
        const currentuser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentuser = currentuser
        next();
    }catch(e){
        res.status(400).json({status: httpStutsText.ERROR, msg: e.message})
    } 
}