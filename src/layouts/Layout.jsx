import React from "react";
import { Outlet } from "react-router-dom";
// import Nav from "../components/FixedSections/Nav/Nav";
// import Footer from "../components/FixedSections/Footer/Footer";

const Layout = () => {
    return (
        <React.Fragment>
            {/* <Nav /> */}
            <Outlet />
            {/* <Footer /> */}
        </React.Fragment>
    );
};

export default Layout;
