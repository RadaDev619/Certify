const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY2);

const userOtpVerificationEmail = (data) => {

    console.log("jsxa", data.otp)

    sgMail.send({
        to: data.email,
        from: "radabisdorji@gmail.com",
        subject: "Account verification",
        text: `Your OTP is ${data.otp}`,
        html: `<p>Enter <b>${data.otp}</b> in the application to verify your email address and complete the signup process.<br> This code expires in <b>1 hour</b></p>`,
        template_id: "d-b34896fa975f4cbdbfc4b6eea6857f14",
        dynamic_template_data: {
            otp: data.otp,
        }
    })
}

module.exports = { userOtpVerificationEmail };