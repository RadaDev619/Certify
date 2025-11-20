const InstituteOtpVerification = require('../model/instituteOtpVerification');
const {userOtpVerificationEmail} = require('../utility/email');
const bcrypt = require('bcrypt');

async function generateInsAuthOTP(user) {
    let otp = Math.floor(100000 + Math.random() * 900000);

    try {
        await userOtpVerificationEmail({ email: user.email, otp: otp });

        const hashedOtp = await bcrypt.hash(otp.toString(), 12); // Convert OTP to string before hashing

        const newOtpVerification = new InstituteOtpVerification({
            email: user.email,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        await newOtpVerification.save();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {generateInsAuthOTP};