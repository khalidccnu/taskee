import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./providers/index.jsx";
import Root from "./Root.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [],
    },
  ]);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
