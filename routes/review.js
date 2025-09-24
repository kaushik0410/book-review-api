const express = require('express');
const { updateReview, deleteReview } = require('../controllers/reviewController');
const protect = require('../middlewares/auth');

const router = express.Router();

// Put update review using review id
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
