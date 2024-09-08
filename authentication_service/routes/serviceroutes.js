const express = require('express');
const { getPendingCustomers,getVerifiedCustomers,getActivatedCustomers,getAllServices,selectService, activateService } = require('../controllers/servicecontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/select-service', authMiddleware, selectService);
router.post('/activate-service',  activateService);
router.get('/get-services',getAllServices);
router.get('/get-pending-customers',getPendingCustomers);
router.get('/get-verified-customers',getVerifiedCustomers);
router.get('/get-activated-customers',getActivatedCustomers);


module.exports = router;
