const nodemailer = require('nodemailer');

const { EMAIL, PASS } = require('./serverConfig');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASS
    }
});

module.exports = {
    transporter
}