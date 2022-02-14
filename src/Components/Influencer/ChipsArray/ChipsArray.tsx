import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useWindowSize } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { SetCategoryAction } from "../../../Redux/Actions/SelectedCategoryActions";
import { RootState } from "../../../Store";

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

  function handleClick(chip: ChipData) {
    dispatch(SetCategoryAction(chip.key));
  }

  React.useEffect(() => {
    console.log(width);
    setwidthToUse(width - 5 + "px");
  }, [width]);
  
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
