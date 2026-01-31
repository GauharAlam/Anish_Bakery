import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Loading from '../components/common/Loading';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await api.get('/users/wishlist');
            setWishlist(response.data.data);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/users/wishlist/${productId}`);
            setWishlist(wishlist.filter((item) => item._id !== productId));
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    if (loading) return <Loading />;

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <FiHeart size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-6">Save items you love to your wishlist!</p>
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
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-bakery-dark mb-8 font-display">My Wishlist</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link to={`/product/${product._id}`}>
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={product.imageURL}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    {!product.isAvailable && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <span className="text-white font-semibold">Out of Stock</span>
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                                <p className="text-xl font-bold text-bakery-brown mb-4">₹{product.price}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={!product.isAvailable}
                                        className="flex-1 flex items-center justify-center gap-2 bg-bakery-brown text-white py-2 rounded-lg hover:bg-bakery-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiShoppingCart size={16} />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
