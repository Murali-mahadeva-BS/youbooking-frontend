import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            YouBooking
          </Typography>
          <Button color="inherit" component={Link} to="/table">
            Table
          </Button>
          <Button color="inherit" component={Link} to="/chart">
            Chart
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
