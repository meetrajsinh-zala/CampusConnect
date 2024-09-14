import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default App;
