import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import CartContext from '../context/CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}/`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-gray-500 hover:text-gray-900 mb-8 inline-block">&larr; Back to Products</Link>
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-12 lg:items-start">
                    <div key={product._id} className="lg:col-span-2 group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="w-full aspect-[3/4] bg-white rounded-md overflow-hidden group-hover:opacity-75">
                            <img
                                src={product.image ? (product.image.startsWith('http') ? product.image : `${(import.meta.env.VITE_API_URL || 'http://localhost:9090').replace('/api', '')}${product.image}`) : 'https://via.placeholder.com/300'}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-3">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">${product.price}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-500">Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="mt-6">
                                <div className="flex items-center">
                                    <label htmlFor="qty" className="mr-2">Qty:</label>
                                    <select
                                        id="qty"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="mt-10 flex">
                            <button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className={`max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full ${product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {product.countInStock === 0 ? 'Out of Stock' : 'Add to bag'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
