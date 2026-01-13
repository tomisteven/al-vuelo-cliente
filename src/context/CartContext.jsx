import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item, type = 'product') => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(i => i._id === item._id && i.type === type);

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += 1;
                return newCart;
            }

            return [...prevCart, { ...item, type, quantity: 1 }];
        });
    };

    const removeFromCart = (id, type) => {
        setCart(prevCart => prevCart.filter(item => !(item._id === id && item.type === type)));
    };

    const updateQuantity = (id, type, quantity) => {
        if (quantity < 1) return removeFromCart(id, type);

        setCart(prevCart => prevCart.map(item =>
            (item._id === id && item.type === type) ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
        setAppliedDiscount(null);
    };

    // Calcular el precio actual basado en la cantidad (lógica mayorista para productos)
    const getItemPrice = (item) => {
        if (item.type === 'combo') return item.finalPrice;

        if (!item.bulkPrices || item.bulkPrices.length === 0) {
            return item.precio;
        }

        const applicablePrice = item.bulkPrices
            .filter(bp => item.quantity >= bp.minQuantity)
            .sort((a, b) => b.minQuantity - a.minQuantity)[0];

        return applicablePrice ? applicablePrice.price : item.precio;
    };

    const cartTotal = cart.reduce((total, item) => total + (getItemPrice(item) * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const getDiscountedTotal = () => {
        if (!appliedDiscount) return cartTotal;
        if (appliedDiscount.type === 'fixed') {
            return Math.max(0, cartTotal - appliedDiscount.value);
        } else if (appliedDiscount.type === 'percentage') {
            return cartTotal * (1 - appliedDiscount.value / 100);
        }
        return cartTotal;
    };

    const applyDiscount = (discountData) => setAppliedDiscount(discountData);
    const removeDiscount = () => setAppliedDiscount(null);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemPrice,
            cartTotal,
            cartCount,
            appliedDiscount,
            applyDiscount,
            removeDiscount,
            getDiscountedTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
