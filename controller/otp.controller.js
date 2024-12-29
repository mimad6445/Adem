const Otp = require("../middlewares/VirefyOtp")

const otpLoginEmail = async(req,res,next)=>{
    try {
        Otp.createOtpEmail(req.body,(err,result)=>{
            if(err) return res.status(400).json({success : httpStatusText.ERROR , data : err })
            return res.status(200).json({success : httpStatusText.SUCCESS , data : result })
        })
    } catch (error) {
        res.status(400).json({success : httpStatusText.ERROR , error: error.message });
    }
}


const virefyOtpEmail = async(req,res,next)=>{
    try {
        Otp.virefyOtpEmail(req.body,(err,result)=>{
            if(err) return next(err)
            return res.status(200).json({success : httpStatusText.SUCCESS , data : result })
        })
    } catch (error) {
        res.status(400).json({success : httpStatusText.ERROR , error: error.message });
    }
}

module.exports = {
    otpLoginEmail,
    virefyOtpEmail 
}