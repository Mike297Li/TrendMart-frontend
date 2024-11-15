// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const existingCart = [...cart];
        const existingItemIndex = existingCart.findIndex(i => i.id === item.id);
        
        if (existingItemIndex > -1) {
            // Update the quantity if the item already exists
            existingCart[existingItemIndex].quantity += item.quantity;
        } else {
            // Add new item to the cart
            existingCart.push(item);
        }

        setCart(existingCart);
        localStorage.setItem('cart', JSON.stringify(existingCart)); // Update localStorage
    };

    const updateCart = (updatedItems) => {
        setCart(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage with updated cart
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCart, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};
