import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./HomePage";
import CoinPage from "./CoinPage";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/coinpage/:id",
        element: <CoinPage />,
      },
    ],
  },
]);

const MainPage = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default MainPage;
