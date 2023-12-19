import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../apiConfig";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const { user } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (user) {
            navigate("/user");
        }
    }, [user]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setErrorMessage("Password and Confirm Password must be the same.");
        }
        if (formData.username.length < 4) {
            return setErrorMessage("Username must be between 4 - 15 characters.");
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
            toast.success("Registered successfully");
            navigate("/login");
            setErrorMessage("");
        } catch (error) {
            console.error(error);
            toast.success("Error ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isValidUsername = (input) => {
        const regex = /^[a-zA-Z0-9_]{0,15}$/;
        return regex.test(input);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (isValidUsername(value) && id === "username") {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card" style={{ width: "300px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                <div className="position-relative ">
                    <img
                        src="https://phantom-marca.unidadeditorial.es/eb0189a0c393f5d4f13aa60a403ff70b/resize/1200/f/jpg/assets/multimedia/imagenes/2022/05/21/16531430122810.jpg"
                        className="card-img-top"
                    />
                    <div className="position-absolute top-0 start-0 mx-3 my-2">
                        <Link className="text-decoration-none text-black" to="/">
                            Back
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formData.username.length < 4 && formData.username.length > 1 ? "is-invalid" : formData.username.length > 1 ? "is-valid" : ""}`}
                                id="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errorMessage ? "is-invalid" : formData.password.length > 1 ? "is-valid" : ""}`}
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errorMessage ? "is-invalid" : formData.confirmPassword.length > 1 ? "is-valid" : ""}`}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                        <button type="submit" className="btn btn-dark w-100" disabled={isLoading}>
                            {" "}
                            Submit{" "}
                        </button>
                    </form>
                    <hr />
                    <p className="text-center m-0">
                        Already have an account?{" "}
                        <Link className="text-decoration-none" to="/login">
                            {" "}
                            Login{" "}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
