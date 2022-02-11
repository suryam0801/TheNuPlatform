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

  const user = useSelector((state: RootState) => state.userReducer.user);

  const { width, height } = useWindowSize();

  const [widthToUse, setwidthToUse] = React.useState("300px");

  const [chipData, setChipData] = React.useState<readonly ChipData[]>(
    categoriesState.categories
  );

  function handleClick(chip: ChipData) {
    dispatch(SetCategoryAction(chip.key));
  }

  React.useEffect(() => {
    console.log(width);
    setwidthToUse(width - 10 + "px");
  }, [width]);

  async function showInfoWindow() {
    try {
      await navigator.share({ title: "Share My Page", url: "#/" + auth.currentUser!.uid});
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
        overflow: "auto",
        maxWidth: widthToUse,
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <InfoIcon
        style={{ width: 30, height: 30, marginRight: 10 }}
        onClick={showInfoWindow}
      ></InfoIcon>
      {chipData.map((chip) => {
        return (
          <ListItem key={chip.key}>
            <Chip
              style={{ marginRight: 5 }}
              label={chip.label}
              onClick={() => handleClick(chip)}
              color={categoriesState.category == chip.key ? "success" : "info"}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
