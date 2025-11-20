import express from "express";
const router = express.Router();
const multer = require("../utility/multer");

const instituteController = require("../controllers/instituteAuth.js");

router.post("/register", instituteController.register);
router.post("/login", instituteController.login);
// router.post("/verify", instituteController.verifyOTP);

router.get("/getinstitute/:id", instituteController.getInstitute);
router.get("/getinsbyid/:_id", instituteController.getInstitutebyid)

router.patch("/updateuser/:_id", instituteController.updateProfile);
router.patch("/updatepassword/:_id", instituteController.updatePassword);
router.patch("/photoUpload/:_id", multer.single('photo'), instituteController.addPhoto);

router.get('/getAllins', instituteController.getAllInstitutes)
router.post("/logout", instituteController.logout);

router.delete("/deleteuser/:_id", instituteController.deleteUser);
module.exports = router;