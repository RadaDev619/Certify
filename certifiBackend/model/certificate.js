const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: "User",
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        // required:[true,'Please provide the email ID']
        ref: "User"
    },
    verified: {
        type: String,
        enum: ['pending', 'true', 'false'],
        default: 'pending'
    },
    courseName: {
        type: String,
        required: [true, 'Enter the name of the course']
    },
    coursePeriod: {
        type: String,
    },
    courseDetails: {
        type: String,
    },
    cid: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ipfsHash: {
        type: String,
        default: "",
    },
    documentIdentification: {
        type: String,
        default: "",
    },
    signer: {
        type: String
    },
    image: {
        type: String,
    }
})

const Certificate = mongoose.model("Certificate", certificateSchema)
module.exports = Certificate;