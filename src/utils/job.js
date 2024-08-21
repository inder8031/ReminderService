const cron = require('node-cron');

const EmailService = require('../services/emailService');
const { transporter } = require('../config/emailConfig');

const emailService = new EmailService();

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const tickets = await emailService.fetchPendingEmails();
        tickets.forEach((ticket) => {
            transporter.sendMail({
                from: "Support@reminderService.com<reminderservice12@gmail.com>",
                to: ticket.recepientEmail,
                subject: ticket.subject,
                text: ticket.content
            }, async (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateNotification(ticket.id, { status: "SUCCESS" });
                }
            });
        });
        console.log(tickets);
    });
}

module.exports = setupJobs;