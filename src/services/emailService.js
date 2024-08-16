const { transporter } = require('../config/emailConfig');

class EmailService {
    async sendBasicEmail(sender, receiver, subject, body) {
        const mailOptions = {
            from: sender,
            to: receiver,
            subject: subject,
            text: body
        }

        try {
            const res = await transporter.sendMail(mailOptions);
            console.log("Email sent: " + res.response);
            console.log(res);
        } catch (error) {
            console.log("EMAIL not sent, an error occured");
            console.log(error);
        }
    }
}

module.exports = EmailService;