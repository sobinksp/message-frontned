import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const User = () => {
    const { user, logout, isAdmin } = useAuth();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (!user) {
            return logout();
        }
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card" style={{ width: "300px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                <img
                    src="https://assets-global.website-files.com/5e73a1e3ba24f2cd5dd2232a/64a5cbf166d336d7b96f0072_623252137601e709a7776df5_Shiba%2520Inu%2520Coin_%2520Entenda%2520como%2520minerar.jpeg"
                    className="card-img-top"
                />
                <div className="position-absolute top-0 start-0 mx-3 my-2">
                    <Link className="text-decoration-none text-black" to="/">
                        Home
                    </Link>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        Welcome <span className="text-primary">{user?.username}</span>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Logged in as {user?.role}</h6>
                    <hr />
                    <Outlet />
                </div>
                
                <ul className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action" to="./verify">
                        Verify
                    </Link>
                    <a className="list-group-item list-group-item-action" href="#">
                        A third item
                    </a>
                    {isAdmin && (
                        <Link className="list-group-item list-group-item-action" to="./manage">
                            Mange User
                        </Link>
                    )}
                </ul>
                <div className="card-body d-flex justify-content-end ">
                    <button className="btn btn-outline-danger" onClick={() => logout()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
