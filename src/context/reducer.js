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
      return { ...state, cart: action.payload };
    case actionType.CLEAR_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default reducer;
