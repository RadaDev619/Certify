const mongoose = require('mongoose');

const instituteOtpVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: 'Institute', // Reference to the Institute model
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Create the UserOtpVerification model
const InstituteOtpVerification = mongoose.model('InstituteOtpVerification', instituteOtpVerificationSchema);

module.exports = InstituteOtpVerification;
