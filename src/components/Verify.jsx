import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Verify = () => {
    const { user } = useAuth();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef(null);

    const handleCopyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
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
            }, 5000);
        } catch (error) {
            console.error(error);
            setErrorMessage("Error verify token");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <>
            {errorMessage ? (
                <div className="alert alert-danger ">{errorMessage}</div>
            ) : successMessage ? (
                <div className="alert alert-success ">{successMessage}</div>
            ) : (
                <div></div>
            )}
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="token" value={user?.token} readOnly ref={inputRef} />
                <button class="btn btn-primary" type="button" onClick={handleCopyToClipboard}>
                    Copy
                </button>
            </div>
            <button className="btn btn-success w-100 fw-bold" onClick={handleVerifyToken}>
                Verify
            </button>
        </>
    );
};

export default Verify;
