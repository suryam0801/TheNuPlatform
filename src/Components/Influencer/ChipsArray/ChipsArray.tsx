import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
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

  const categoriesState = useSelector((state:RootState) => state.selectedCategoryReducer)

  const { width, height } = useWindowSize();

  const [widthToUse, setwidthToUse] = React.useState("300px");

  const [chipData, setChipData] = React.useState<readonly ChipData[]>(categoriesState.categories);

  function handleClick(chip: ChipData) {
    dispatch(SetCategoryAction(chip.key));
  };

  React.useEffect(() => {
    console.log(width);
    setwidthToUse(width - 10 + "px");
  }, [width]);

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
