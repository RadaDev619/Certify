const mongoose = require('mongoose');

const userOtpVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: 'User', // Reference to the User model
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
const UserOtpVerification = mongoose.model('UserOtpVerification', userOtpVerificationSchema);

module.exports = UserOtpVerification;
