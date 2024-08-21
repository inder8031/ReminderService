const express = require('express');

const TicketController = require('../../controllers/ticketController');

const router = express.Router();

router.post('/notifications', TicketController.create);

module.exports = router;