import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./providers/index.jsx";
import LogOffRoute from "./routes/LogOffRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PrivateTeamsRoute from "./routes/PrivateTeamsRoute.jsx";
import Root from "./Root.jsx";
import Error from "./Error.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Overview from "./pages/Overview.jsx";
import Profile from "./pages/Profile.jsx";
import Teams from "./pages/Teams.jsx";
import Notifications from "./pages/Notifications.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <LogOffRoute>
              <SignIn />
            </LogOffRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <Overview />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "teams/:id",
              element: (
                <PrivateTeamsRoute>
                  <Teams />
                </PrivateTeamsRoute>
              ),
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
