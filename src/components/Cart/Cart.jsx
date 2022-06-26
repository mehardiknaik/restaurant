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

const Cart = ({ toggleCart }) => {
  return (
    <Box
      sx={{ width: { xs: "100vw", sm: 350 } }}
      role="presentation"
      onKeyDown={toggleCart(false)}
    >
      <CardContent>
        <Box sx={{ textAlign: "right" }}>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={toggleCart(false)} />
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
