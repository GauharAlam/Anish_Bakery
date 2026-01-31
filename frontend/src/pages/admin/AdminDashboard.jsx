import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiHome } from 'react-icons/fi';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-bakery-dark font-display">Admin Dashboard</h1>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-bakery-brown"
                    >
                        <FiHome />
                        Back to Store
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link
                        to="/admin/products"
                        className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-bakery-gold/20 p-4 rounded-full">
                                <FiShoppingBag size={32} className="text-bakery-brown" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-bakery-dark">Product Management</h2>
                                <p className="text-gray-500">Add, edit, and manage products</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            Manage your bakery products, update prices, availability, and images.
                        </p>
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-100 p-4 rounded-full">
                                <FiPackage size={32} className="text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-bakery-dark">Order Management</h2>
                                <p className="text-gray-500">View and update order status</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            View all customer orders, update delivery status, and manage fulfillment.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
