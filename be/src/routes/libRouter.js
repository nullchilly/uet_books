const express = require('express');
const router = express.Router();
const libCtrl = require('../app/controllers/libCtrl');
const rentPenaltyCtrl = require('../app/controllers/rentPenaltyCtrl');

router.get('/rentPenalty/:id', rentPenaltyCtrl.getRentPenaltyByIdLib);
router.post('/updateAmount', libCtrl.updateAmount);
router.get('/:id', libCtrl.getLibById);
router.get('/', libCtrl.getAllLibs);



module.exports = router;