import { useEffect, useState } from 'react';
import api from '../api';
import CategoryNav from '../components/CategoryNav';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Flame, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products/');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Derived lists
    const flashDeals = products.slice(0, 4); // Just for demo
    const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
    const newArrivals = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    if (loading) return <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>;

    return (
        <div className="bg-white min-h-screen">
            <CategoryNav />
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* Flash Deals Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <Flame className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Flash Deals</h2>
                                <p className="text-sm text-gray-500 font-medium tracking-wide">Hurry up! Ends in 05:24:12</p>
                            </div>
                        </div>
                        <Link to="/shop" className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center transition-colors">
                            View All <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {flashDeals.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Best Sellers Section */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center space-x-3">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Best Sellers</h2>
                        </div>
                        <Link to="/shop" className="group text-sm font-bold text-indigo-600 flex items-center">
                            Explore All Products <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
                        {bestSellers.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>

                {/* New Arrivals Section */}
                <section className="bg-gray-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-20 rounded-[3rem]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                                <Sparkles size={14} />
                                <span>Fresh Out of the Box</span>
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">New Arrivals</h2>
                            <p className="mt-4 text-gray-500 max-w-xl mx-auto font-medium">Be the first to own our latest releases. Hand-picked and carefully curated for excellence.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newArrivals.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter / CTA */}
                <section className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 py-16 px-8 shadow-2xl shadow-indigo-600/40">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl h-64 w-64 rounded-full bg-white opacity-20"></div>
                    <div className="relative text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-white sm:text-4xl mb-6 tracking-tight">Never miss a drop again.</h2>
                        <p className="text-indigo-100 mb-10 text-lg font-medium">Join 50,000+ shoppers and get early access to new releases and exclusive discounts.</p>
                        <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white transition-all backdrop-blur-md"
                            />
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-black hover:bg-indigo-50 transition-colors shadow-lg">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default HomePage;
