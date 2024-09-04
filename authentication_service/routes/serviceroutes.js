const express = require('express');
const { selectService, activateService } = require('../controllers/servicecontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/select-service', authMiddleware, selectService);
router.post('/activate-service', authMiddleware, activateService);

module.exports = router;
