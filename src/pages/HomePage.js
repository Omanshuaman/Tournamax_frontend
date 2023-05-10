import React, { useState } from "react";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const HomePage = ({ setonClick }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(index) {
    setSelectedTab(index);
  }
  return (
    <div style={{ maxWidth: "xl", margin: "auto" }}>
      <div
        style={{
          backgroundColor: "blue",
          borderRadius: "lg",
          width: "100%",
          padding: "10px",
        }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "50%" }} onClick={() => handleTabChange(0)}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
          </div>
          <div style={{ width: "50%" }} onClick={() => handleTabChange(1)}>
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          </div>
        </div>
        {selectedTab === 0 && <Login setonClick1={setonClick} />}
        {selectedTab === 1 && <Signup />}
      </div>
    </div>
  );
};

export default HomePage;
