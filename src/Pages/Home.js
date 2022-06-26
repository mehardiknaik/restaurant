import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

const Home = () => {
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "screen_view", {
      firebase_screen: "Home",
    });
  }, []);

  return (
    <div>
      {Array(50)
        .fill(1)
        .map((_, i) => (
          <Box key={i}>{i}</Box>
        ))}
    </div>
  );
};

export default Home;
