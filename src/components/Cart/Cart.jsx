import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import { useStateValue } from "../../context/StateProvider";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { actionType } from "../../context/action";

const Cart = ({ toggleCart }) => {
  const [{ cart }, dispatch] = useStateValue();

  const handleClearCart = () => {
    dispatch({ type: actionType.CLEAR_CART, payload: [] });
  };
  return (
    <Box
      sx={{ width: { xs: "100vw", sm: 350 } }}
      role="presentation"
      onKeyDown={toggleCart(false)}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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

          <Typography variant="subtitle1" component="div">
            Cart
          </Typography>
          <Button variant="text" onClick={handleClearCart}>
            <CloseIcon />
            Clear Cart
          </Button>
        </Box>

        <List>
          <ListItem key={"text"} disablePadding>
            <ListItemButton>
              <ListItemIcon>dxv</ListItemIcon>
              <ListItemText primary={"text"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>fb</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Box>
  );
};

export default Cart;
