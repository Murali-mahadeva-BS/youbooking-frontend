import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "outdoor adventure",
  "activities & experiences",
  "tours & sightseeing",
  "adrenaline junkies",
  "culture experience",
  "theme parks",
  "attractions & shows",
  "popular attractions",
  "museums & galleries",
  "beyond the city",
  "local sightseeing",
  "cruising",
  "railway & public transport",
  "transport & travel services",
  "public & shared airport transfers",
  "zoo & aquarium",
  "evening to-dos",
  "for lovers",
  "art & culture",
  "shows & performances",
  "dive & snorkel",
  "nature escapes",
  "air & cruise tours",
  "island hopping",
  "water activities",
  "diving experience",
  "private airport transfers",
  "guided food tours",
  "dining experience",
  "food & dining",
];

export default function MultipleSelectChip() {
  const [selectedCategories, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ width: 300, marginLeft: 1 }}>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        multiple
        value={selectedCategories}
        onChange={handleChange}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
