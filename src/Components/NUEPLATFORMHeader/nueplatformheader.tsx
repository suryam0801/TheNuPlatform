import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function MiddleDividers() {
  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>N U E P L A T F O R M</h1>
      <Divider variant="middle" style={{ marginBottom: 10, backgroundColor: "black" }}/>
      <h5 style={{color: "white", letterSpacing: 2, marginBottom: 50}}>Real People | Anonymous Conversation</h5>
    </div>
  );
}
