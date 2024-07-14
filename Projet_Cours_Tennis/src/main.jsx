import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Principal from "./component/Principal.jsx";
import Ressource from "./component/Ressource.jsx";
import Reservation from "./component/Reservation.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/principal",
        element: <Principal/>,
    },
    {
        path: "/detail/:id",
        element: <Ressource/>,
    },
    {
        path: "/reservation/:id",
        element: <Reservation/>,
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
)
