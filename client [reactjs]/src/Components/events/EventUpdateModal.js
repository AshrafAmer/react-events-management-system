import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";

class EventUpdateModal extends Component {
    state = {
        _id: "",
        title: "",
        eventDate: "",
        mainSpeaker: "",
        otherSpeakers: []
    };

    componentDidMount() {
        let AllSpeakers;
        axios.get("http://localhost:8085/speakers/list").then(res => {
            // console.log(res.data);
            AllSpeakers = res.data;
        });

        // console.log(AllSpeakers);

        $("#eventUpdateModal").on("show.bs.modal", function(event) {
            let button = $(event.relatedTarget); // Button that triggered the modal
            let eventObject = button.data("title"); // Extract info from data-* attributes
            let modal = $(this);
            modal
                .find(".modal-title")
                .text("Update " + eventObject.title + " event Data");

            modal.find("#_id").val(eventObject._id);
            modal.find("#title").val(eventObject.title);

            let dt = new Date(eventObject.eventDate);
            let day = ("0" + dt.getDate()).slice(-2);
            let month = ("0" + (dt.getMonth() + 1)).slice(-2);
            let date = dt.getFullYear() + "-" + month + "-" + day;
            modal.find("#eventDate").val(date);

            $("select[name=mainSpeaker]").text("");
            $("select[name=otherSpeakers]").text("");
            AllSpeakers.forEach(item => {
                if (eventObject.mainSpeaker._id != item.id)
                    $("select[name=mainSpeaker]").append(
                        `<option value='${item._id}'>${item.fullName}</option>`
                    );
                else
                    $("select[name=mainSpeaker]").append(
                        `<option selected value='${item._id}'>${item.fullName}</option>`
                    );
            });

            for (let i = 0; i < eventObject.otherSpeakers.length; i++) {
                AllSpeakers.forEach(item => {
                    if (eventObject.otherSpeakers[i]._id != item._id)
                        $("select[name=otherSpeakers]").append(
                            `<option value='${item._id}'>${item.fullName}</option>`
                        );
                    else
                        $("select[name=otherSpeakers]").append(
                            `<option selected value='${item._id}'>${item.fullName}</option>`
                        );
                });
            }
        });
    }

    onUpdateEvent = e => {
        debugger;
        // console.log(
        //     $("#_id")[0].value,
        //     $("#title")[0].value,
        //     $("#eventDate")[0].value,
        //     $("#mainSpeaker")[0].value,
        //     $("#otherSpeakers")[0].value
        // );
        $.ajax({
            url: "http://localhost:8085/events/update",
            method: "post",
            contentType: "Application/json",
            data: JSON.stringify({
                _id: $("#_id")[0].value,
                title: $("#title")[0].value,
                eventDate: $("#eventDate")[0].value,
                mainSpeaker: $("#mainSpeaker")[0].value,
                otherSpeakers: $("#otherSpeakers")[0].value
            }),
            dataType: "text",
            success(data) {
                // console.log(data);
            },
            error(error) {
                // console.log(error);
            }
        });
    };

    render() {
        return (
            <div
                className="modal fade"
                id="eventUpdateModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="eventUpdateModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="eventUpdateModalLabel"
                            ></h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="home" onSubmit={this.onUpdateEvent}>
                            <div className="modal-body">
                                <input type="hidden" id="_id" name="_id" />
                                <div className="form-group">
                                    <label htmlFor="title">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        id="title"
                                        aria-describedby="event title"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="date">Event Date</label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        className="form-control"
                                        id="eventDate"
                                        aria-describedby="event date"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mainSpeaker">
                                        Event Main Speaker
                                    </label>
                                    <select
                                        id="mainSpeaker"
                                        name="mainSpeaker"
                                        className="browser-default custom-select"
                                        required
                                    ></select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="otherSpeakers">
                                        Event Other Speakers [Ctrl+click]
                                    </label>
                                    <select
                                        name="otherSpeakers"
                                        id="otherSpeakers"
                                        className="custom-select"
                                        multiple
                                    ></select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventUpdateModal;
