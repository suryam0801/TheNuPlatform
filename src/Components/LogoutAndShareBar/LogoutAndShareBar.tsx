import React from "react";

import ShareIcon from "@mui/icons-material/Share";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";
import { Grid, IconButton } from "@mui/material";
import useAuthHook from "../../CustomHooks/useAuthHook";

export default function LogoutAndShareBar() {

  const {SignOut} = useAuthHook();

  async function showInfoWindow() {
    try {
      await navigator.share({
        title: "Share My Page",
        url: "#/" + auth.currentUser!.uid,
      });
      console.log("Data was shared successfully");
    } catch (err) {
      console.error("Share failed:", err);
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <IconButton
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: "blue",
              borderRadius: 5,
              height: 25,
              marginLeft: 10,
              marginTop: 3.4
            }}
            onClick={() => SignOut()}
          >
            <LogoutIcon
              style={{
                width: 22,
                height: 22,
                marginRight: 5,
                color: "white",
              }}
            ></LogoutIcon>
            Signout
          </IconButton>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <IconButton
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: "blue",
              borderRadius: 5,
              height: 25,
              marginLeft: 10,
              marginTop: 3.4
            }}
            onClick={showInfoWindow}
          >
            <ShareIcon
              style={{
                width: 22,
                height: 22,
                marginRight: 10,
                color: "white",
              }}
              onClick={showInfoWindow}
            ></ShareIcon>
            Share My Page
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
