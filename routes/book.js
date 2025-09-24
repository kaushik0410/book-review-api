const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bookController = require('../controllers/bookController');

router.post('/', auth, bookController.createBook);
router.get('/', bookController.getBooks); // pagination + filters
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);
router.post('/:id/reviews', auth, bookController.createReviewForBook);

module.exports = router;