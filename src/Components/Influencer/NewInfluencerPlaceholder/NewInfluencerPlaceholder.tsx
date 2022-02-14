import { Divider } from "@mui/material";
import React from "react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

export default function NewInfluencerPlaceholder() {
  return (
    <div className="main">
      <h1 style={{ color: "white", marginBottom: 15 }}>Welcome to</h1>
      <Divider style={{ backgroundColor: "white" }}></Divider>
      <h1 style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
        N U E P L A T F O R M
      </h1>
      <Divider style={{ backgroundColor: "white" }}></Divider>

      <p>1) Connect with all your fans in this group chat</p>

      <p>
        2) We help categorize the messages so you can focus on the meaningful
        ones!
      </p>

      <p style={{ fontSize: 20, marginTop: 80 }}>
        To get started, share this link with all your fans!
      </p>
    </div>
  );
}
