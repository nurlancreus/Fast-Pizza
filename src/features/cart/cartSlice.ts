import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { type MenuItemType } from "@/services/model/types";
import { type RootState } from "@/app/store";

export type CartItemType = MenuItemType & {
  pizzaId: number;
  quantity: number;
  totalPrice: number;
};

type InitialStateType = {
  cart: Array<CartItemType>;
};

const initialState: InitialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      prepare: (pizza: MenuItemType) => {
        const newItem = {
          ...pizza,
          pizzaId: pizza.id,
          quantity: 1,
          totalPrice: pizza.unitPrice * 1,
        };

        return {
          payload: {
            newItem,
          },
        };
      },
      reducer: (state, action: PayloadAction<{ newItem: CartItemType }>) => {
        // payload needs to be new item
        const { newItem } = action.payload;

        state.cart.push(newItem);
      },
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((pizza) => pizza.pizzaId !== id);
    },
    increaseItemQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((pizza) => pizza.pizzaId === id);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((pizza) => pizza.pizzaId === id);

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Using CreateSelector for memoization

export const selectCart = (state: RootState) => state.cart.cart;

export const selectTotalCartPrice = createSelector([selectCart], (cart) => {
  const total = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return total;
});

export const selectTotalCartQuantity = createSelector([selectCart], (cart) => {
  const total = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return total;
});

export const selectCurrentQuantityById = createSelector(
  [selectCart, (_state, id) => id],
  (cart, id) => {
    const currItem = cart.find((item) => item.pizzaId === id);

    return currItem?.quantity ?? 0;
  },
);

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
