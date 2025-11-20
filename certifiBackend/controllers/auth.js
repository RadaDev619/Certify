const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAuthOTP } = require("../utility/otp");
const UserOtpVerification = require("../model/userOtpVerification");
const { getImageUrl } = require('../utility/cloudinary');
const cloudinary = require('cloudinary').v2;

const Institute = require("../model/institute");

cloudinary.config({
  cloud_name: "dcwi7rrhk",
  api_key: "858788497628611",
  api_secret: "u5hL7Y_-nq94yXus6gQ32qpZ2K0",
});

export const register = async (req, res) => {
  const { name, email, photo, password } = req.body;
  if (!name) return res.status(400).send("Name is required");

  //password length validation for debugging
  if (!password || password.length < 6)
    return res.status(400).send("Password should be a minimum of 6 characters");

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ error: "Email is taken" });

    const otp = await generateAuthOTP({ email });
    if (!otp) {
      return res.status(400).json({ status: "Failed", message: "OTP not generated" })
    }

    // Create a new user instance
    const newUser = await User.create({ name, email, photo, password });
    if (!newUser) {
      return res.status(400).json({ status: "Failed", message: "User not created" })
    }

    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "failed",
      message: error.message
    })
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    if (!user.verified) {
      res.status(400).json({ status: "Failed", message: "User not verified" })
    } else {
      if (user) {
        const AuthToken = await user.generateAuthToken();
        res.cookie("session_id", AuthToken)

        res.status(200).json({ message: "Credentail Matched", status: "Success" })
      } else {
        res.status(400).json({ message: "Invalid Credential", status: "Failed" })
      }
    }
  } catch (e) {
    res.status(400).send(e)
  }
}

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ status: "Failed", message: "Empty OTP details are not allowed." });
    }

    const userOTPVerificationRecords = await UserOtpVerification.find({ email });

    if (userOTPVerificationRecords.length === 0) {
      return res.status(400).json({ status: "Failed", message: "Account record doesn't exist or has been verified already. Please signup or login." });
    }

    const { expiresAt, otp: hashedOTP } = userOTPVerificationRecords[0];

    // Log the expiration time and current time for debugging
    // console.log(`expiresAt: ${expiresAt}, currentTime: ${Date.now()}`);

    if (new Date(expiresAt) < new Date()) {
      await UserOtpVerification.deleteMany({ email });
      return res.status(400).json({ status: "Failed", message: "OTP has expired. Please request again." });
    }

    const validOTP = await bcrypt.compare(otp, hashedOTP);

    if (!validOTP) {
      return res.status(400).json({ status: "Failed", message: "Invalid code passed. Check your inbox." });
    }

    await User.updateOne({ email }, { verified: true });
    await UserOtpVerification.deleteMany({ email });

    res.json({
      status: "Verified",
      message: "User email verified successfully."
    });

  } catch (e) {
    console.error('Error during OTP verification:', e);
    res.status(500).json({
      status: "Failed",
      message: e.message
    });
  }
};


export const sendOtp = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      throw Error("Empty details are not allowed.")
    } else {
      await generateAuthOTP({ email })
      res.status(200).send({
        status: "success",
        message: "message"
      })
    }
  } catch (e) {
    res.status(400).send({
      status: "Failed",
      message: e.message
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

export const getUserbymail = async (req, res) => {
  try {
    const user = await User.findByEmail(req.params.email);

    if (!user) {
      return res.status(200).json({ status: "failed", data: user });

    }
    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};



// Update Password
export const ChangePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    console.log(email, newPassword, confirmPassword)

    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ status: 'failed', message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ status: 'failed', message: 'Passwords do not match' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    const institute = await Institute.findOne({ email })

    console.log(user)
    // if (!user) {
    //   return res.status(404).json({ status: 'failed', message: 'User not found' });
    // }


    if (user) {
      // Update password in database
      user.password = newPassword;
      await user.save();
      res.status(200).json({ status: 'success', message: 'Password updated successfully' })
    }

    if (institute) {
      // Update password in database
      institute.password = newPassword;
      await institute.save();
      res.status(200).json({ status: 'success', message: 'Password updated successfully' })
    }


    ;
  } catch (error) {
    console.error('Error in updateUserPassword', error);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.status(200).json({ message: "Logged Out successfully", status: "Success" })
  } catch (e) {
    res.status(400).send(e)
  }
}

export const addPhoto = async (req, res) => {
  try {
    const Id = req.params._id
    const user = await User.findById(Id)

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    }
    const file = req.file
    const imageUrl = await getImageUrl(file.path);
    user.photo = imageUrl

    await user.save();
    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      status: "failed",
      message: err.message
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params._id; // Assuming you have user ID from authenticated session
    const { name, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = name;
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const uid = req.params._id
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(uid).select('+password');
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const uid = req.params._id
    const user = await User.findById(uid)

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" })
    }

    await user.delete()
    res.status(200).json({ status: "success" })

  } catch (error) {
    res.status(200).json({ status: "Failed" })
  }
}