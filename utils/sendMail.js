const nodemailer = require('nodemailer');





const sendMail = async (otp, email)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL, 
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: process.env.MAIL ,
        to: email,
        subject: 'Adem Otp', 
        html: `<center>
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #eee;">
            <div style="font-family: Arial, sans-serif; width:500px; heigth:500px background-color: #f3f4f6;">
                <h1 style="color: #333;">Aden Verification Code</h1>
                <p style="font-size: 16px;">Your Adem verification code is <strong>${otp}</strong>.</p>
            </div>
        </div>
    </center>
    
        `,
        attachments: [
            // {
            //     filename: 'nbtha.png',
            //     path: '../../nebtha.png',
            //     cid: 'nebtha'
            // }
        ]
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = sendMail