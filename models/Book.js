const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number, 
        required: true 
    },
    genre: {
        type: String
    },
    description: {
        type: String
    },
    numReviews: { 
        type: Number, 
        default: 0 
    },
    rating: { 
        type: Number, 
        default: 0 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//For average rating
BookSchema.virtual('averageRating').get(function() {
    return this._averageRating;
})

module.exports = mongoose.model('Book', BookSchema);