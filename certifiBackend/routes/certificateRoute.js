import express from "express";
// const {upload} = require("../cloudinary");
const multer = require("../utility/multer");
const certificateController = require("../controllers/certificate");
const router = express.Router();

// const { userAuth } = require("../middleware/auth");

router.post("/create", certificateController.createCertificate);
router.get("/get/:_id", certificateController.getCertificate);
router.get("/getCertificatebyId/:_id", certificateController.getCertificatebyId);

router.put("/update/:email", certificateController.updateCertificate);
router.delete("/delete/:id", certificateController.deleteCertificate);
router.patch("/verify/:_id", certificateController.verifyCertificate)
router.patch("/uploadCertificate/:_id", certificateController.uploadCertificate)

router.get("/getallcertificates/:email", certificateController.getCertificatesByUser)
router.patch("/notverify/:_id", certificateController.rejectCertificate)
router.get("/getAll", certificateController.getAllCertificates)
router.get("/getCert/:signer", certificateController.getCertificatesBySigner)
router.patch("/addSigner/:_id", multer.single("image"), certificateController.addSigner)
router.get('/search', certificateController.UserSearch);
module.exports = router;
