import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Nav from './components/nav.jsx';
import Home from './components/Home.jsx';
import Createpost from './components/create_post.jsx';
import Updatepost from "./components/update_post.jsx"
import Admindash from './components/admin_dashboard.jsx';
const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Signup',
        element: <SignUp />,
      },
      {path:"/Nav",element:<Nav/>},
      {path:"/Home",element:<Home/>},
      {path:"/createpost",element:<Createpost/>},
      {path:"/updatepost",element:<Updatepost/>},
      {path:"/admindash",element:<Admindash/>},
    ],
  },
]);

createRoot (document.getElementById ('root')).render (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);