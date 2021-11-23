import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Box, Checkbox, Typography } from "@mui/material";

function Chart({ bookings }) {
  const [priceSelected, setPriceSelected] = useState(true);
  const [bookingCountSelected, setBookingCountSelected] = useState(false);
  const [datasets, setDatasets] = useState([]);

  let dates = [];
  let prices = [];
  let bookingCounts = [];
  bookings.forEach((booking) => {
    dates.push(moment(booking.date).format("D/M/YY"));
    prices.push(booking.price);
    bookingCounts.push(booking.total_booking_count);
  });

  let priceConfig = {
    label: "Price",
    data: prices,
    fill: false,
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "rgba(255, 99, 132, 0.2)",
    yAxisID: "y-axis-1",
  };
  let bookingConfig = {
    label: "Booking Count",
    data: bookingCounts,
    fill: false,
    backgroundColor: "rgb(54, 162, 235)",
    borderColor: "rgba(54, 162, 235, 0.2)",
    yAxisID: "y-axis-2",
  };

  const onDatesetChange = () => {
    if (priceSelected && bookingCountSelected)
      setDatasets([priceConfig, bookingConfig]);
    else if (priceSelected && !bookingCountSelected) setDatasets([priceConfig]);
    else if (bookingCountSelected && !priceSelected)
      setDatasets([bookingConfig]);
  };
  const onSelectPrice = (e) => {
    if (!e.target.checked && !bookingCountSelected) return;
    setPriceSelected(e.target.checked);
  };
  const onSelectBookingCount = (e) => {
    if (!e.target.checked && !priceSelected) return;
    setBookingCountSelected(e.target.checked);
  };
  useEffect(() => {
    onDatesetChange();
  }, [priceSelected, bookingCountSelected]);

  const data = {
    labels: dates,
    datasets,
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  console.log("datasets:", datasets);
  return (
    <Box maxWidth="100%" p={2} display="flex" justifyContent="center">
      <Box width={600}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body1">Price</Typography>
            <Checkbox
              onChange={(e) => onSelectPrice(e)}
              checked={priceSelected}
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body1">Booking Count</Typography>
            <Checkbox
              onChange={(e) => onSelectBookingCount(e)}
              // checked={bookingCountSelected}
            />
          </Box>
        </Box>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
}

export default Chart;
