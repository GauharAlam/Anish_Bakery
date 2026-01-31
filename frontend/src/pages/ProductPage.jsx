import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { fetchProductById, clearSelectedProduct } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import Loading from '../components/common/Loading';
import api from '../utils/api';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading } = useSelector((state) => state.products);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
            toast.success('Added to cart!');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            dispatch(addToCart(product));
            navigate('/checkout');
        }
    };

    const handleAddToWishlist = async () => {
        if (!isAuthenticated) {
            toast.info('Please login to add to wishlist');
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        try {
            await api.post(`/users/wishlist/${product._id}`);
            toast.success('Added to wishlist!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to wishlist');
        }
    };

    if (loading) return <Loading />;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-bakery-brown mb-6"
                >
                    <FiArrowLeft />
                    Back
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="relative">
                            <img
                                src={product.imageURL}
                                alt={product.name}
                                className="w-full h-96 md:h-full object-cover"
                            />
                            {!product.isAvailable && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">Out of Stock</span>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="p-8">
                            <span className="inline-block bg-bakery-gold text-white text-sm px-3 py-1 rounded-full mb-4">
                                {product.category}
                            </span>

                            <h1 className="text-3xl font-bold text-bakery-dark mb-4 font-display">
                                {product.name}
                            </h1>

                            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                            <div className="text-3xl font-bold text-bakery-brown mb-8">
                                ₹{product.price}
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!product.isAvailable}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-bakery-brown text-bakery-brown py-3 rounded-lg font-semibold hover:bg-bakery-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiShoppingCart />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={handleAddToWishlist}
                                        className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                                    >
                                        <FiHeart size={24} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={!product.isAvailable}
                                    className="w-full bg-bakery-brown text-white py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="mt-8 p-4 bg-bakery-cream rounded-lg">
                                <p className="text-sm text-gray-600">
                                    <strong>Delivery:</strong> Available for delivery across the city.
                                    Orders placed before 2 PM will be delivered same day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
