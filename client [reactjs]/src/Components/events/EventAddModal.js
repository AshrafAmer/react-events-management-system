import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";

class EventAddModal extends Component {
    state = {
        Allspeakers: [],
        _id: "",
        title: "",
        mainSpeaker: "",
        eventDate: "",
        otherSpeakers: []
    };

    componentDidMount() {
        axios("http://localhost:8085/events/add").then(res => {
            // console.log(res.data);
            this.setState({
                Allspeakers: res.data
            });
        });
    }

    onFormSubmit = e => {
        axios
            .post("http://localhost:8085/events/add", {
                _id: this.state._id,
                title: this.state.title,
                mainSpeaker: this.state.mainSpeaker,
                eventDate: this.state.eventDate,
                otherSpeakers: this.state.otherSpeakers
            })
            .then(res => {
                // console.log(res);
            });
    };

    render() {
        let mainSpeakersOptions = this.state.Allspeakers.map((item, i) => {
            return (
                <option value={item._id} key={i}>
                    {item.fullName}
                </option>
            );
        });

        let speakersFilter = e => {
            this.setState({
                mainSpeaker: e.target.value
            });

            $("select[name=otherSpeakers]").text("");
            // console.log($("select[name=mainSpeaker]")[0].value);
            this.state.Allspeakers.forEach(item => {
                if ($("select[name=mainSpeaker]")[0].value != item._id)
                    $("select[name=otherSpeakers]").append(
                        `<option value='${item._id}'> ${item.fullName}</option>`
                    );
            });
        };

        return (
            <div
                className="modal fade"
                id="eventAddModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="eventAddModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="eventAddModalLabel"
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
                        <form action="/home" onSubmit={this.onFormSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="_id">Event ID</label>
                                    <input
                                        type="number"
                                        min="1"
                                        name="_id"
                                        className="form-control"
                                        aria-describedby="event title"
                                        required
                                        onChange={e =>
                                            this.setState({
                                                _id: e.target.value
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="title">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        aria-describedby="event title"
                                        required
                                        onChange={e =>
                                            this.setState({
                                                title: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="date">Event Date</label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        className="form-control"
                                        aria-describedby="event date"
                                        required
                                        onChange={e =>
                                            this.setState({
                                                eventDate: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label for="mainSpeaker">
                                        Event Main Speaker
                                    </label>
                                    <select
                                        name="mainSpeaker"
                                        className="browser-default custom-select"
                                        required
                                        onChange={e => {
                                            speakersFilter(e);
                                        }}
                                    >
                                        <option>Choose Main Speaker</option>
                                        {mainSpeakersOptions}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label for="otherSpeakers">
                                        Event Other Speakers [Ctrl+click]
                                    </label>
                                    <select
                                        name="otherSpeakers"
                                        className="custom-select"
                                        multiple
                                        onChange={e => {
                                            let temp = this.state.otherSpeakers;
                                            temp.push(e.target.value);
                                            this.setState({
                                                otherSpeakers: temp
                                            });
                                            // console.log(
                                            //     this.state.otherSpeakers
                                            // );
                                        }}
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
                                    Add New Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EventAddModal;
