import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
    const { shippingAddress, savePaymentMethod } = useContext(CartContext);
    const navigate = useNavigate();

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Payment Method</h1>
            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <legend className="text-base font-medium text-gray-900">Select Method</legend>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                            <input
                                id="paypal"
                                name="paymentMethod"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod('PayPal')}
                            />
                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                PayPal or Credit Card
                            </label>
                        </div>
                        {/* More methods can be added here */}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
