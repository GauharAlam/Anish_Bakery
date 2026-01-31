import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-bakery-dark text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🧁</span>
                            <span className="text-2xl font-bold font-display">Anish Bakery</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Freshly baked goodness delivered to your doorstep. We use only the finest ingredients
                            to create delicious treats for every occasion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-gray-400">
                                <FiPhone />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                                <FiMail />
                                <span>hello@anishbakery.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                                <FiMapPin />
                                <span>123 Baker Street, Mumbai</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Anish Bakery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
