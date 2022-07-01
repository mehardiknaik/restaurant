import React, { memo, useEffect, useRef, useState } from "react";
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

const Cart = ({ toggleCart,dispatch,cart }) => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  console.log("reder");

  const handleClearCart = () => {
    dispatch({ type: actionType.SET_CART, payload: [] });
  };

  const addqty = (item) => () => {
    dispatch({
      type: actionType.SET_CART,
      payload: cart.map((e) =>
        e.id === item.id ? { ...e, qty: e.qty + 1 } : e
      ),
    });
  };

  const removeqty = (item) => () => {
    if (item.qty == 1)
      dispatch({
        type: actionType.SET_CART,
        payload: cart.filter((e) => e.id !== item.id),
      });
    else
      dispatch({
        type: actionType.SET_CART,
        payload: cart.map((e) =>
          e.id === item.id ? { ...e, qty: e.qty - 1 } : e
        ),
      });
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <IconButton
          aria-label="cart"
          color="primary"
          variant="contained"
          onClick={toggleCart(false)}
        >
          {" "}
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Cart
        </Typography>
        <Button
          variant="text"
          onClick={handleClearCart}
          endIcon={<CloseIcon />}
        >
          Clear
        </Button>
      </Box>
      <Divider />
      <Box sx={{ width: "100%", flex: 1, px: 1, overflowY: "auto" }}>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <CartRow
              item={item}
              key={item.id}
              addqty={addqty}
              removeqty={removeqty}
            />
          ))}
      </Box>
      <ClickAwayListener onClickAway={() => setExpanded(false)}>
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
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
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
              color="secondary"
              onClick={() => setExpanded(!expanded)}
              sx={{ fontSize: 19, fontWeight: 600 }}
              endIcon={
                <ExpandLessIcon
                  sx={{
                    transform: `rotate(${expanded ? 180 : 0}deg)`,
                    transition: "0.2s",
                  }}
                />
              }
            >
              450
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
      </ClickAwayListener>
    </Box>
  );
};

export default Cart;
