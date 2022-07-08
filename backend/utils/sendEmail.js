const nodeMailer = require('nodemailer');

const sendEmail = async(option) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: process.env.SMPT_SERVICE,

        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASS,
        },

    });

    const mailOption = {
        from: process.env.SMPT_EMAIL,
        to: option.email,
        subject: option.subject,
        text: option.message,
    };


    await transporter.sendMail(mailOption);

};

module.exports = sendEmail;