import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const App = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
      {/* <Navigate to="/Login"></Navigate> */}
    </div>
  );
};

export default App;
