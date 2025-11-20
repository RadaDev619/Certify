const Certificate = require('../model/certificate');

async function verifyCertificate(req, res) {
    try {
        const certificate = await Certificate.findOne({ where: { email: req.params.email } });
        certificate.verified = true;
        await certificate.save();
        return res.status(200).json({ status: "success", data: certificate });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}
module.exports = { verifyCertificate };