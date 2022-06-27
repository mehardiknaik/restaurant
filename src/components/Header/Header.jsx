import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Avatar, Badge, Paper } from "@mui/material";
import Cart from "../Cart/Cart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/action";
import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/avatar.png";
import { toast } from "react-toastify";
import getItems from "../../util/firebaseFunction";

const Header = () => {
  const [cart, setCart] = React.useState(false);
  const [menuList, setMenuList] = React.useState(null);
  const open = Boolean(menuList);
  const firebaseAuth = getAuth(app);
  const provide = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setMenuList(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuList(null);
  };
  const toggleCart = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCart(open);
  };

  const login = async () => {
    try {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provide);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } catch (err) {
      console.log("error", err.code);
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      localStorage.clear();
      dispatch({ type: actionType.SET_USER, user: null });
      navigate("/");
      handleMenuClose();
      toast.success("You are Logout successfully");
    } catch (err) {
      console.log("error", err.code);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getItems().then((items) => {
      dispatch({ type: actionType.SET_ITEMS, items });
    });
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1, pb: "65px" }}>
        <AppBar
          position="fixed"
          color="transparent"
          sx={{ boxShadow: 0, backdropFilter: "blur(10px)" }}
        >
          <Toolbar sx={{ gap: 1.4 }}>
            <Link to="/">
              <Box component="img" src={logo} sx={{ height: 50 }}></Box>
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user ? `Hi... ${user?.displayName.split(" ")[0]}` : "Restaurant"}
            </Typography>
            <Badge badgeContent={4} color="secondary">
              <ShoppingBasketIcon
                component={motion.svg}
                whileTap={{ scale: 0.7 }}
                onClick={toggleCart(!cart)}
                fontSize="large"
              />
            </Badge>
            {user ? (
              <>
                <Avatar
                  component={motion.div}
                  whileTap={{ scale: 0.7 }}
                  sx={{ width: 36, height: 36 }}
                  alt={user?.displayName}
                  src={user?.photoURL}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleMenuClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={menuList}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "Avatar-button",
                  }}
                  variant="menu"
                  sx={{
                    paddingInline: 1,
                  }}
                  autoFocus={false}
                >
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={handleMenuClose}
                  >
                    {user?.displayName}
                  </MenuItem>
                  <MenuItem
                    component={Paper}
                    sx={{
                      marginInline: 0.7,
                      bgcolor: "#e0e0e0",
                      borderRadius: 2,
                    }}
                    elevation={0}
                    onClick={logout}
                  >
                    Logout <ExitToAppIcon sx={{ ml: 1.4 }} />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box
                height="36px"
                src={avatar}
                onClick={login}
                component={motion.img}
                whileTap={{ scale: 0.7 }}
              ></Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={"right"} open={cart} onClose={toggleCart(false)}>
        <Cart toggleCart={toggleCart} />
      </Drawer>
    </>
  );
};

export default Header;
