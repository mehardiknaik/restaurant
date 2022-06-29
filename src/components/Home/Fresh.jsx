import {
  Box,
  Card,
  CardContent,
  colors,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

// Import Swiper
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useStateValue } from "../../context/StateProvider";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Fresh = ({ urlParamname, name }) => {
  const [{ items }, dispatch] = useStateValue();
  const data = items.filter(({ category }) => category === urlParamname);
  const theme = useTheme();
  console.log(theme);
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
        Our Fresh & Healthy {name}
      </Typography>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
      >
        {data.length > 0 &&
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <Card
                bgcolor="primary.main"
                sx={{
                  borderRadius: 6,
                  overflow: "visible",
                  isolation: "isolate",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    // height: 100,
                    width: "50%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 0.75rem crimson)",
                    position: "absolute",
                    top: -35,
                    zIndex: -1,
                  }}
                  src={item?.imageURL}
                  loading="lazy"
                />
                <CardContent
                  sx={{
                    textAlign: "right",
                    textShadow:
                      "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                  }}
                >
                  <IconButton
                    aria-label="cart"
                    color='secondary'
                    variant="contained"
                    sx={{p:.25}}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <Typography variant="h6">{item?.title}</Typography>
                  <Typography variant="caption">
                    {item?.calories} Calories
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <Typography
                      variant="caption"
                      component="span"
                      color="secondary"
                    >
                      ₹&nbsp;
                    </Typography>
                    {item?.price}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default Fresh;
