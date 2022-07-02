import { useContext, useReducer, createContext, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(data.cart));
  }, [data.cart]);
  return (
    <StateContext.Provider value={{ ...data, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
