require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/review', reviewRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Server Error!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));