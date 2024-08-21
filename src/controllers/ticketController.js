const EmailService = require('../services/emailService');

const emailService = new EmailService();

const create = async (req, res) => {
    try {
        const ticket = await emailService.createNotification(req.body);
        return res.status(201).json({
            data: ticket,
            success: true,
            message: "Email reminder created",
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Email reminder not created",
            error: "An error occured during creation of Email reminder"
        });
    }
}

module.exports = {
    create,
}