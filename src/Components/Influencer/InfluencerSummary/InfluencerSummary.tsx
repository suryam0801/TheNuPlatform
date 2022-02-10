import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {useWindowSize} from 'react-use';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({}));

export default function ChipsArray() {

  const {width, height} = useWindowSize();

  const [widthToUse, setwidthToUse] = React.useState("300px")

  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Hate: 100" },
    { key: 1, label: "Questions: 200" },
    { key: 2, label: "Comments: 400" },
    { key: 3, label: "Heartfelt Messages: 200" }
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  React.useEffect(() => {
    console.log(width)
    setwidthToUse((width - 10)+"px")
  }, [width])

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
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
