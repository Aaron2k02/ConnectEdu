const nodemailer=require("nodemailer");


let transporter = nodemailer.createTransport({
    host:"smtp-mail.outlook.com",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS,
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