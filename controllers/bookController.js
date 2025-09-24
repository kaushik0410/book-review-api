const Book = require('../models/Book');
const Review = require('../models/Review');

// post api book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, price, genre } = req.body;

    const book = new Book({
      title,
      author,
      description,
      price,
      genre,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// get api book
exports.getBooks = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const filters = {};
    if (req.query.genre) filters.genre = req.query.genre;

    const count = await Book.countDocuments(filters);
    const books = await Book.find(filters)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      books,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// search book
exports.searchBooks = async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          title: { $regex: req.query.q, $options: 'i' },
        }
      : {};

    const books = await Book.find(keyword);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// id reviews
exports.createReviewForBook = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    console.log(rating)
    console.log(comment)
    console.log(req.params.id)
    const book = await Book.findById(req.params.id);
    console.log(book)

    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Prevent duplicate reviews by same user
    const alreadyReviewed = await Review.findOne({
      book: req.params.id,
      user: req.user.id
    });
    console.log(alreadyReviewed)

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Book already reviewed' });
    }

    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating: Number(rating),
      comment
    });

    await review.save();

    const reviews = await Review.find({ book: req.params.id });
    book.numReviews = reviews.length;
    book.rating = reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;
    await book.save();

    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
