const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected.');
    } catch (err) {
        console.error('MongoDB connection error: ', err.message);
        process.exit(1);
    }
}