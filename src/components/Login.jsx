import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = "https://localhost/login";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert(responseData);
            } else {
                alert(response.statusText);
            }
        
        } catch (error) {
            alert(error.message);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-3" style={{ width: "300px" }}>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input type="text" className="form-control" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={formData.username} onChange={handleChange} required/>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-dark w-100">Submit</button>
                </form>
                <hr />
                    <p className="text-center m-0">
                        Don't have an account? <Link className="text-decoration-none" to="/register">Register</Link>
                    </p>
            </div>
        </div>
    );
};

export default Login;
