import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useStateValue } from "../../context/StateProvider";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingButton from "@mui/lab/LoadingButton";
import { actionType } from "../../context/action";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CartRow from "./CartRow";
import emptyCart from "../../assets/img/emptyCart.svg";
import EmptyCart from "../../svg/EmptyCart";

const Cart = ({ toggleCart, dispatch, cart }) => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  console.log("cart");
  const Total = useMemo(() => {
    if (cart.length > 0) {
      const subTotal = cart.reduce((a, b) => {
        return (a += b.qty * parseFloat(b.price));
      }, 0);
      return { subTotal, total: subTotal + 40 };
    }
    return { subTotal: 0, total: 0 };
  }, [cart]);

  const clearCart = () => {
    dispatch({ type: actionType.CLEAR_CART, payload: [] });
  };

  return (
    <Box
      sx={{
        width: { xs: "100vw", sm: 350 },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onKeyDown={toggleCart(false)}
    >
      <Box display="flex" alignItems="center" p={1}>
        <IconButton
          aria-label="cart"
          color="primary"
          variant="contained"
          onClick={toggleCart(false)}
        >
          {" "}
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" flex={1} textAlign={"center"}>
          Cart
        </Typography>
        {cart.length > 0 && (
          <Button variant="text" onClick={clearCart} endIcon={<CloseIcon />}>
            Clear
          </Button>
        )}
      </Box>
      <Divider />
      {cart.length > 0 ? (
        <>
          <Box sx={{ width: "100%", flex: 1, px: 1, overflowY: "auto" }}>
            {cart.map((item) => (
              <CartRow item={item} key={item.id} />
            ))}
          </Box>
          <Paper
            elevation={10}
            sx={{ borderRadius: "20px 20px 0 0", overflow: "hidden", py: 1 }}
          >
            <Accordion
              elevation={0}
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded}
              disableGutters
              sx={{ bgcolor: "transparent" }}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ display: "none" }}
              ></AccordionSummary>
              <AccordionDetails>
                <Box
                  display="flex"
                  p={1}
                  justifyContent="space-between"
                  color="text.secondary"
                >
                  <Typography>Sub Total</Typography>
                  <Typography>₹&nbsp;{Total.subTotal}</Typography>
                </Box>
                <Box
                  display="flex"
                  p={1}
                  justifyContent="space-between"
                  color="text.secondary"
                >
                  <Typography>Shipping</Typography>
                  <Typography>₹&nbsp;40</Typography>
                </Box>
                <Divider />
                <Box display="flex" p={1} justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">₹&nbsp;{Total.total}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pr={0.5}
              pl={1}
            >
              <Button
                // size="large"

                onClick={() => setExpanded(!expanded)}
                sx={{ fontSize: 19, fontWeight: 600, color: "text.primary" }}
                endIcon={
                  <ExpandLessIcon
                    sx={{
                      transform: `rotate(${expanded ? 180 : 0}deg)`,
                      transition: "0.2s",
                    }}
                  />
                }
              >
                ₹&nbsp;{Total.total}
              </Button>
              <LoadingButton
                size="large"
                disableElevation
                onClick={() => console.log("place")}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ m: 1 }}
              >
                Place Order
              </LoadingButton>
            </Box>
          </Paper>
        </>
      ) : (
        <Box
          display="flex"
          px={2}
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1.5}
        >
          <EmptyCart />
          <Typography
            variant="h6"
            component="div"
          >
            Your cart is Empty
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
