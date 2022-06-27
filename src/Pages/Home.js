import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import Hero from "../components/Home/Hero";
import { Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Item from "../components/Common/Item";
const Home = () => {
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "screen_view", {
      firebase_screen: "Home",
    });
  }, []);

  return (
    <Container>
      <Hero />
    </Container>
  );
};

export default Home;
