import { actionType } from "./action";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  items: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.payload };
    case actionType.SET_ITEMS:
      return { ...state, items: action.payload };
    case actionType.SET_CART:
      const inCart = state.cart.find((e) => e.id === action.payload.id);
      if (inCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case actionType.CART_QTY_INC:
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.payload.id ? { ...e, qty: e.qty + 1 } : e
        ),
      };
    case actionType.CART_QTY_DEC:
      if (action.payload.qty < 2)
        return {
          ...state,
          cart: state.cart.filter((e) => e.id !== action.payload.id),
        };
      return {
        ...state,
        cart: state.cart.map((e) =>
          e.id === action.payload.id ? { ...e, qty: e.qty - 1 } : e
        ),
      };
    case actionType.CLEAR_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default reducer;
