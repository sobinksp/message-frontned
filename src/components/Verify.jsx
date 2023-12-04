import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const inputRef = useRef(null);
    const { user, setIsOpen } = useAuth();
    const navigate = useNavigate();
    const handleCopyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            setInfoMessage("Copied to clipboard")
            setTimeout(() => {
                setInfoMessage("");
            }, 3000);
        }
    };

    const handleVerifyToken = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/demo-controller", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setSuccessMessage(response.data);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
            setErrorMessage("Error verify token");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    return (
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">Token Verification</h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        setIsOpen(false);
                        navigate("/user");
                    }}
                />
            </div>
            {errorMessage ? (
                <div className="alert alert-danger ">{errorMessage}</div>
            ) : successMessage ? (
                <div className="alert alert-success ">{successMessage}</div>
            ) : infoMessage ? (
                <div className="alert alert-info">{infoMessage}</div>
            ): (
                <div></div>
            )}
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="token" value={user?.token} readOnly ref={inputRef} />
                <button className="btn btn-primary" type="button" onClick={handleCopyToClipboard}>
                    Copy
                </button>
            </div>
            <button className="btn btn-success w-100 fw-bold" onClick={handleVerifyToken}>
                Verify
            </button>
        </div>
    );
};

export default Verify;
