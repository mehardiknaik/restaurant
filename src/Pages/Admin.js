import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Container } from "@mui/system";
import AddItem from "../components/Admin/AddItem";

const Admin = () => {
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "screen_view", {
      firebase_screen: "Admin",
    });
  }, []);
  return <Container>
    <AddItem/>
  </Container>;
};

export default Admin;
