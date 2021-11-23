import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DirectionsIcon from "@mui/icons-material/Directions";
import Chart from "./Chart";
import { visuallyHidden } from "@mui/utils";

function Row({ booking }) {
  const [open, setOpen] = React.useState(false);
  let lat = booking.lat_long.split(",")[0];
  let long = booking.lat_long.split(",")[1];
  let price = booking.bookings.length > 0 && booking.bookings[0].price;
  let bookingCount =
    booking.bookings.length > 0 &&
    booking.bookings.sort((a, b) => b - a)[0].total_booking_count;

  return (
    <TableBody key={booking.id}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.product_title}
        </TableCell>
        <TableCell align="center">{price}</TableCell>
        <TableCell align="center">{bookingCount}</TableCell>
        <TableCell align="center">{booking.destination}</TableCell>
        <TableCell align="left">
          {booking.segments.map((segment) => (
            <Chip label={segment} size="small" key={segment} />
          ))}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            target="_blank"
            href={`https://maps.google.com/?q=${lat},${long}`}
          >
            <DirectionsIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Chart bookings={booking.bookings} />
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

const columns = [
  { id: "product_title", label: "Product Title", minWidth: 100, align: "left" },
  { id: "price", label: "Price(HKD)", minWidth: 100, align: "center" },
  {
    id: "total_booking_count",
    label: "Booking Count",
    minWidth: 100,
    align: "center",
  },
  { id: "destination", label: "Destination", minWidth: 100, align: "center" },
  { id: "segments", label: "Category", minWidth: 100, align: "left" },
  { id: "lat_long", label: "Directions", minWidth: 100, align: "center" },
];

export default function TableList({
  bookings,
  page,
  perPage,
  handleChangePage,
  handleChangePerPage,
  totalBookings,
  orderBy,
  order,
  sortHandler,
}) {
  const createSortHandler = (property) => (event) => {
    sortHandler(event, property);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <>
                <TableCell />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.id === "price" ||
                    column.id === "total_booking_count" ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </>
            </TableRow>
          </TableHead>
          {bookings.map((booking) => (
            <Row key={booking.id} booking={booking} />
          ))}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 40, 50]}
        component="div"
        count={totalBookings}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePerPage}
      />
      {bookings.length === 0 && (
        <Typography variant="h6" component="div" p={5} align="center">
          No items found, try a different search
        </Typography>
      )}
    </Paper>
  );
}
