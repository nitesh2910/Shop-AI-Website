import { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { Trash } from 'lucide-react';

const CartPage = () => {
    const { cartItems, removeFromCart, updateCartQty } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=shipping');
        } else {
            navigate('/shipping');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">Your cart is empty.</p>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">Go back and shop</Link>
                    </div>
                ) : (
                    <div className="md:grid md:grid-cols-3 md:gap-8">
                        <div className="md:col-span-2">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex py-6 border-b border-gray-200">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.image ? `${(import.meta.env.VITE_API_URL || 'http://localhost:9090').replace('/api', '')}${item.image}` : 'https://via.placeholder.com/150'}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </h3>
                                                <p className="ml-4">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center space-x-3 border rounded-md p-1">
                                                <button
                                                    onClick={() => updateCartQty(item.product, Math.max(1, item.qty - 1))}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded transition font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="text-gray-900 font-medium w-6 text-center">{item.qty}</span>
                                                <button
                                                    onClick={() => updateCartQty(item.product, Math.min(item.countInStock, item.qty + 1))}
                                                    disabled={item.qty >= item.countInStock}
                                                    className={`w-8 h-8 flex items-center justify-center rounded transition font-bold ${item.qty >= item.countInStock ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-100'}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product)}
                                                    className="font-medium text-red-600 hover:text-red-500 flex items-center"
                                                >
                                                    <Trash className="h-4 w-4 mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 md:mt-0">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                                <div className="mt-6 flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={checkoutHandler}
                                        disabled={cartItems.length === 0}
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
