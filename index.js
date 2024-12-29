const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./connection/Connectdb');
const httpStatusText = require('./utils/httpStatusText');

const app = express()
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

const folderMedicalRouter = require('./router/folderMedical.router');
const doctorRouter = require('./router/doctor.router');
const employeeRouter = require('./router/employee.router');
const entrepriseRouter = require('./router/entreprise.router');
const rapportRouter = require('./router/rapport.router');
const otpRouter = require('./router/otp.router');

app.use('/api/folderMedical',folderMedicalRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/entreprise',entrepriseRouter);
app.use('/api/rapport',rapportRouter);
app.use('/api/otp',otpRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({ status: httpStatusText.ERROR, msg: "Cannot find data" });
});


app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})