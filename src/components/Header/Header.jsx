import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
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

const Header = () => {
  const [showCart, setShowCart] = React.useState(false);
  const [menuList, setMenuList] = React.useState(null);
  const open = Boolean(menuList);
  const firebaseAuth = getAuth(app);
  const provide = new GoogleAuthProvider();
  const [{ user: users, cart }, dispatch] = useStateValue();
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
    setShowCart(open);
  };

  const login = async () => {
    try {
      const { user } = await signInWithPopup(firebaseAuth, provide);
      console.log("user", user);
      dispatch({
        type: actionType.SET_USER,
        payload: user,
      });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log("error", err.code);
      toast.error(err.message);
    }
  };
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      localStorage.removeItem("user");
      dispatch({ type: actionType.SET_USER, payload: null });
      navigate("/");
      handleMenuClose();
      toast.success("You are Logout successfully");
    } catch (err) {
      console.log("error", err.code);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              {users
                ? `Hi... ${users?.displayName.split(" ")[0]}`
                : "Restaurant"}
            </Typography>
            <IconButton aria-label="cart" onClick={toggleCart(!showCart)}>
              <Badge badgeContent={cart?.length} color="primary">
                <ShoppingBasketIcon fontSize="large" />
              </Badge>
            </IconButton>
            {users ? (
              <>
                <IconButton aria-label="cart" onClick={handleMenuClick}>
                  <Avatar
                    sx={{ width: 36, height: 36 }}
                    alt={users?.displayName}
                    src={users?.photoURL}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  />
                </IconButton>
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
                    {users?.displayName}
                  </MenuItem>
                  <MenuItem
                    component={Paper}
                    sx={{
                      marginInline: 0.7,
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
      <Drawer anchor={"right"} open={showCart} onClose={toggleCart(false)}>
        <Cart toggleCart={toggleCart} dispatch={dispatch} cart={cart} />
      </Drawer>
      <Toolbar sx={{ mb: 1 }} />
    </>
  );
};

export default memo(Header);
