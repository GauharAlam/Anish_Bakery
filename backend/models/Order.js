const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    shippingInfo: {
        fullName: {
            type: String,
            required: [true, 'Please provide full name']
        },
        addressLine: {
            type: String,
            required: [true, 'Please provide address']
        },
        pincode: {
            type: String,
            required: [true, 'Please provide pincode'],
            match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
        },
        city: {
            type: String,
            required: [true, 'Please provide city']
        },
        contactMobileNumber: {
            type: String,
            required: [true, 'Please provide contact mobile number'],
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number']
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
