import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    const handleAddToWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.info('Please login to add to wishlist');
            return;
        }

        try {
            await api.post(`/users/wishlist/${product._id}`);
            toast.success('Added to wishlist!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to wishlist');
        }
    };

    return (
        <Link to={`/product/${product._id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <span className="absolute top-2 left-2 bg-bakery-gold text-white text-xs px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-bakery-brown">₹{product.price}</span>

                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddToWishlist}
                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Add to wishlist"
                            >
                                <FiHeart size={18} />
                            </button>

                            <button
                                onClick={handleAddToCart}
                                disabled={!product.isAvailable}
                                className="p-2 bg-bakery-brown text-white rounded-full hover:bg-bakery-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Add to cart"
                            >
                                <FiShoppingCart size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
