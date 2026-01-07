import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import api from '../api';

const PlaceOrderPage = () => {
    const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        }
    }, [paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const { data } = await api.post('/orders/add/', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            });
            clearCart();
            alert('Order placed successfully!');
            navigate('/'); // Or to an order detail page
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center pb-4 border-b">
                                        <img
                                            src={item.image ? `${(import.meta.env.VITE_API_URL || 'http://localhost:9090').replace('/api', '')}${item.image}` : 'https://via.placeholder.com/50'}
                                            alt={item.name}
                                            className="h-12 w-12 rounded object-cover mr-4"
                                        />
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product}`} className="text-indigo-600 hover:text-indigo-500">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-8 lg:mt-0">
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Items</span>
                                <span>${itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-4 border-t">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="w-full mt-8 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition"
                            disabled={cartItems === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
