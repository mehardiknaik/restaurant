import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useStateValue } from "./context/StateProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  colors,
  createTheme,
  CssBaseline,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "./firebase.config";
import { actionType } from "./context/action";
import { AnimatePresence } from "framer-motion";

const Home = lazy(() => import("./Pages/Home"));
const Admin = lazy(() => import("./Pages/Admin"));

const App = () => {
  const { dispatch } = useStateValue();
  const [themeSwitch, setThemeSwitch] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, "foodItems"), orderBy("id", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => doc.data());
      dispatch({ type: actionType.SET_ITEMS, payload: items });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={themeSwitch ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <ToastContainer hideProgressBar theme="colored" />
      <Switch
        onChange={(e) => setThemeSwitch(e.target.checked)}
        defaultChecked={themeSwitch}
      />
    </ThemeProvider>
  );
};
const lightTheme = createTheme({
  palette: {
    primary: {
      main: colors.orange[800],
    },
    secondary: {
      main: colors.pink["A400"],
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.orange[800],
    },
    secondary: {
      main: colors.pink["A100"],
    },
  },
});
export default App;
