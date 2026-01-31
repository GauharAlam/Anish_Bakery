import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';

const categories = ['All', 'Cakes', 'Pastries', 'Cookies', 'Breads', 'Cupcakes', 'Desserts', 'Special'];

const HomePage = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const params = {};
        if (activeCategory !== 'All') params.category = activeCategory;
        if (searchTerm) params.search = searchTerm;
        params.available = 'true';
        dispatch(fetchProducts(params));
    }, [dispatch, activeCategory, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-bakery-gold to-primary-300 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-bakery-dark mb-4 font-display">
                        Fresh Baked Goodness
                    </h1>
                    <p className="text-lg text-bakery-dark/80 mb-8 max-w-2xl mx-auto">
                        Discover our handcrafted cakes, pastries, and treats made with love and the finest ingredients.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-bakery-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-bakery-dark transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 px-4 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-bakery-gold"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-bakery-brown text-white rounded-r-lg hover:bg-bakery-dark transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                        ? 'bg-bakery-brown text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-bakery-dark mb-8 font-display">
                        {activeCategory === 'All' ? 'Our Products' : activeCategory}
                    </h2>

                    {loading ? (
                        <Loading />
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl mb-4">🍰</div>
                            <h3 className="text-xl font-semibold mb-2">Fresh Daily</h3>
                            <p className="text-gray-600">All our products are baked fresh every morning</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and safe delivery to your doorstep</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">💯</div>
                            <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
                            <p className="text-gray-600">We use only the finest quality ingredients</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
