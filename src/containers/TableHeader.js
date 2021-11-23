import React from "react";
import { Box, TextField, Button } from "@mui/material";

function TableHeader({
  category,
  product,
  onProductChange,
  onCategoryChange,
  onClickFilter,
  onClickReset,
}) {
  return (
    <Box
      //   p={1}
      //   boxShadow={1}
      //   borderRadius={3}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        label="Search by product"
        variant="filled"
        value={product}
        onChange={(e) => onProductChange(e)}
      />
      <TextField
        label="Search by category"
        variant="filled"
        sx={{ marginLeft: 1 }}
        value={category}
        onChange={(e) => onCategoryChange(e)}
      />
      {/* <MultipleSelectChip /> */}
      <Button
        variant="contained"
        sx={{ marginLeft: 1 }}
        size="large"
        onClick={onClickFilter}
      >
        Filter
      </Button>
      <Button
        variant="contained"
        sx={{ marginLeft: 1 }}
        size="large"
        onClick={onClickReset}
      >
        Reset
      </Button>
    </Box>
  );
}

export default TableHeader;
