import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home";
import { useStateValue } from "./context/StateProvider";
import Admin from "./Pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "./firebase.config";
import { actionType } from "./context/action";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: colors.orange[800],
    },
    secondary: {
      main: colors.orange[50],
    },
  },
});

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const q = query(collection(firestore, "foodItems"), orderBy("id", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => doc.data());
      dispatch({ type: actionType.SET_ITEMS, items });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
      <ToastContainer hideProgressBar theme="colored" />
    </ThemeProvider>
  );
};

export default App;
