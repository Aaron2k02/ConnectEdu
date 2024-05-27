const nodemailer = require("nodemailer");
// Load environment variables from .env file
require('dotenv').config();

// Trim whitespace from environment variables
const authEmail = process.env.AUTH_EMAIL;
const authPass = process.env.AUTH_PASS;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: authEmail,
        pass: authPass,
    }
});

transporter.verify((error,success)=>{
    if(error){
        console.log(error);

    }else{
        console.log("Ready for messages");
        console.log(success);
    }

});

const sendEmail = async(mailOption) =>{
    try{
        await transporter.sendMail(mailOption);
        return;
    }catch (error){
        throw error;

    }
};

module.exports=sendEmail;