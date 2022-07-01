import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { IconButton, ListItemText } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartRow = ({ imageURL, title, price, qty }) => {
  return (
    <Paper sx={{ my: 1 }}>
      <ListItem
        secondaryAction={
          <Box>
            <IconButton aria-label="RemoveIcon" color="primary">
              <RemoveIcon fontSize="small" />
            </IconButton>
            {qty}
            <IconButton aria-label="AddIcon" color="primary">
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <ListItemAvatar>
          <Box component="img" src={imageURL} height={40} />
        </ListItemAvatar>
        <ListItemText primary={title} secondary={price} />
      </ListItem>
    </Paper>
  );
};

export default CartRow;
