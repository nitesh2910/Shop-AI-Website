import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [];
        setCartItems(cartItemsFromStorage);

        const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {};
        setShippingAddress(shippingAddressFromStorage);
    }, []);

    const addToCart = (product, qty) => {
        const existItem = cartItems.find((x) => x.product === product._id);
        let newCartItems;

        if (existItem) {
            newCartItems = cartItems.map((x) =>
                x.product === existItem.product ? { ...x, qty: x.qty + qty } : x
            );
        } else {
            const newItem = {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty
            }
            newCartItems = [...cartItems, newItem];
        }

        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const removeFromCart = (id) => {
        const newCartItems = cartItems.filter((x) => x.product !== id);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const updateCartQty = (id, qty) => {
        const newCartItems = cartItems.map((x) =>
            x.product === id ? { ...x, qty: Number(qty) } : x
        );
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
        localStorage.setItem('paymentMethod', JSON.stringify(data));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            shippingAddress,
            saveShippingAddress,
            paymentMethod,
            savePaymentMethod,
            clearCart,
            updateCartQty
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
