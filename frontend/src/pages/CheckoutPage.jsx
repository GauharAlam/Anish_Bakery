import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import api from '../utils/api';

const CheckoutPage = () => {
    const { items, total } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        addressLine: '',
        pincode: '',
        city: '',
        contactMobileNumber: user?.mobileNumber || '',
    });

    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            toast.error('Please enter your full name');
            return false;
        }
        if (!formData.addressLine.trim()) {
            toast.error('Please enter your address');
            return false;
        }
        if (!/^[0-9]{6}$/.test(formData.pincode)) {
            toast.error('Please enter a valid 6-digit pincode');
            return false;
        }
        if (!formData.city.trim()) {
            toast.error('Please enter your city');
            return false;
        }
        if (!/^[0-9]{10}$/.test(formData.contactMobileNumber)) {
            toast.error('Please enter a valid 10-digit contact number');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                orderItems: items.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                shippingInfo: formData,
                totalAmount: total,
            };

            await api.post('/orders', orderData);
            dispatch(clearCart());
            setOrderPlaced(true);
            toast.success('Order placed successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="bg-green-100 rounded-full p-6 mb-6">
                    <FiCheck size={48} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-bakery-dark mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">Thank you for your order. We'll deliver it soon!</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/orders')}
                        className="bg-bakery-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors"
                    >
                        View My Orders
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="border-2 border-bakery-brown text-bakery-brown px-6 py-3 rounded-lg font-semibold hover:bg-bakery-cream transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-bakery-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-bakery-dark mb-8 font-display">Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Shipping Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address *
                                </label>
                                <textarea
                                    name="addressLine"
                                    value={formData.addressLine}
                                    onChange={handleChange}
                                    placeholder="Enter your complete address"
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="6-digit pincode"
                                        maxLength="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    name="contactMobileNumber"
                                    value={formData.contactMobileNumber}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number for delivery"
                                    maxLength="10"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    This number will be used for delivery updates
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-bakery-brown text-white py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors disabled:opacity-50 mt-6"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item._id} className="flex items-center gap-3">
                                        <img
                                            src={item.imageURL}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-4" />

                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <hr />
                                <div className="flex justify-between text-xl font-bold text-bakery-dark">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
