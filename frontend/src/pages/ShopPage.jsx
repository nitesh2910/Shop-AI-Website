import { useEffect, useState } from 'react';
import api from '../api';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryNav from '../components/CategoryNav';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('search') || '';
    const category = new URLSearchParams(location.search).get('category') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get(`/products/?keyword=${keyword}&category=${category}`);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword, category]);

    return (
        <div className="bg-white min-h-screen">
            <CategoryNav />
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shop All Products</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
