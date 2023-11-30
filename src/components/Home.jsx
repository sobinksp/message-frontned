import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card" style={{ width: "300px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                <img
                    src="https://www.coindesk.com/resizer/-W6sKwnQ6wqvHsf0dzbLhjTbScY=/567x320/filters:quality(80):format(jpg)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/WMXJCFJ3ERCETA6TJNZ5NQPNKA.webp"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">Hello!👋</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Mini Project</h6>
                    <p className="card-text">React and Spring Boot App with JWT.</p>
                </div>
                <ul className="list-group list-group-flush list-group-active">
                    <a className="list-group-item list-group-item-action" href="https://github.com/sobinksp/message-frontned" target="_blank">
                        Frontend Repository
                    </a>
                    <a className="list-group-item list-group-item-action" href="https://github.com/sobinksp/backend-message" target="_blank">
                        Backend Repository
                    </a>
                </ul>
                <div className="card-body">
                    <Link className="card-link text-decoration-none" to="/login">
                        Enter
                    </Link>
                    <Link className="card-link text-decoration-none" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
