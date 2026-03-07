require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    }).catch(err => {
        console.error("MongoDB Atlas connection error:", err);
    });

app.use('/users', userRoutes);

// Root route to handle base URL
app.get('/', (req, res) => {
    res.send('Welcome to the Database Connection Check API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
