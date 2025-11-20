import express from "express";

const router = express.Router();
const multer = require("../utility/multer");

const userController = require("../controllers/auth");
const { userAuth } = require("../middleware/auth")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verify", userController.verifyOTP);
router.post("/sendOtp", userController.sendOtp);


router.get("/getuserbyemail/:email", userController.getUserbymail)
router.get("/getuser/:id", userController.getUser)
router.patch("/photoUpload/:_id", multer.single('photo'), userController.addPhoto)
router.patch('/ChangePassword', userController.ChangePassword);

router.patch("/updateuser/:_id", userController.updateProfile)
router.patch("/updatepassword/:_id", userController.updatePassword)
router.post("/logout", userAuth, userController.logout)


router.delete("/deleteuser/:_id", userController.deleteUser)

// export default router;
//export the router so thatit can be used in other parts of your application
module.exports = router;
