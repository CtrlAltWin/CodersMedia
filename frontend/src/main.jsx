import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Feed from "./components/Feed.jsx";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Profile from "./components/Profile.jsx";
import ConnectionsPage from "./components/ConnectionsPage.jsx";
import ConnectionRequests from "./components/ConnectionRequests.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/feed", element: <Feed /> },
      { path: "/profile", element: <Profile /> },
      { path: "connections", element: <ConnectionsPage /> },
      {path: "/connectionRequests", element: <ConnectionRequests/>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
