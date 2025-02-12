import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed.jsx";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Profile from "./components/Profile.jsx";
import ConnectionRequests from "./components/ConnectionRequests.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Connections from "./components/Connections.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AuthPage /> },
      { path: "/feed", element: <Feed /> },
      { path: "/profile", element: <Profile /> },
      { path: "connections", element: <Connections /> },
      {path: "/connectionRequests", element: <ConnectionRequests/>},
      {path: "/editProfile", element: <EditProfile/>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
