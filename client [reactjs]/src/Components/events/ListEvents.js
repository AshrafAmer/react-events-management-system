import React, { Component } from "react";
import axios from "axios";
import Header from "./../include/Header";
import $ from "jquery";
import EventAddModal from "./EventAddModal";
import EventUpdateModal from "./EventUpdateModal";

class ListEvents extends Component {
    state = {
        Events: []
    };

    componentWillMount() {
        axios("http://localhost:8085/session").then(res => {
            if (res.data) {
                let resObj = JSON.parse(JSON.stringify(res.data));
                if (resObj.role == "admin" || resObj.role == "speaker") {
                    sessionStorage.setItem("role", resObj.role);
                    sessionStorage.setItem("user_id", resObj.id);
                    // console.log(resObj);
                    // console.log("Role======>", sessionStorage.getItem("role"));
                    // console.log("ID======>", sessionStorage.getItem("user_id"));
                } else {
                    this.props.history.push("/login");
                }
            } else {
                this.props.history.push("/login");
            }
        });
    }

    componentDidMount() {
        // console.log(sessionStorage.getItem("role"));
        axios("http://localhost:8085/events/list").then(res => {
            // console.log("Events Data ========> ", res.data);
            this.setState({
                Events: res.data
            });
        });
    }

    render() {
        let eventRemove = (item, td) => {
            td.persist();
            $.ajax({
                url: "http://localhost:8085/events/delete",
                method: "post",
                contentType: "Application/json",
                data: JSON.stringify({ _id: item }),
                dataType: "text",
                success(data) {
                    $(td.target)
                        .parents("tr")
                        .remove();
                },
                error(error) {
                    // console.log(error);
                }
            });
        };

        let tableStyle = {
            border: "solid 3px rgba(255, 255, 255, 0.85)",
            borderRadius: "25px"
        };

        if (sessionStorage.getItem("role") === "undefined") {
            return <></>;
        } else if (this.state.Events == null) {
            return <div>Loading</div>;
        } else {
            let EventsList = this.state.Events.map((item, i) => {
                let otherSpeakers = item.otherSpeakers.map((_item, _i) => {
                    return <p key={_i}>{_item.fullName}</p>;
                });
                return (
                    <tr key={i}>
                        <th scope="row">{item._id}</th>
                        <td>{item.title}</td>
                        <td>
                            {item.mainSpeaker
                                ? item.mainSpeaker.fullName
                                : "No Main Speaker"}
                        </td>
                        <td>{otherSpeakers}</td>
                        <td>{item.eventDate.slice(0, -1).split("T")[0]}</td>

                        {sessionStorage.getItem("role") == "admin" ? (
                            <td>
                                <a
                                    className="btn btn-light"
                                    data-toggle="modal"
                                    data-target="#eventUpdateModal"
                                    data-title={JSON.stringify(item)}
                                >
                                    update
                                </a>
                                <button
                                    className="btn btn-danger"
                                    onClick={e => {
                                        eventRemove(item._id, e);
                                    }}
                                >
                                    delete
                                </button>
                            </td>
                        ) : (
                            <td></td>
                        )}
                    </tr>
                );
            });
            return (
                <>
                    <Header />
                    <section className="page-section cta">
                        <div className="container">
                            <div className="row">
                                <div
                                    className="col-xl-12 mx-auto p-1"
                                    style={tableStyle}
                                >
                                    <div className="cta-inner text-center rounded">
                                        <h2 className="section-heading mb-5">
                                            <span className="section-heading-upper">
                                                Come On In
                                            </span>
                                            <span className="section-heading-lower">
                                                Coming ITI events
                                            </span>
                                            {sessionStorage.getItem("role") ==
                                            "admin" ? (
                                                <span>
                                                    <a
                                                        className="btn btn-dark btn-outline-info text-white"
                                                        data-toggle="modal"
                                                        data-target="#eventAddModal"
                                                    >
                                                        Add New event
                                                    </a>
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </h2>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">
                                                        Main Speaker
                                                    </th>
                                                    <th scope="col">
                                                        Other Speakers
                                                    </th>
                                                    <th scope="col">Date</th>
                                                    {sessionStorage.getItem(
                                                        "role"
                                                    ) == "admin" ? (
                                                        <th scope="col">
                                                            Actions
                                                        </th>
                                                    ) : (
                                                        ""
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>{EventsList}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EventUpdateModal />
                        <EventAddModal />
                    </section>
                </>
            );
        }
    }
}
export default ListEvents;
