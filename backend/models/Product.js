const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['Cakes', 'Pastries', 'Cookies', 'Breads', 'Cupcakes', 'Desserts', 'Special']
    },
    imageURL: {
        type: String,
        required: [true, 'Please provide product image']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
