import { actionType } from "./action";

export const initialState = {
  user:JSON.parse(localStorage.getItem('user'))|| null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
