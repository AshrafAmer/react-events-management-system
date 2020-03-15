import React, { Component } from "react";
import SpeakerUpdateModal from "./SpeakerUpdateModal";
import Header from "./../include/Header";
import $ from "jquery";

import axios from "axios";

class ListSpeakers extends Component {
    state = {
        Speakers: []
    };

    componentWillMount() {
        if (sessionStorage.getItem("role") != "undefined") {
            console.log(sessionStorage.getItem("role"));
        } else {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        axios("http://localhost:8085/speakers/list").then(res => {
            console.log(res.data);
            this.setState({
                Speakers: res.data
            });
        });
    }
    render() {
        let speakersRemove = (item, td) => {
            td.persist();
            $.ajax({
                url: "http://localhost:8085/speakers/delete",
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
                    console.log(error);
                }
            });
        };

        let tableStyle = {
            border: "solid 3px rgba(255, 255, 255, 0.85)",
            borderRadius: "25px"
        };

        if (this.state.Speakers == null) {
            return <div>Loading</div>;
        } else {
            let SpeakersList = this.state.Speakers.map((item, i) => {
                return (
                    <tr key={i}>
                        <th scope="row">{item._id}</th>
                        <td>{item.fullName}</td>

                        <td>
                            {item.address.city},{item.address.street} st,
                            {item.address.building} building
                        </td>
                        {sessionStorage.getItem("role") == "admin" ? (
                            <td>
                                <a
                                    className="btn btn-light"
                                    data-toggle="modal"
                                    data-target="#speakerUpdateModal"
                                    data-title={JSON.stringify(item)}
                                >
                                    update
                                </a>
                                <button
                                    className="btn btn-danger"
                                    onClick={e => speakersRemove(item._id, e)}
                                >
                                    delete
                                </button>
                            </td>
                        ) : (
                            ""
                        )}
                    </tr>
                );
            });
            if (sessionStorage.getItem("role") === "undefined") {
                return <></>;
            } else {
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
                                                    Coming ITI Events
                                                </span>
                                            </h2>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">
                                                            Speaker Name
                                                        </th>
                                                        <th scope="col">
                                                            Address
                                                        </th>
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
                                                <tbody>{SpeakersList}</tbody>
                                            </table>
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
}
export default ListSpeakers;
