const express = require('express');
const router = express.Router();
const bookCtrl = require('../controller/bookController');

router.get('/all', bookCtrl.getAllBooks);
router.get('/count', bookCtrl.getBooksCount);
router.get('/pdf', bookCtrl.getMD5ById);
router.get('/search', bookCtrl.getAllBooksBySearch);
router.get('/sync', bookCtrl.syncWithMysql);
router.get('/topics', bookCtrl.getTopicName);
router.post('/create', bookCtrl.create);
router.post('/update', bookCtrl.update);
router.post('/delete', bookCtrl.delete);

module.exports = router;