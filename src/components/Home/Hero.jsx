import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import delivery from "../../assets/img/delivery.png";
import { motion } from "framer-motion";
import heroBg from "../../assets/img/heroBg.png";
import { useStateValue } from "../../context/StateProvider";
import { useTheme } from "@emotion/react";

const Hero = () => {
  const [{ items }, dispatch] = useStateValue();
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        height: {
          md: "calc(100vh - 55px)",
        },
        alignItems: "center",
        rowGap: 5,
      }}
      component="section"
    >
      {/* Left Container */}
      <Grid item xs={12} md={7}>
        <Box
          bgcolor="primary.main"
          sx={{
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
            color="primary.contrastText"
          >
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
            items.slice(0, 4).map((item, i) => (
              <Card
                component={motion.div}
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                key={item.id}
                bgcolor="primary.main"
                sx={{
                  bgcolor: "#ffffff4d",
                  overflow: "visible",
                  // backdropFilter:"blur(3px)",
                  gridRowEnd: "span 2",
                  gridRowStart: i === 0 ? 2 : "initial",
                  borderRadius: 6,
                  // width:'fit-content'
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      objectFit: "contain",
                      marginTop: -8,
                      filter: "drop-shadow(0 0 0.75rem crimson)",
                    }}
                    src={item?.imageURL}
                    loading="lazy"
                  ></Box>
                  <Typography variant="h6" component="div">
                    {item?.title}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {item?.description}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <Typography
                      variant="subtitle2"
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
