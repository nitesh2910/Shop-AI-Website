import { Link } from 'react-router-dom';
import Rating from './Rating';
import { ShoppingCart, Eye } from 'lucide-react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const getImageSrc = (image) => {
        if (!image) return 'https://via.placeholder.com/300';
        if (image.startsWith('http')) return image;
        const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:9090';
        return `${baseUrl}${image}`;
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50">
                <img
                    src={getImageSrc(product.image)}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => addToCart(product, 1)}
                            className="flex-1 bg-white text-gray-900 py-2.5 rounded-full flex items-center justify-center space-x-2 font-bold text-sm shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-4 px-1">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                        {product.brand || 'Premium'}
                    </p>
                    <Rating value={product.rating} text={`${product.numReviews}`} />
                </div>

                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    <Link to={`/product/${product._id}`}>
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-black text-gray-900">${product.price}</p>
                    {product.countInStock > 0 ? (
                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">
                            In Stock
                        </span>
                    ) : (
                        <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
