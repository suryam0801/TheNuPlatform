import { Grid } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { RootState } from "../../../Store";
import { useSelector } from "react-redux";

export default function IdentitySeparationRow() {
  const user = useSelector((state: RootState) => state.userReducer.user);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div style={{ fontSize: 15 }}>{user?.Username ?? "Influencer"}</div>
          <ArrowDownwardIcon
            style={{ width: 15, height: 15 }}
          ></ArrowDownwardIcon>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <div style={{ fontSize: 15 }}>Followers</div>
          <ArrowDownwardIcon
            style={{ width: 15, height: 15 }}
          ></ArrowDownwardIcon>
        </Grid>
      </Grid>
    </div>
  );
}
