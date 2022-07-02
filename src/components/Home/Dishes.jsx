import { colors, Paper, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { category } from "../../data/data";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { useStateValue } from "../../context/StateProvider";
import SingleItem from "../Common/SingleItem";

const Dishes = () => {
  const [dish, setDish] = useState("all");
  const [categories] = useState([
    { id: 0, name: "All", urlParamname: "all" },...category
  ]);
  const { items, dispatch } = useStateValue();
  console.log("Dishes");
  return (
    <Box component="section" mb="20px">
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
      <Box sx={{ overflowX: "auto", width: "100%", py: 2.5, px: 1.3 }}>
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
          {categories.map((element) => (
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 5,
          justifyContent: "center",
          mt: 5,
        }}
      >
        {items.map((item) => (
          <Box
            key={item?.id}
            sx={{
              width: {
                xs: "calc(50% - 18px)",
                sm: "calc(33.33% - 18px)",
                md: "calc(25% - 18px)",
                lg: "calc(20% - 18px)",
              },
            }}
          >
            <SingleItem item={item} dispatch={dispatch} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dishes;
