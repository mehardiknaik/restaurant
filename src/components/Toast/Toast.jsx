import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, setopen, severity, toastMsg }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setopen(false)}
    >
      <Alert
        onClose={() => setopen(false)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {toastMsg}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
