import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("../layouts/Layout.jsx"));
const NotFound = lazy(() => import("../pages/notFounded/NotFounded.jsx"));
const Home = lazy(() => import("../pages/home/Home.jsx"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default routes;
