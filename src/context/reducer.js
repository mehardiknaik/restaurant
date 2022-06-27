import { actionType } from "./action";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    case actionType.SET_ITEMS:
      return { ...state, items: action.items };
    default:
      return state;
  }
};

export default reducer;
