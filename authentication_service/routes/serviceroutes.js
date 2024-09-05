const express = require('express');
const { getAllServices,selectService, activateService } = require('../controllers/servicecontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/select-service',  selectService);
router.post('/activate-service',  activateService);
router.get('/get-services',getAllServices);

module.exports = router;
