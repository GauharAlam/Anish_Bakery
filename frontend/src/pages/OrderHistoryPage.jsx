import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import api from '../utils/api';
import Loading from '../components/common/Loading';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/myorders');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) return <Loading />;

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <FiPackage size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                <Link
                    to="/products"
                    className="bg-bakery-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-bakery-dark mb-8 font-display">My Orders</h1>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Order Header */}
                            <div
                                className="p-4 cursor-pointer hover:bg-gray-50"
                                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID: {order._id.slice(-8).toUpperCase()}</p>
                                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className="font-bold text-bakery-brown">₹{order.totalAmount}</span>
                                        {expandedOrder === order._id ? <FiChevronUp /> : <FiChevronDown />}
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            {expandedOrder === order._id && (
                                <div className="border-t p-4 bg-gray-50">
                                    <h4 className="font-semibold mb-3">Order Items</h4>
                                    <div className="space-y-3 mb-4">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <img
                                                    src={item.product?.imageURL || '/placeholder.jpg'}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product?.name || 'Product'}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                                    <div className="text-sm text-gray-600 bg-white p-3 rounded">
                                        <p className="font-medium">{order.shippingInfo.fullName}</p>
                                        <p>{order.shippingInfo.addressLine}</p>
                                        <p>{order.shippingInfo.city} - {order.shippingInfo.pincode}</p>
                                        <p>Contact: {order.shippingInfo.contactMobileNumber}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryPage;
