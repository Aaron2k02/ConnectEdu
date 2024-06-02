const express = require("express");
const {sendPasswordResetOTPEmail, verifyOTP, resetUserPassword} = require("../controller/otp.controller.js");
const router = express.Router();



router.post("/forgotPassword", async (req,res)=>{
    try{
        const {email} = req.body;
        const createdPasswordResetOTP = await sendPasswordResetOTPEmail({email});
        res.status(200).json(createdPasswordResetOTP);
        if (!email) throw Error("An email is required.");

    }catch (error){
        res.status(400).send(error.message);

    }
});

router.post("/forgotPassword/reset",async (req,res) =>{
    try{

        const {email,newPassword} = req.body;
        //const newPassword = req.body.newPassword;
        if (!email) throw Error("An email is required.");

        const changePass=await resetUserPassword({email,newPassword});
        res.status(200).json(changePass);



    }catch(error){
        throw error
    }
});

router.post("/forgotPassword/verify",async(req,res)=>{

    try{
        let{ email,otp} = req.body;
        if(!(email && otp)) throw Error("Empty otp details are not allowed");

        await verifyOTP({email,otp});
        res.status(200).json({email,verified:true});

    }catch (error){
        res.status(400).send(error.message);

    }

});

module.exports = router;