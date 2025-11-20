const Certificate = require('../model/certificate')
const User = require('../model/user')
const { getImageUrl } = require('../utility/cloudinary');
const cloudinary = require('cloudinary').v2;
// import Certificate from '../models/Certificate';
const { sendDocumendID } = require('../utility/IdEmail');

cloudinary.config({
    cloud_name: "dcwi7rrhk",
    api_key: "858788497628611",
    api_secret: "u5hL7Y_-nq94yXus6gQ32qpZ2K0",
});

export const createCertificate = async (req, res) => {
    const { name, email, courseName, coursePeriod, cid, courseDetails, createdAt, signer, ipfsHash } = req.body;
    // if (!certificateName) return res.status(400).send("Certificate name is required");

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const newCertificate = await Certificate.create({ name, email, courseName, coursePeriod, courseDetails, cid, createdAt, signer, ipfsHash });
        if (!newCertificate) return res.status(400).json({ error: "Certificate not created" });


        res.status(201).json({ status: "success", data: newCertificate });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({});

        return res.status(200).json({ status: "success", data: certificates });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        });
    }
};

export const getCertificatesBySigner = async (req, res) => {
    const { signer } = req.params;
    try {
        const certificates = await Certificate.find({ signer });
        return res.status(200).json({ status: "success", data: certificates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
};

export const getCertificatesByUser = async (req, res) => {
    const { email } = req.params;
    try {
        const certificates = await Certificate.find({ email });
        return res.status(200).json({ status: "success", data: certificates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
};
export const getCertificate = async (req, res) => {
    try {
        console.log(req.params._id)
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        return res.status(200).json({ status: "success", data: certificate });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const getCertificatebyId = async (req, res) => {
    try {
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        return res.status(200).json({ status: "success", data: certificate });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const verifyCertificate = async (req, res) => {
    try {
        const { ipfsHash } = req.body;
        console.log(ipfsHash)
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        // const certificate = await Certificate.findOne({ where: { _id: req.params._id } });
        certificate.verified = "true";
        certificate.ipfsHash = ipfsHash;
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate._id });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const uploadCertificate = async (req, res) => {
    try {
        const { documentIdentification } = req.body;
        console.log(documentIdentification)
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        await sendDocumendID({ email: certificate.email, documentIdentification: documentIdentification });

        certificate.documentIdentification = documentIdentification;
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate._id });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const rejectCertificate = async (req, res) => {
    try {
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        // const certificate = await Certificate.findOne({ where: { _id: req.params._id } });
        certificate.verified = "false";
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const addSigner = async (req, res) => {
    try {
        const documentId = req.params._id
        const certificate = await Certificate.findById(documentId);
        // const certificate = await Certificate.findById({ where: { _id: req.params._id } });
        const file = req.file
        const imageUrl = await getImageUrl(file.path);
        // console.log(imageUrl)
        certificate.image = imageUrl;
        certificate.signer = req.body.signer;
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate });

    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}


export const UserSearch = async (req, res) => {
    const { q } = req.query;
    try {
        if (!q) {
            res.status(400).json({ error: 'Query parameter is missing.' });
        } else {
            const filteredData = await Certificate.find({
                courseName: { $regex: new RegExp(q, 'i') } // Case-insensitive search for 'courseName'
            });
            res.json(filteredData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.findOne({ where: { email: req.params.email } });
        certificate.name = req.body.name;
        certificate.courseName = req.body.courseName;
        certificate.coursePeriod = req.body.coursePeriod;
        certificate.courseDetails = req.body.courseDetails;
        certificate.verified = req.body.verified;
        certificate.ipfsHash = req.body.ipfsHash;
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate });

    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

export const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ where: { id: req.params.id } });
        await certificate.delete();
        return res.status(200).json({ status: "success", message: "Certificate deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}