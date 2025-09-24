const Review = require('../models/Review');
const Book = require('../models/Book');

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    console.log(req.params.id)
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Only the user who created the review can update it
    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment !== undefined ? comment : review.comment;

    await review.save();

    // Update book's average rating
    const reviews = await Review.find({ book: review.book });
    const book = await Book.findById(review.book);
    book.numReviews = reviews.length;
    book.rating = reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;
    await book.save();

    res.json({ message: 'Review updated', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.deleteOne({ _id: review._id });

    // Update book's average rating
    const book = await Book.findById(review.book);
    const reviews = await Review.find({ book: book._id });

    book.numReviews = reviews.length;
    book.rating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length
        : 0;
    await book.save();

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
