import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import { useWindowSize } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { SetCategoryAction } from "../../../Redux/Actions/SelectedCategoryActions";
import { RootState } from "../../../Store";
import { auth } from "../../../firebase";
import ShareIcon from "@mui/icons-material/Share";
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthHook from "../../../FirebaseCalls/useAuthHook";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({}));

export default function ChipsArray() {
  const dispatch = useDispatch();

  const categoriesState = useSelector(
    (state: RootState) => state.selectedCategoryReducer
  );

  const { width } = useWindowSize();

  const [widthToUse, setwidthToUse] = React.useState("300px");

  const [chipData, setChipData] = React.useState<readonly ChipData[]>(
    categoriesState.categories
  );

  const {logOut}  = useAuthHook();

  function handleClick(chip: ChipData) {
    dispatch(SetCategoryAction(chip.key));
  }

  React.useEffect(() => {
    console.log(width);
    setwidthToUse(width - 5 + "px");
  }, [width]);

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
    <Paper
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "nowrap",
        listStyle: "none",
        overflow: "scroll",
        maxWidth: widthToUse,
        p: 0.2,
        m: 0,
        alignItems: "center"
      }}
      component="ul"
    >
      <LogoutIcon
        style={{ width: 25, height: 25, marginRight: 5, color: "#1672f9" }}
        onClick={logOut}
      ></LogoutIcon>
      <ShareIcon
        style={{ width: 25, height: 25, marginRight: 10, color: "#1672f9" }}
        onClick={showInfoWindow}
      ></ShareIcon>
      {chipData.map((chip) => {
        return (
          <ListItem key={chip.key}>
            <Chip
              style={{
                marginRight: 5,
                color: categoriesState.category == chip.key ? "white" : "#149c4a",
                backgroundColor: categoriesState.category == chip.key ? "#149c4a" : "white",
                borderWidth: 1,
                borderColor: categoriesState.category == chip.key ? "white" : "#149c4a"
              }}
              label={chip.label}
              color="default"
              variant="outlined"
              onClick={() => handleClick(chip)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
