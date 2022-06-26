import React, { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

const Admin = () => {
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "screen_view", {
      firebase_screen: "Admin",
    });
  }, []);
  return <div>Admin</div>;
};

export default Admin;
