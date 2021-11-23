import axios from "axios";

export const fetchBookings = async (params) => {
  try {
    // let url = `http://localhost:8000/bookings`;
    let url = `https://youbooking.herokuapp.com/bookings`;
    let resp = await axios.get(url, { params });
    // console.log("resp:", resp);
    if (resp && resp.status === 200) {
      return resp.data;
    } else {
      console.log("Error API call:", resp.data.message);
      return false;
    }
  } catch (err) {
    console.log("Error in Api call:", err);
    return false;
  }
};
