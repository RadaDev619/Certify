const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY2);

const sendDocumendID = (data) => {

    sgMail.send({
        to: data.email,
        from: "radabisdorji@gmail.com",
        subject: "DocumentId Sending",
        text: `Your documentId is ${data.documentIdentification}`,
        html: `<p>Enter <b>${data.documentIdentification}</b> in the application to verify your digital certificate.</p>`,
        template_id: "d-b34896fa975f4cbdbfc4b6eea6857f14",
        dynamic_template_data: {
            otp: data.documentIdentification,
        }
    })
}

module.exports = { sendDocumendID };