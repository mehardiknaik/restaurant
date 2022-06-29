import { Box, Card, CardContent, colors, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

// Import Swiper
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useStateValue } from "../../context/StateProvider";

const Fresh = ({ urlParamname, name }) => {
  const [{ items }, dispatch] = useStateValue();
  const data = items.filter(({ category }) => category === urlParamname);

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
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
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
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
      >
        {data.length > 0 &&
          data.map((e, i) => (
            <SwiperSlide key={i}>
              <Card
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
                  <Typography variant="h6" component="div">
                    {e?.title}
                  </Typography>
                  <Typography variant="caption" component="div">
                    dsvcds
                  </Typography>
                  <Typography variant="caption" component="div">
                    dsvdsv
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
