import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
      state.totalAmount = action.payload.reduce((acc, item) => {
        return acc + item.quantity * item.productPrice;
      }, 0);
    },

    addToCart(state, action) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      const addQuantity = product.quantity ?? 1; // safe fallback

      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += addQuantity;
          state.totalAmount += product.price * addQuantity;
        }
      } else {
        state.items.push({
          ...product,
          productPrice: product.price,
          quantity: addQuantity,
        });
        state.totalAmount += product.price * addQuantity;
      }
    },

    updateQuantity(state, action) {
      const { cartId, quantity } = action.payload;

      // Update the matching cart item
      state.items = state.items.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      );

      // Recalculate totalAmount using correct price field
      state.totalAmount = state.items.reduce((acc, item) => {
        return acc + item.quantity * item.productPrice;
      }, 0);
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === productId);
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCartItems,
  clearCart
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
