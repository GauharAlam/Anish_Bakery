import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const cartFromStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: cartFromStorage,
        total: calculateTotal(cartFromStorage),
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            state.total = calculateTotal(state.items);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
            state.total = calculateTotal(state.items);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item._id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item._id !== id);
                } else {
                    item.quantity = quantity;
                }
            }

            state.total = calculateTotal(state.items);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
