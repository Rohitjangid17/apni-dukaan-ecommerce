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
      state.totalAmount = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    addToCart(state, action) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );


      // if (existingItem) {
      //   if (existingItem.quantity < MAX_QUANTITY) {
      //     existingItem.quantity += product.quantity || 1;
      //     state.totalAmount += product.price * (product.quantity || 1);
      //   }
      // } else {
      //   state.items.push({ ...product, quantity: product.quantity || 1 });
      //   state.totalAmount += product.price * (product.quantity || 1);
      // }

      const addQuantity = product.quantity ?? 1; // safe fallback

      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += addQuantity;
          state.totalAmount += product.price * addQuantity;
        }
      } else {
        state.items.push({ ...product, quantity: addQuantity });
        state.totalAmount += product.price * addQuantity;
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        if (quantity <= MAX_QUANTITY) {
          itemToUpdate.quantity = quantity;
          state.totalAmount += difference * itemToUpdate.price;
        } else {
          const addedQuantity = MAX_QUANTITY - itemToUpdate.quantity;
          itemToUpdate.quantity = MAX_QUANTITY;
          state.totalAmount += addedQuantity * itemToUpdate.price;
        }
      }
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === productId);
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCartItems,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
