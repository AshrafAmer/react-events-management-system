import React, { Component } from "react";
import PublicHeader from "./../include/PublicHeader";
import axios from "axios";
class Login extends Component {
    state = {
        userName: "",
        password: ""
    };

    onLoginSubmit = e => {
        // debugger;
        axios.post("http://localhost:8085/login", {
            userName: this.state.userName,
            password: this.state.password
        });
    };

    render() {
        return (
            <>
                <PublicHeader />
                <h1 className="site-heading text-center text-white d-none d-lg-block">
                    <span className="site-heading-upper text-primary mb-3">
                        ITI Events Control Management System
                    </span>
                    <span className="site-heading-lower">ITI Events CMS</span>
                </h1>
                <section className="page-section clearfix">
                    <div className="container">
                        <div className="intro">
                            <img
                                className="intro-img img-fluid mb-3 mb-lg-0 rounded"
                                src="images/conference.jpg"
                                alt="conference login image"
                            />
                            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
                                <h2 className="section-heading mb-4">
                                    <span className="section-heading-upper">
                                        Login To Our System
                                    </span>
                                    <span className="section-heading-lower">
                                        speakers
                                    </span>
                                </h2>
                                <form
                                    className="needs-validation"
                                    noValidate
                                    action="/"
                                    onSubmit={this.onLoginSubmit}
                                >
                                    <div className="form-check form-row">
                                        <div className="form-check-inline col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text"
                                                        id="inputGroupPrepend"
                                                    >
                                                        {/* <FontAwesomeIcon icon="user" /> */}
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="user name"
                                                    className="form-control"
                                                    id="validationCustomUsername3"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    onChange={e => {
                                                        this.setState({
                                                            userName:
                                                                e.target.value
                                                        });
                                                    }}
                                                />
                                                <div className="invalid-feedback">
                                                    Please enter your username.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-check-inline mt-3 mb-3 col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text"
                                                        id="inputGroupPrepend"
                                                    >
                                                        <i className="fa fa-lock"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="password"
                                                    className="form-control"
                                                    id="validationCustomUsername4"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    onChange={e => {
                                                        this.setState({
                                                            password:
                                                                e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <small></small>
                                    </div>
                                    <div className="intro-button mx-auto">
                                        <button
                                            className="btn btn-primary btn-xl"
                                            type="submit"
                                        >
                                            Login Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Login;
