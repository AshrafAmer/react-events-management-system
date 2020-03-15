import React from "react";

let Admin = () => {
    let profileStyle = {
        border: "solid 3px rgba(255, 255, 255, 0.85)",
        "border-radius": "25px"
    };

    let imageStyle = {
        "border-radius": "50%"
    };
    return (
        <section className="page-section cta">
            <div className="container">
                <div className="row">
                    <div className="col-8 mx-auto p-1" style={profileStyle}>
                        <div className="cta-inner text-center rounded">
                            <div className="box box-primary">
                                <div className="box-body box-profile">
                                    <img
                                        className="img-responsive img-circle"
                                        style={imageStyle}
                                        src="images/admin.jpg"
                                        alt="User profile picture"
                                    />

                                    <h3 className="profile-username text-center mt-2">
                                        Admin
                                    </h3>

                                    <p className="text-muted text-center">
                                        ITI events CMS Administrator
                                    </p>

                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item text-center">
                                            <b>City</b>{" "}
                                            <span className="ml-2">
                                                EL-Mansoura
                                            </span>
                                        </li>
                                        <li className="list-group-item text-center">
                                            <b>Street</b>{" "}
                                            <span className="ml-5">543</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Building</b>{" "}
                                            <span className="ml-5">12A</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;
