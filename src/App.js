import React, { useState } from "react";
import Table from "./containers/Table";
import Loader from "./components/Loader";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Table setLoading={setLoading} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Loader open={loading} />
    </BrowserRouter>
  );
}

export default App;
