<<<<<<< HEAD
=======

>>>>>>> 493bf9d55eed82e5a0015a00199b2dda22136007
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./../src/css/index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
