import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Login = () => {
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    useEffect(() => {
        if (user) {
            navigate("/user");
        }
    }, [user]);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8080/api/auth/authentication", formData);
            localStorage.setItem("auth_token", response.data.token);
            setUser(response.data);
            navigate("/user");
            alert("Login successful");
        } catch (error) {
            console.error(error);
            alert("Error login");
        } finally {
            setIsLoading(false);
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
            <div className="card" style={{ width: "300px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                <img
                    src="https://phantom-marca.unidadeditorial.es/20a4180a111a6e5362034ddbdcfa9b59/resize/828/f/jpg/assets/multimedia/imagenes/2022/04/01/16488355685861.jpg"
                    className="card-img-top"
                />
                <div className="position-absolute top-0 start-0 mx-3 my-2">
                    <Link className="text-decoration-none text-black" to="/">
                        Back
                    </Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
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
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-dark w-100" disabled={isLoading}>
                            {" "}
                            Submit
                        </button>
                    </form>
                    <hr />
                    <p className="text-center m-0">
                        Don't have an account?{" "}
                        <Link className="text-decoration-none" to="/register">
                            {" "}
                            Register{" "}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
