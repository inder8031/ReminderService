const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const EmailService = require('./services/emailService');
const apiRoutes = require('./routes/index');
const Jobs = require("./utils/job");
const { subscribeMessage, createChannel } = require('./utils/messageQueue');
const { REMINDER_SERVICE } = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);

    const channel = await createChannel();
    subscribeMessage(channel, REMINDER_BINDING_KEY);

    Jobs();

    // const emailService = new EmailService();
    // emailService.sendBasicEmail(
    //     'support@reminderservice.com <reminderservice12@gmail.com>',
    //     'reminderservice12@gmail.com',
    //     'Test Email',
    //     'This is a mail for testing email service'
    // );

});