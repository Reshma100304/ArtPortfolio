import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('CRITICAL: MongoDB connection error:');
        console.error(err);
        // Retry logic could be added here
    }
};

connectDB();

// Handle connection loss
mongoose.connection.on('error', err => {
    console.error('MongoDB connection lost:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectDB();
});

// Middleware to check DB connection
const checkDbConnection = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({
            message: 'Database not connected',
            status: mongoose.connection.readyState
        });
    }
    next();
};

// Review Schema
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Routes
app.get('/api/reviews', checkDbConnection, async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/reviews', checkDbConnection, async (req, res) => {
    console.log('Received POST request to /api/reviews');
    console.log('Body:', req.body);

    const { name, role, content, rating } = req.body;

    if (!name || !content || !rating) {
        return res.status(400).json({ message: 'Missing required fields: name, content, and rating are required.' });
    }

    const review = new Review({ name, role, content, rating });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        console.error('Error saving review:', err);
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
