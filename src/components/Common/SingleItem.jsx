import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/action";

const SingleItem = (props) => {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = (item) => {
    const present = cart.find((e) => e.id === item.id);
    let newcart = [...cart, item];
    if (present) {
      newcart = cart.map((e) =>
        e.id === item.id ? { ...e, qty: e.qty + 1 } : e
      );
    }
    dispatch({ type: actionType.SET_CART, payload: newcart });
  };
  return (
    <Card
      bgcolor="primary.main"
      sx={{
        borderRadius: 2,
        overflow: "visible",
        isolation: "isolate",
        position: "relative",
        ".image": {
          transition: "0.3s",
        },
        "&:hover": {
          ".image": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box
        component="img"
        sx={{
          // height: 100,
          width: "50%",
          objectFit: "contain",
          filter: "drop-shadow(0 0 0.75rem crimson)",
          position: "absolute",
          top: -35,
          zIndex: -1,
        }}
        src={props?.imageURL}
        className="image"
        loading="lazy"
      />
      <Box
        sx={{
          textAlign: "right",
          pr: 1,
          // textShadow:
          //   "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        <IconButton
          aria-label="cart"
          color="secondary"
          variant="contained"
          sx={{ p: 0.25 }}
          onClick={() => addToCart(props)}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6">{props?.title}</Typography>
        <Typography variant="caption">{props?.calories} Calories</Typography>
        <Typography variant="subtitle1" component="div">
          <Typography variant="caption" component="span" color="secondary">
            ₹&nbsp;
          </Typography>
          {props?.price}
        </Typography>
      </Box>
    </Card>
  );
};

export default SingleItem;
