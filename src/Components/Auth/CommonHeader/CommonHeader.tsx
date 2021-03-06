import { Button, Grid } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";

export default function CommonHeader() {
  const influencer = useSelector((state: RootState) => state.influencerReducer.influencer);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div
            style={{
              height: 33,
              backgroundColor: "white",
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              alignItems: "center",
              paddingTop: 2,
              paddingLeft: 5
            }}
          >
            {/* n u e p l a t f o r m */}N U E P L A T F O R M
          </div>
        </Grid>
        <Grid item xs={4} style={{ backgroundColor: "white" }}>
          <Link to="/">
            <Button
              variant="contained"
              startIcon={auth.currentUser ? <div /> : <AddIcon />}
              style={{ height: 30, marginTop: 2 }}
            >
              {auth.currentUser ? "My Page" : "Room"}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
