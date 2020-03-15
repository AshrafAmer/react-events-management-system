import React, { Component } from "react";
import $ from "jquery";

class SpeakerUpdateModal extends Component {
    state = {
        _id: "",
        fullName: "",
        address: { city: "", street: "", building: "" }
    };

    componentDidMount() {
        $("#speakerUpdateModal").on("show.bs.modal", function(event) {
            let button = $(event.relatedTarget); // Button that triggered the modal
            let eventObject = button.data("title"); // Extract info from data-* attributes
            let modal = $(this);
            modal
                .find(".modal-title")
                .text("Update " + eventObject.fullName + " Data");
            console.log(eventObject);
            modal.find("#_id").val(Number(sessionStorage.getItem("user_id")));
            modal.find("#fullName").val(eventObject.fullName);
            modal.find("#city").val(eventObject.address.city);
            modal.find("#street").val(eventObject.address.street);
            modal.find("#building").val(eventObject.address.building);
        });
    }

    onFormSubmit = e => {
        // console.log(
        //     $("#_id")[0].value,
        //     $("#fullName")[0].value,
        //     $("#city")[0].value,
        //     $("#street")[0].value,
        //     $("#building")[0].value
        // );
        $.ajax({
            url: "http://localhost:8085/speakers/update",
            method: "post",
            contentType: "Application/json",
            data: JSON.stringify({
                _id: $("#_id")[0].value,
                fullName: $("#fullName")[0].value,
                address: {
                    city: $("#city")[0].value,
                    street: $("#street")[0].value,
                    building: $("#building")[0].value
                }
            }),
            dataType: "text",
            success(data) {
                console.log(data);
            },
            error(error) {
                console.log(error);
            }
        });
    };

    render() {
        return (
            <div
                className="modal fade"
                id="speakerUpdateModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="speakerUpdateModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="speakerUpdateModalLabel"
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
                        <form
                            action="/speakers/profile"
                            onSubmit={this.onFormSubmit}
                        >
                            <div className="modal-body">
                                <input type="hidden" id="_id" name="_id" />
                                <div className="form-group">
                                    <label htmlFor="fullName">
                                        Speaker Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        id="fullName"
                                        aria-describedby="event title"
                                        onChange={e => {
                                            this.state.fullName =
                                                e.target.value;
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Speaker Address</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        className="form-control"
                                        id="city"
                                        aria-describedby="event title"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="address.street"
                                        className="form-control"
                                        id="street"
                                        aria-describedby="event title"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="address.building"
                                        className="form-control"
                                        id="building"
                                        aria-describedby="event title"
                                    />
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
                                    Update Speaker
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SpeakerUpdateModal;
