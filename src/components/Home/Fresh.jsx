import { Box, colors, Typography, useTheme } from "@mui/material";
import React from "react";

// Import Swiper
import { EffectCoverflow, Pagination, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useStateValue } from "../../context/StateProvider";

import SingleItem from "../Common/SingleItem";

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
        modules={[EffectCoverflow, Pagination, Keyboard]}
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
        keyboard={{
          enabled: true,
        }}
        // pagination={true}
      >
        {data.length > 0 &&
          data.map((item, i) => (
            <SwiperSlide key={i}>
              <SingleItem {...item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default Fresh;
