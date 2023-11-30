import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-3" style={{ width: "300px" }}>
                <div className="d-flex">
                    <span>Home</span><div className="vr mx-2"></div>
                    <Link className="text-decoration-none" to="/login">Login</Link><div className="vr mx-2"></div>
                    <Link className="text-decoration-none" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
