const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/session');

// Define routes for session management.
router.post('/create', sessionsController.createSession); // New route for creating sessions
router.get('/free', sessionsController.listFreeSessions);
router.post('/book', sessionsController.bookSession);
router.get('/pending', sessionsController.listPendingSessions);
router.get('/pending-after-slot', sessionsController.listPendingSessionsAfterSlot);

module.exports = router;
