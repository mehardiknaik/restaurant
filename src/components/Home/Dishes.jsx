import { colors, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { category } from "../../data/data";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
const Dishes = () => {
  const [dish, setDish] = useState("all");
  return (
    <Box component="section">
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{
          position: "relative",
          width: "max-content",
          fontWeight: 600,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "40%",
            height: 3,
            background: colors.orange[500],
            borderRadius: 19,
            bottom: -5,
          },
        }}
      >
        Our Hot Dishes
      </Typography>
      <Box sx={{ overflowX: "auto", width: "100%", py: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            // mb: 2,
            justifyContent: "center", // {sm:'flex-start', lg: "center" },
            minWidth: "fit-content",
            width: "100%",
          }}
        >
          <Paper
            elevation={9}
            sx={{
              color:
                dish === "all" ? "secondary.contrastText" : "secondary.main",
              bgcolor:
                dish === "all" ? "secondary.main" : "secondary.contrastText",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: 135,
              minWidth: 100,
              transition: "0.7s",
              borderRadius: 2,
              "&:hover": {
                color: "secondary.contrastText",
                bgcolor: "secondary.main",
                ".MuiPaper-root": {
                  color: "secondary.main",
                  bgcolor: "secondary.contrastText",
                },
              },
            }}
            onClick={() => setDish("all")}
          >
            <Paper
              elevation={0}
              sx={{
                p: 0.9,
                display: "inline-flex",
                borderRadius: "50%",
                transition: "0.7s",

                bgcolor:
                  dish === "all" ? "secondary.contrastText" : "secondary.main",
                color:
                  dish === "all" ? "secondary.main" : "secondary.contrastText",
              }}
            >
              <FastfoodRoundedIcon fontSize="small" />
            </Paper>
            <Typography variant="subtitle1">All</Typography>
          </Paper>
          {category.map((element) => (
            <Paper
              elevation={9}
              key={element?.id}
              sx={{
                color:
                  dish === element?.urlParamname
                    ? "secondary.contrastText"
                    : "secondary.main",
                bgcolor:
                  dish === element?.urlParamname
                    ? "secondary.main"
                    : "secondary.contrastText",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: 135,
                minWidth: 100,
                borderRadius: 2,
                transition: "0.7s",
                "&:hover": {
                  color: "secondary.contrastText",
                  bgcolor: "secondary.main",
                  ".MuiPaper-root": {
                    color: "secondary.main",
                    bgcolor: "secondary.contrastText",
                  },
                },
              }}
              onClick={() => setDish(element?.urlParamname)}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 0.9,
                  display: "inline-flex",
                  borderRadius: "50%",
                  transition: "0.7s",
                  bgcolor:
                    dish === element?.urlParamname
                      ? "secondary.contrastText"
                      : "secondary.main",
                  color:
                    dish === element?.urlParamname
                      ? "secondary.main"
                      : "secondary.contrastText",
                }}
              >
                <FastfoodRoundedIcon fontSize="small" />
              </Paper>
              <Typography variant="subtitle1">{element?.name}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dishes;
