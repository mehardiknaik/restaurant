import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import Hero from "../components/Home/Hero";
import { Container} from "@mui/material";
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
