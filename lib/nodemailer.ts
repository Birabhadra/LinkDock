import nodemailer from "nodemailer";
import welcomeEmail from "../emailTemplates/welcomeEmail.js";
import passwordResetEmail from "../emailTemplates/passwordResetEmail.js";
import PasswordResetSuccessEmail from "../emailTemplates/PasswordResetSuccessEmail.js";
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type: 'OAuth2',
        user:process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN
    },
});
transporter.verify((error,success)=>{
    if (error){
        console.error("Error connecting to email server:",error);
    }else{
        console.log("Email server is ready to send messages")
    }
});

const sendEmail=async(to:string,subject:string,text:string,html:string)=>{
    try{
        const info=await transporter.sendMail({
            from:`LinkDock <no-reply@company.com>`,
            to,
            subject,
            text,
            html
        });

        console.log(`Message sent ${info.messageId}`);
        console.log(`preview URL ${nodemailer.getTestMessageUrl(info)}`)
    }catch(error:any){
        console.log("Error sending email",error)
    }
        
}

const sendWelcomeEmail= async (userEmail:string)=>{
    try{
        const subject="Welcome to Linkdock"
        await sendEmail(
            userEmail,subject,welcomeEmail(),welcomeEmail()
        )
    } catch(error:any){
        console.log("Error sending registration email:",error.message)
    }
}
const sendPassResetSuccessEmail= async (userEmail:string,userName:string)=>{
    try{
        const subject="Password reset successfull"
        await sendEmail(
            userEmail,subject,PasswordResetSuccessEmail(userName),PasswordResetSuccessEmail(userName)
        )
    } catch(error:any){
        console.log("Error sending reset success email:",error.message)
    }
}
const sendPassResetEmail= async (userEmail:string,userName:string,url:string)=>{
    try{
        const subject="Reset your password"
        await sendEmail(
            userEmail,subject,passwordResetEmail(userName,url),passwordResetEmail(userName,url)
        )
    } catch(error:any){
        console.log("Error sending reset email:",error.message)
    }
}

export{
    sendWelcomeEmail,
    sendPassResetEmail,
    sendPassResetSuccessEmail
}