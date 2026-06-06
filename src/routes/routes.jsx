import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// * Layouts
const Layout = lazy(() => import("../layouts/Layout.jsx"));
const NotFound = lazy(() => import("../pages/notFounded/NotFounded.jsx"));

// // * Pages
const Home = lazy(() => import("../pages/home/Home.jsx"));
// const About = lazy(() => import("../pages/About/About.jsx"));
// const Playground = lazy(() => import("../pages/Playground/Playground.jsx"));
// const Work = lazy(() => import("../pages/Work/Work.jsx"));

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
