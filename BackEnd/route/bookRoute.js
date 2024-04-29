const express = require('express');
const router = express.Router();
const bookCtrl = require('../controller/bookController');

router.get('/all', bookCtrl.getAllBooks);
router.get('/search', bookCtrl.getAllBooksBySearch);
router.post('/create', bookCtrl.create);
router.post('/update', bookCtrl.update);
router.post('/delete', bookCtrl.delete);

module.exports = router;