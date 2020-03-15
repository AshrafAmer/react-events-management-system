import React from "react";
import { Link } from "react-router-dom";

let PublicHeader = () => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark py-lg-4"
            id="mainNav"
        >
            <div className="container">
                <Link
                    exact
                    className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none"
                    to="/"
                >
                    ITI events CMS
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-lg-4">
                            <Link
                                exact
                                className="nav-link text-uppercase text-expanded"
                                to="/"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item px-lg-4">
                            <Link
                                exact
                                className="nav-link text-uppercase text-expanded"
                                to="/register"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default PublicHeader;
