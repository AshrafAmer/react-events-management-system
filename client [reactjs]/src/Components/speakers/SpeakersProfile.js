import React, { Component } from "react";
import axios from "axios";
import Header from "./../include/Header";
import SpeakerUpdateModal from "./SpeakerUpdateModal";
import AdminProfile from "./../profiles/Admin";

class SpeakerProfile extends Component {
    state = {
        data: {
            fullName: "",
            image: "",
            userName: "",
            address: { city: "", street: "", building: "" }
        }
    };

    componentWillMount() {
        if (sessionStorage.getItem("role") != "undefined") {
            console.log(sessionStorage.getItem("role"));
        } else {
            this.props.history.push("/login");
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem("role") === "speaker") {
            axios(
                `http://localhost:8085/speakers/profile/${Number(
                    sessionStorage.getItem("user_id")
                )}`
            ).then(res => {
                this.setState({
                    data: {
                        fullName: res.data[0].fullName,
                        image: res.data[0].image,
                        userName: res.data[0].userName,
                        address: {
                            city: res.data[0].address.city,
                            street: res.data[0].address.street,
                            building: res.data[0].address.building
                        }
                    }
                });
            });
        }
    }

    render() {
        let profileStyle = {
            border: "solid 3px rgba(255, 255, 255, 0.85)",
            borderRadius: "25px"
        };

        let imageStyle = {
            borderRadius: "50%",
            width: "50%",
            height: "65%"
        };
        if (sessionStorage.getItem("role") === "undefined") {
            return <></>;
        } else if (sessionStorage.getItem("role") === "admin") {
            return (
                <>
                    {" "}
                    <AdminProfile />{" "}
                </>
            );
        } else {
            return (
                <>
                    <Header />
                    <section className="page-section cta">
                        <div className="container">
                            <div className="row">
                                <div
                                    className="col-8 mx-auto p-1"
                                    style={profileStyle}
                                >
                                    <div className="cta-inner text-center rounded">
                                        <div className="box box-primary">
                                            <div className="box-body box-profile">
                                                <img
                                                    className="img-responsive img-circle"
                                                    style={imageStyle}
                                                    src={
                                                        "images/" +
                                                        this.state.data.image
                                                    }
                                                    alt="User profile picture"
                                                />

                                                <h3 className="profile-username text-center mt-2">
                                                    {this.state.data.fullName}
                                                </h3>

                                                <p className="text-muted text-center">
                                                    ITI Events Main Speaker
                                                </p>

                                                <ul className="list-group list-group-unbordered mb-4">
                                                    <li className="list-group-item text-center">
                                                        <b>City</b>
                                                        <span className="ml-2">
                                                            {
                                                                this.state.data
                                                                    .address
                                                                    .city
                                                            }
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item text-center">
                                                        <b>Street</b>
                                                        <span className="ml-5">
                                                            {
                                                                this.state.data
                                                                    .address
                                                                    .street
                                                            }
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <b>Building</b>
                                                        <span className="ml-5">
                                                            {
                                                                this.state.data
                                                                    .address
                                                                    .building
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>

                                                <span>
                                                    <a
                                                        className="btn btn-dark btn-outline-info text-white"
                                                        data-toggle="modal"
                                                        data-target="#speakerUpdateModal"
                                                        data-title={JSON.stringify(
                                                            this.state.data
                                                        )}
                                                    >
                                                        Edit profile
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SpeakerUpdateModal />
                    </section>
                </>
            );
        }
    }
}
export default SpeakerProfile;
