const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { category, search, available } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (available === 'true') {
            query.isAvailable = true;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            imageURL: `/uploads/${req.file.filename}`,
            isAvailable: isAvailable !== undefined ? isAvailable : true
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const updateData = { ...req.body };

        // If new image is uploaded, update imageURL and delete old image
        if (req.file) {
            // Delete old image
            const oldImagePath = path.join(__dirname, '..', product.imageURL);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            updateData.imageURL = `/uploads/${req.file.filename}`;
        }

        product = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete local image file only (skip external URLs)
        if (product.imageURL && product.imageURL.startsWith('/uploads')) {
            const imagePath = path.join(__dirname, '..', product.imageURL);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
