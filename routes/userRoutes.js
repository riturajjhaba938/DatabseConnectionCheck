const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. Create a user (POST)
router.post('/', async (req, res) => {
    try {
        const { userId, name, email, password } = req.body;
        const newUser = new User({ userId, name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Get all users (GET)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get single user by userId (GET)
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update user by userId (PUT)
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. Delete user by userId (DELETE)
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
