const Institute = require("../model/institute");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateInsAuthOTP } = require("../utility/insOtp");
const InstituteOtpVerification = require("../model/instituteOtpVerification");
const Certificate = require("../model/certificate");
const { verifyCertificate } = require("../utility/verifyCert");
const { getImageUrl } = require('../utility/cloudinary');

export const register = async (req, res) => {
  const { companyName, email, instituteType, instituteLocation, password } = req.body;
  if (!companyName) return res.status(400).send("Name is required");

  //password length validation for debugging
  if (!password || password.length < 6)
    return res.status(400).send("Password should be a minimum of 6 characters");

  try {
    const instituteExist = await Institute.findOne({ email });
    if (instituteExist) return res.status(400).json({ error: "Email is taken" });

    // Create a new user instance
    const newInstitute = await Institute.create({ companyName, email, instituteType, instituteLocation, password });
    if (!newInstitute) {
      return res.status(400).json({ status: "Failed", message: "Institute not created" })
    }

    res.status(201).json({ status: "success", data: newInstitute });
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
    const institute = await Institute.findByCredentials(req.body.email, req.body.password);

    if (institute) {
      const AuthToken = await institute.generateAuthToken();
      res.cookie("session_id", AuthToken)

      res.status(200).json({ message: "Credentail Matched", status: "Success", data: institute})
    } else {
      res.status(400).json({ message: "Invalid Credential", status: "Failed" })
    }

  } catch (e) {
    res.status(400).send(e)
  }
}

// export const verifyOTP = async (req, res) => {
//   try {
//     let { email, otp } = req.body;

//     if (!email || !otp) {
//       throw Error("Empty otp details are not allowed.")
//     } else {
//       const instituteOTPVerificationRecords = await InstituteOtpVerification.find({ email })

//       if (instituteOTPVerificationRecords.length <= 0) {
//         throw new Error("Account record doesn't exists or has been verified already. Please signup or login.");
//       } else {
//         const { expiresAt } = instituteOTPVerificationRecords[0];
//         const hashedOTP = instituteOTPVerificationRecords[0].otp;

//         if (expiresAt < Date.now()) {
//           InstituteOtpVerification.deleteMany({ email });
//           throw new Error("OTP has expired. Please request again.");
//         } else {
//           const validOTP = await bcrypt.compare(otp, hashedOTP);
//           if (!validOTP) {
//             throw new Error("Invalid code passed. check your inbox.")
//           } else {
//             await Institute.updateOne({ email }, { verified: true });
//             await InstituteOtpVerification.deleteMany({ email });

//             res.json({
//               status: "Verified",
//               message: "Institute email verified successfully."
//             });
//           }
//         }
//       }
//     }
//   } catch (e) {
//     res.status(400).send({
//       status: "Failed",
//       message: e.message
//     })
//   }
// }

export const getInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({ where: { id: req.params.id } });
    return res.json(institute);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

export const getInstitutebyid = async (req, res) => {
  try {
    const id = req.params._id
    const institute = await Institute.findById(id);
    return res.json(institute);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};
export const getAllInstitutes = async (req, res) => {
  console.log("Fetching all institutes");

  try {
    // Retrieve all institutes
    const institutes = await Institute.find({});

    // Format the result to the specified structure
    const formattedInstitutes = institutes.map(institute => ({
      email: institute.email,
      name: institute.companyName,
    }));

    console.log("Formatted Institutes:", formattedInstitutes);

    res.status(200).json({ data: formattedInstitutes, status: 'success' });
  } catch (err) {
    console.error("Error fetching institutes:", err);
    return res.status(500).send("Server error");
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


export const ChangePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ status: 'failed', message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ status: 'failed', message: 'Passwords do not match' });
    }

    // Find user by email
    const user = await Institute.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'failed', message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password in database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in updateUserPassword', error);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

export const addPhoto = async (req, res) => {
  try {
    const Id = req.params._id
    const user = await Institute.findById(Id)

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
    const user = await Institute.findById(userId);

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

    const user = await Institute.findById(uid).select('+password');
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
    const user = await Institute.findById(uid)

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" })
    }

    await user.delete()
    res.status(200).json({status: "success"})
    
  }catch(error){
    res.status(200).json({status: "Failed"})
  }
}