const UserOtpVerification = require('../model/userOtpVerification');
const { userOtpVerificationEmail } = require('../utility/email');
const bcrypt = require('bcrypt');

async function generateAuthOTP(user) {
    let otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)

    try {

        const hashedOtp = await bcrypt.hash(otp.toString(), 12); // Convert OTP to string before hashing

        const newOtpVerification = new UserOtpVerification({
            email: user.email,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        await newOtpVerification.save();
        userOtpVerificationEmail({ email: user.email, otp });


        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = { generateAuthOTP };