import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
    componentWillMount() {
        axios("http://localhost:8085/logout").then(res => {
            if (res.data == "ok") {
                sessionStorage.clear();
                this.props.history.push("/login");
            }
        });
    }

    render() {
        return <></>;
    }
}

export default Logout;
