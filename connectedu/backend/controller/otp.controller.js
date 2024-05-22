
const generateOTP= require("./../utils/generateOtp.js");
const sendEmail= require("./../utils/sendEmail.js");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const {hashData,verifyHashedData} = require("./../utils/hashData.js")
const bcrypt = require("bcrypt");


const {AUTH_EMAIL} = process.env;

const sendOTP = async({ email, subject, message, duration = 1}) =>{
    try {
        if(!(email&&subject && message)){
            throw Error("Provide values for email,subject,message");
        }

        await Otp.deleteOne({email});
        const generatedOTP = await generateOTP();

        const mailOption={
            from:AUTH_EMAIL,
            to:email,
            subject,
            html:`<p>${message}<p><p style="color:tomator;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b>
            </p><p>This code <b> expires in ${duration} hour(s)<b>.</p>`,

        };
        await sendEmail(mailOption);

        // const hash = bcrypt.hashSync(generateOTP, 5);
        const hashedOTP = await hashData(generateOTP);
        const newOTP = await new Otp({
            email,
            otp:hashedOTP,
            createdAt:Date.now(),
            expiresAt:Date.now()+3600000 * +duration,

        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
       


    }catch (error){
        throw error;

    }
};

const sendPasswordResetOTPEmail = async ({email}) =>{
    try{

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw Error("There is no account for the provided email");
    }

    const otpDetails = {
        email,
        subject:"Password Reset",
        message:"Enter the code below to reset your password.",
        duration:1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;

    }catch(error){
        throw error;
    }
};

const resetUserPassword = async({email,newPassword}) =>{
    try{
       
        if(!(email && newPassword))
            throw Error("Empty credentials are not allowed");

        if (newPassword.length < 8){
            throw Error("Password is too short!");

        }
        const hashedNewPassword = bcrypt.hashSync(newPassword, 5);
        const finishChange=await User.updateOne({email},{password:hashedNewPassword});
        return finishChange;


    }catch (error){
        throw error;

    }
};

const verifyOTP = async({email,otp})=>{
    try{
        if(!(email&& otp)){
            throw Error("Provide values for OTP")
        }

        const matchedOTPRecord = await Otp.findOne({
            email
        });

        if(!matchedOTPRecord){
            throw Error("No otp records found");
        }
       
       
        // const isCorrect = bcrypt.compareSync(matchedOTPRecord.otp,otp);
        // if (!isCorrect) {
        //     return next(createError(400, "Wrong password or username!"));
        // }


        const {expiresAt} = matchedOTPRecord;
        if(expiresAt < Date.now()){
            await Otp.deleteOne({email});
            throw Error("Code has expired. Request for a new one.");

        }

        // const hashedOTP = matchedOTPRecord.otp;
        // const validOTP = await verifyHashedData(otp,hashedOTP);

        // // if(!validOTP){
        // //     throw Error("Invalid code passed. Check your inbox");
        // // }

      
        return;

       

    }catch(error){
        throw error;

    }
};


module.exports={sendOTP,sendPasswordResetOTPEmail,verifyOTP,resetUserPassword};