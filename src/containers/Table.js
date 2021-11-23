import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
// import MultipleSelectChip from "../components/MultiSelectChip";
import Loader from "../components/Loader";
import TableHeader from "./TableHeader";
import TableList from "./TableList";
import { fetchBookings } from "../utils";

function Table({ setLoading }) {
  const [state, setState] = useState({
    product: "",
    category: "",
    bookings: [],
    page: 0,
    perPage: 20,
    sort: "",
    totalBookings: 0,
    orderBy: "",
    order: "",
  });
  useEffect(() => {
    getBookings();
  }, [state.page, state.perPage, state.order, state.orderBy]);

  const sortHandler = async (event, property) => {
    const { orderBy, order } = state;
    const isAsc = orderBy === property && order === "asc";
    setState((prevState) => ({
      ...prevState,
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }));
  };
  const handleChangePage = async (event, page) => {
    setState((prevState) => ({ ...prevState, page }));
  };

  const handleChangePerPage = async (event) => {
    console.log("per page:", event.target.value);
    setState((prevState) => ({
      ...prevState,
      perPage: event.target.value,
      page: 0,
    }));
  };
  const onClickReset = async () => {
    setState((prevState) => ({
      ...prevState,
      product: "",
      category: "",
      order: "",
      orderBy: "",
    }));
    setLoading(true);
    await getBookings();
    setLoading(false);
  };
  const onClickFilter = async () => {
    setLoading(true);
    await getBookings();
    setLoading(false);
  };
  const onProductChange = (e) => {
    // e.preventDefault();
    setState((prevState) => ({ ...prevState, product: e.target.value }));
  };
  const onCategoryChange = (e) => {
    // e.preventDefault();
    setState((prevState) => ({ ...prevState, category: e.target.value }));
  };
  const getBookings = async () => {
    setLoading(true);
    const { page, perPage, product, category, order, orderBy } = state;
    let sort = orderBy && order ? `${orderBy},${order}` : "";
    let params = {
      page,
      perPage,
      sort,
      product,
      category,
    };
    console.log("params:", params);
    let data = await fetchBookings(params);
    if (data)
      setState((prevState) => ({
        ...prevState,
        bookings: data.bookings,
        totalBookings: data.totalItems,
      }));
    setLoading(false);
  };
  console.log("sorting details:", state.orderBy, state.order);
  return (
    <>
      <Box paddingTop={1}>
        <TableHeader
          category={state.category}
          product={state.product}
          onCategoryChange={onCategoryChange}
          onProductChange={onProductChange}
          onClickFilter={onClickFilter}
          onClickReset={onClickReset}
        />
        <Box paddingX={4} pt={1}>
          <TableList
            bookings={state.bookings}
            page={state.page}
            perPage={state.perPage}
            handleChangePage={handleChangePage}
            handleChangePerPage={handleChangePerPage}
            totalBookings={state.totalBookings}
            orderBy={state.orderBy}
            order={state.order}
            sortHandler={sortHandler}
          />
        </Box>
      </Box>
    </>
  );
}

export default Table;
