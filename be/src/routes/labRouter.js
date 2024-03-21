const express = require('express');
const router = express.Router();
const labCtrl = require('../app/controllers/labCtrl');
const rentCtrl = require('../app/controllers/rentCtrl');
const rentPenaltyCtrl = require('../app/controllers/rentPenaltyCtrl');


router.post('/updateAmount', labCtrl.updateAmount);
router.get('/rent/:id', rentCtrl.getRentFromIdLab);
router.post('/createRent/', rentCtrl.createRent);
router.post('/createRentPenalty/', rentPenaltyCtrl.createRentPenalty);
// router.put('/updateNotRentPenalty/:id', rentPenaltyCtrl.updateNotRentPenalty);
router.put('/updateNotRentPenalty/:id', rentPenaltyCtrl.updateStatusPenalty);
router.put('/updateNotRent/:id', rentCtrl.updateStatusRent);

router.get('/rentPenalty', rentPenaltyCtrl.getAllRentPenalties);
router.get('/rentPenalty/:id', rentPenaltyCtrl.getRentPenaltyByIdLab);
router.get('/', labCtrl.getAllLabs);
router.get('/:id', labCtrl.getLabById);

  
module.exports = router;