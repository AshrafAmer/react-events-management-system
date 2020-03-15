import React, { Component } from "react";
import PublicHeader from "./../include/PublicHeader";
import axios from "axios";
import $ from "jquery";

class Register extends Component {
    state = {
        _id: "",
        fullName: "",
        userName: "",
        password: "",
        address: { city: "", street: "", building: "" }
    };

    onFormSubmit = e => {
        axios
            .post("http://localhost:8085/register", {
                _id: this.state._id + 1,
                fullName: this.state.fullName,
                userName: this.state.userName,
                password: this.state.password,
                address: this.state.address
            })
            .then(res => {
                // console.log("Worked...");
            });
    };

    componentWillMount() {
        axios.get("http://localhost:8085/register").then(res => {
            this.setState({
                _id: res.data._id
            });
        });
        $("#submit").prop("disabled", true);
    }

    fullNameValidation = e => {
        this.setState({
            fullName: e.target.value
        });
        if (/^[a-zA-Z ]*$/.test(this.state.fullName) == false) {
            $("#fullNameError").text("your name must be characters ONLY");
            $("input[name=fullName]").removeClass("is-valid");
            $("input[name=fullName]").addClass("is-invalid");
        } else {
            $("input[name=fullName]").removeClass("is-invalid");
            $("input[name=fullName]").addClass("is-valid");
            $("#fullNameError").text("");
            this.enableSubmit();
        }
    };

    userNameValidation = e => {
        this.setState({
            userName: e.target.value
        });
        if (/^\w+$/.test(this.state.userName) == false) {
            $("#usernameError").text(
                "user name must be characters, Numbers, and ONLY '_'"
            );
            $("input[name=userName]").removeClass("is-valid");
            $("input[name=userName]").addClass("is-invalid");
        } else {
            $("input[name=userName]").removeClass("is-invalid");
            $("input[name=userName]").addClass("is-valid");
            $("#usernameError").text("");
            this.enableSubmit();
        }
    };

    passwordValidation = e => {
        this.setState({
            password: e.target.value
        });
        if (/^\w+$/.test(this.state.password) == false) {
            $("#passwordError").text(
                "password must be characters, Numbers, and ONLY '_'"
            );
            $("input[name=password]").removeClass("is-valid");
            $("input[name=password]").addClass("is-invalid");
        } else {
            $("input[name=password]").removeClass("is-invalid");
            $("input[name=password]").addClass("is-valid");
            $("#passwordError").text("");
            this.enableSubmit();
        }
    };

    cityValidation = e => {
        this.setState({
            address: {
                city: e.target.value,
                street: this.state.address.street,
                building: this.state.address.building
            }
        });
        if (/^[A-Za-z]+$/.test(this.state.address.city) == false) {
            $("#cityError").text("city must be Only characters");
            $("#city").removeClass("is-valid");
            $("#city").addClass("is-invalid");
        } else {
            $("#city").removeClass("is-invalid");
            $("#city").addClass("is-valid");
            $("#cityError").text("");
            this.enableSubmit();
        }
    };

    streetValidation = e => {
        this.setState({
            address: {
                city: this.state.address.city,
                street: e.target.value,
                building: this.state.address.building
            }
        });
        if (/^[0-9]+$/.test(this.state.address.street) == false) {
            $("#streetError").text("Street must be Only Numbers > 0");
            $("#street").removeClass("is-valid");
            $("#street").addClass("is-invalid");
        } else {
            $("#street").removeClass("is-invalid");
            $("#street").addClass("is-valid");
            $("#streetError").text("");
            this.enableSubmit();
        }
    };

    buildingValidation = e => {
        this.setState({
            address: {
                city: this.state.address.city,
                street: this.state.address.street,
                building: e.target.value
            }
        });

        if (
            /^[0-9]+$/.test(this.state.address.building) == false ||
            Number(this.state.address.building) <= 0
        ) {
            $("#buildingError").text("building must be Only Numbers > 0");
            $("#building").removeClass("is-valid");
            $("#building").addClass("is-invalid");
        } else {
            $("#building").removeClass("is-invalid");
            $("#building").addClass("is-valid");
            $("#buildingError").text("");
            this.enableSubmit();
        }
    };

    enableSubmit = () => {
        if (
            $("input[name=_id]").val() > 0 &&
            $("input[name=fullName]").hasClass("is-valid") &&
            $("input[name=userName]").hasClass("is-valid") &&
            $("input[name=password]").hasClass("is-valid") &&
            $("#city").hasClass("is-valid") &&
            $("#street").hasClass("is-valid") &&
            $("#building").hasClass("is-valid")
        ) {
            // check validation
            $("#submitMessage").text("Submit Now...");
            $("#submit").prop("disabled", false);
        } else {
            // console.log("worked");
        }
    };

    render() {
        let styleContainer = {
            border: "solid 3px rgba(255, 255, 255, 0.85)",
            borderRaduis: "25px"
        };
        return (
            <div>
                <PublicHeader />
                <section className="page-section cta">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-xl-9 mx-auto p-2 m-5"
                                style={styleContainer}
                            >
                                <div className="cta-inner text-center rounded">
                                    <h2 className="section-heading mb-5">
                                        <span className="section-heading-upper">
                                            Register as Speaker
                                        </span>
                                        <span className="section-heading-lower">
                                            CMS ITI events
                                        </span>
                                    </h2>
                                    <form
                                        action="/login"
                                        className="m-5"
                                        encType="multipart/form-data"
                                        onSubmit={this.onFormSubmit}
                                    >
                                        <div className="form-group">
                                            <p className="text-danger h3"></p>
                                            <input
                                                type="hidden"
                                                name="_id"
                                                className="form-control"
                                                value={this.state._id}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fullName">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                aria-describedby="Speaker Full Name"
                                                required
                                                value={this.state.fullName}
                                                onChange={e =>
                                                    this.fullNameValidation(e)
                                                }
                                            />
                                            <small
                                                id="fullNameError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="userName">
                                                username
                                            </label>
                                            <input
                                                type="text"
                                                name="userName"
                                                className="form-control"
                                                aria-describedby="Speaker User Name"
                                                required
                                                value={this.state.userName}
                                                onChange={e =>
                                                    this.userNameValidation(e)
                                                }
                                            />
                                            <small
                                                id="usernameError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">
                                                password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                aria-describedby="Speaker password"
                                                required
                                                value={this.state.password}
                                                onChange={e =>
                                                    this.passwordValidation(e)
                                                }
                                            />
                                            <small
                                                id="passwordError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <label>Speaker Address</label>
                                            <input
                                                type="text"
                                                name="address.city"
                                                className="form-control"
                                                id="city"
                                                placeholder="City"
                                                required
                                                value={this.state.address.city}
                                                onChange={e =>
                                                    this.cityValidation(e)
                                                }
                                            />
                                            <small
                                                id="cityError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="address.street"
                                                className="form-control"
                                                id="street"
                                                placeholder="Street Number"
                                                required
                                                min="0"
                                                value={
                                                    this.state.address.street
                                                }
                                                onChange={e =>
                                                    this.streetValidation(e)
                                                }
                                            />
                                            <small
                                                id="streetError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="number"
                                                name="address.building"
                                                className="form-control"
                                                id="building"
                                                placeholder="Building Number"
                                                min="0"
                                                required
                                                value={
                                                    this.state.address.building
                                                }
                                                onChange={e =>
                                                    this.buildingValidation(e)
                                                }
                                            />
                                            <small
                                                id="buildingError"
                                                className="form-text text-danger"
                                            ></small>
                                        </div>

                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                id="submit"
                                                className="btn btn-primary"
                                            >
                                                Register Now
                                            </button>
                                            <small
                                                id="submitMessage"
                                                className="form-text text-muted h5"
                                            >
                                                Fill all required fields first
                                                to open register button...
                                            </small>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;
