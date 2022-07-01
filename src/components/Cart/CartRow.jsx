import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { IconButton, ListItemText } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CartRow = ({ addqty, item, removeqty }) => {
  return (
    <Paper sx={{ my: 1 }}>
      <ListItem
        secondaryAction={
          <Box>
            <IconButton
              aria-label="RemoveIcon"
              color="primary"
              onClick={removeqty(item)}
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
              onClick={addqty(item)}
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

export default CartRow;
