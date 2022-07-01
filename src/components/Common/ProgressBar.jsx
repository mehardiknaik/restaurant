import Typography  from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import  Box  from "@mui/system/Box";
import React from "react";

const ProgressBar = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{
            height: 10,
            borderRadius: 5,
            "&.MuiLinearProgress-determinate": {
              backgroundColor: "#e6e6e6",
            },
          }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          align="right"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
