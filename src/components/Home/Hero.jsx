import {
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import delivery from "../../assets/img/delivery.png";
import { motion } from "framer-motion";
import heroBg from "../../assets/img/heroBg.png";
import { useStateValue } from "../../context/StateProvider";

const Hero = () => {
  const [{ items },dispatch] = useStateValue();
  return (
    <Grid
      container
      sx={{
        height: {
          sm: "calc(100vh - 55px)",
        },
        alignItems: "center",
        rowGap: 5,
      }}
    >
      {/* Left Container */}
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            bgcolor: colors.orange[50],
            width: "max-content",
            paddingBlock: 0.4,
            paddingInline: 0.9,
            marginBottom: 3,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            gap: 1,
          }}
          component={motion.div}
          whileTap={{ scale: 0.9 }}
        >
          {" "}
          <Typography variant="subtitle2" display="block" color="primary">
            Fast Delivery
          </Typography>
          <Paper
            component={motion.div}
            initial={{ opacity: 0.6, x: -600 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            sx={{
              borderRadius: "50%",
              height: 32,
              width: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box component="img" src={delivery} height="100%"></Box>
          </Paper>
        </Box>
        <Typography variant="h2" display="block">
          The Fastest Delivery in{" "}
          <Typography variant="h2" component="span" color="primary">
            Your City
          </Typography>
        </Typography>
      </Grid>
      {/* Right Container */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          height: "100%",
          backgroundImage: `url(${heroBg})`,
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
          backgroundPositionX: "right",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            rowGap: 7,
            columnGap: 1.5,
          }}
        >
          {items.length > 0 &&
            items.slice(0,4).map((item, i) => (
              <Card
                component={motion.div}
                whileTap={{ scale: 0.9 }}
                key={item.id}
                sx={{
                  bgcolor: "#ffffff4d",
                  overflow: "visible",
                  backdropFilter: "blur(3px)",
                  gridRowEnd: "span 2",
                  gridRowStart: i === 0 ? 2 : "initial",
                  borderRadius: 6,
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    sx={{ height: 100, objectFit: "contain", marginTop: -8 }}
                    src={item?.imageURL}
                    loading="lazy"
                  ></Box>
                  <Typography variant="h5" component="div">
                    {item?.title}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {item?.description}
                  </Typography>
                  <Typography variant="subtitle2" component="div">
                    <Typography
                      variant="caption"
                      component="span"
                      color="primary"
                    >
                      ₹&nbsp;
                    </Typography>
                    {item?.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
