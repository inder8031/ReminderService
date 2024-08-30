const { transporter } = require('../config/emailConfig');

const TicketRepository = require('../repository/ticketRepository');

class EmailService {
    constructor() {
        this.ticketRepository = new TicketRepository();
    }

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

    async fetchPendingEmails(timestamp) {
        try {
            const tickets = await this.ticketRepository.get({ status: "PENDING" });
            return tickets;
        } catch (error) {
            console.log("An error occured in service layer during fetching details of emails");
            console.log(error);
        }
    }

    async createNotification(data) {
        try {
            const ticket = await this.ticketRepository.create(data);
            return ticket;
        } catch (error) {
            console.log("An error occured in service layer during creating Email reminder");
            console.log(error);
        }
    }

    async updateNotification(id, data) {
        try {
            const ticket = await this.ticketRepository.update(id, data);
            return ticket;
        } catch (error) {
            console.log("An error occured in service layer while updating Email reminder");
            console.log(error);
        }
    }

    async subscribeEvents(payload) {
        try {
            const service = payload.service;
            const data = payload.data;
            switch(service) {
                case 'CREATE_NOTIFICATION' : 
                    await this.createNotification(data);
                    break;
                case 'SEND_BASIC_MAIL' : 
                    await this.sendBasicEmail(data);
                    break;
                default : 
                    console.log("No valid event received");
            }
        } catch (error) {
            console.log("An error occured in service layer in subscribeEvents");
            console.log(error);
        }
    }

}

module.exports = EmailService;