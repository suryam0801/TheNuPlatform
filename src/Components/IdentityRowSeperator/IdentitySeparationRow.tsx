import { Grid } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export default function IdentitySeparationRow() {
  const influencer = useSelector((state: RootState) => state.influencerReducer.influencer);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div style={{ fontSize: 15 }}>{influencer?.Username ?? "Influencer"}</div>
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
