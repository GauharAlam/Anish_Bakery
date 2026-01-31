import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';

const CartPage = () => {
    const { items, total } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/checkout' } });
        } else {
            navigate('/checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <FiShoppingBag size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some delicious treats to your cart!</p>
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
                <h1 className="text-3xl font-bold text-bakery-dark mb-8 font-display">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
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

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-bakery-brown text-white py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/products"
                                className="block text-center text-bakery-brown mt-4 hover:underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
