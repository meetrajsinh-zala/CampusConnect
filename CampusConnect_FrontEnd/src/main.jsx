import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import ProtectedRount from "./components/ProtectedRount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <SignUp />,
      },
      {
        path: "/Home",
        element: <ProtectedRount><Home /></ProtectedRount>,
      },
      {
        path: "/Profile",
        element: <ProtectedRount><Profile /></ProtectedRount>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
