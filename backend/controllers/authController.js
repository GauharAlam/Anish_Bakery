const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ mobileNumber });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists with this mobile number' });
        }

        // Create user
        const user = await User.create({
            mobileNumber,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                mobileNumber: user.mobileNumber,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;

        // Validate input
        if (!mobileNumber || !password) {
            return res.status(400).json({ success: false, message: 'Please provide mobile number and password' });
        }

        // Check for user
        const user = await User.findOne({ mobileNumber }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                _id: user._id,
                mobileNumber: user.mobileNumber,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, getMe };
