import { Box, colors, Grid, Paper, Typography } from "@mui/material";
import { borderRadius, width } from "@mui/system";
import React from "react";
import delivery from "../../assets/img/delivery.png";
import { motion } from "framer-motion";
import heroBg from "../../assets/img/heroBg.png";

const Hero = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: {
          sm: "fit-contect",
          md: "calc(100vh - 55px)",
        },
        alignItems: "center",
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
          <Typography
            variant="subtitle2"
            display="block"
            color={colors.orange[900]}
          >
            Bike Delivery
          </Typography>
          <Paper
          component={motion.div}
          initial={{opacity:0.6,x:-600}}
          animate={{opacity:1,x:0}}
          transition={{duration:1,type:'spring'
        }}
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
          <Typography variant="h2" component="span" color={colors.orange[700]}>
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
        }}
      >
        <Box> dvb</Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
