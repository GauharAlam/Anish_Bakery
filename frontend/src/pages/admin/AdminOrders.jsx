import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import Loading from '../../components/common/Loading';

const statusOptions = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            setOrders(
                orders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
            toast.success('Order status updated');
        } catch (error) {
            toast.error('Failed to update status');
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
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin" className="text-gray-600 hover:text-bakery-brown">
                        <FiArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-bakery-dark font-display">Orders</h1>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-sm">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium">{order.shippingInfo.fullName}</p>
                                            <p className="text-sm text-gray-500">{order.user?.mobileNumber}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(order.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-bakery-brown">
                                            ₹{order.totalAmount}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`px-2 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="View Details"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No orders yet.</p>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Order #{selectedOrder._id.slice(-8).toUpperCase()}
                                </h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="p-4 space-y-6">
                                {/* Customer Info */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Customer Information</h3>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p><strong>Name:</strong> {selectedOrder.shippingInfo.fullName}</p>
                                        <p><strong>Phone:</strong> {selectedOrder.user?.mobileNumber}</p>
                                        <p><strong>Contact:</strong> {selectedOrder.shippingInfo.contactMobileNumber}</p>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p>{selectedOrder.shippingInfo.addressLine}</p>
                                        <p>{selectedOrder.shippingInfo.city} - {selectedOrder.shippingInfo.pincode}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Order Items</h3>
                                    <div className="space-y-3">
                                        {selectedOrder.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                <img
                                                    src={item.product?.imageURL || '/placeholder.jpg'}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product?.name || 'Product'}</p>
                                                    <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total Amount:</span>
                                        <span className="text-bakery-brown">₹{selectedOrder.totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span>Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                                        <span>Order Date:</span>
                                        <span>{formatDate(selectedOrder.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
