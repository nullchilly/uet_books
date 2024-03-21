const express = require('express');
const router = express.Router();
// const penaltyCtrl = require('../app/controllers/penaltyCtrl');
const rentPenaltyCtrl = require('../app/controllers/rentPenaltyCtrl');



router.get('/', rentPenaltyCtrl.getAllRentPenalties);
router.get('/:id', rentPenaltyCtrl.getRentPenaltyByIdLab);
router.get('/rentPenalty/:id', rentPenaltyCtrl.getRentPenaltyByIdLab);
router.put('/updateStatusPenalty/:id', rentPenaltyCtrl.updateStatusPenalty);

module.exports = router; 