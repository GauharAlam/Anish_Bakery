import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '../../store/authSlice';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl">🧁</span>
                        <span className="text-xl font-bold text-bakery-brown font-display">Anish Bakery</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-bakery-brown transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-bakery-brown transition-colors">
                            Products
                        </Link>
                        {isAuthenticated && (
                            <Link to="/orders" className="text-gray-700 hover:text-bakery-brown transition-colors">
                                My Orders
                            </Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-700 hover:text-bakery-brown transition-colors">
                                Admin
                            </Link>
                        )}
                    </nav>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <Link to="/wishlist" className="text-gray-700 hover:text-bakery-brown transition-colors relative">
                                <FiHeart size={22} />
                            </Link>
                        )}

                        <Link to="/cart" className="text-gray-700 hover:text-bakery-brown transition-colors relative">
                            <FiShoppingCart size={22} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-bakery-brown text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm text-gray-600">
                                    {user?.mobileNumber}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-bakery-brown transition-colors"
                                    title="Logout"
                                >
                                    <FiLogOut size={22} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 text-gray-700 hover:text-bakery-brown transition-colors"
                            >
                                <FiUser size={22} />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-bakery-brown transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-bakery-brown transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/orders"
                                    className="text-gray-700 hover:text-bakery-brown transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                            )}
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-bakery-brown transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
