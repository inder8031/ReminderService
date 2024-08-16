const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const EmailService = require('./services/emailService');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);

    const emailService = new EmailService();
    emailService.sendBasicEmail(
        'support@reminderservice.com <reminderservice12@gmail.com>',
        'reminderservice12@gmail.com',
        'Test Email',
        'This is a mail for testing email service'
    );
});