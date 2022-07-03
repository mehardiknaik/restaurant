import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React, { memo } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { IconButton, ListItemText } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionType } from "../../context/action";

const CartRow = ({ item, dispatch }) => {

  const increaseQty = (item) => () => {
    dispatch({ type: actionType.CART_QTY_INC, payload: item });
  };

  const decreaseQty = (item) => () => {
    dispatch({ type: actionType.CART_QTY_DEC, payload: item });
  };
  
  return (
    <Paper sx={{ my: 1 }}>
      <ListItem
        secondaryAction={
          <Box>
            <IconButton
              aria-label="RemoveIcon"
              color="primary"
              onClick={decreaseQty(item)}
            >
              {item?.qty < 2 ? (
                <DeleteIcon fontSize="small" />
              ) : (
                <RemoveIcon fontSize="small" />
              )}
            </IconButton>
            {item?.qty}
            <IconButton
              aria-label="AddIcon"
              color="primary"
              onClick={increaseQty(item)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <ListItemAvatar>
          <Box component="img" src={item?.imageURL} height={40} />
        </ListItemAvatar>
        <ListItemText primary={item?.title} secondary={item?.price} />
      </ListItem>
    </Paper>
  );
};

export default memo(CartRow);
