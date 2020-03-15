import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/login/Login.js";
import Logout from "./Components/login/Logout.js";
import EventsList from "./Components/events/ListEvents.js";
import SpeakersList from "./Components/speakers/ListSpeakers";
import SpeakersProfile from "./Components/speakers/SpeakersProfile";
import Register from "./Components/register/Register";

class AppClass extends React.Component {
    componentWillMount() {}

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={EventsList} />
                    <Route exact path="/speakers" component={SpeakersList} />
                    <Route exact path="/logout" component={Logout} />
                    <Route
                        exact
                        path="/speakers/profile"
                        component={SpeakersProfile}
                    />
                </BrowserRouter>
            </div>
        );
    }
}
export default AppClass;
