import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";
import ConnectionRequests from "./pages/ConnectionRequests.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Connections from "./pages/Connections.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AuthPage /> },
      { path: "/feed", element: <Feed /> },
      { path: "/profile", element: <Profile /> },
      { path: "connections", element: <Connections /> },
      { path: "/connectionRequests", element: <ConnectionRequests /> },
      { path: "/editProfile", element: <EditProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
