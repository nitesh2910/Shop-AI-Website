import { useEffect, useState } from 'react';
import api from '../api';
import { Link, useLocation } from 'react-router-dom';

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
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shop All Products</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Link key={product._id} to={`/product/${product._id}`} className="group">
                                <div className="w-full aspect-[3/4] bg-white rounded-lg overflow-hidden">
                                    <img
                                        src={product.image ? (product.image.startsWith('http') ? product.image : `${(import.meta.env.VITE_API_URL || 'http://localhost:9090').replace('/api', '')}${product.image}`) : 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
