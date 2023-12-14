import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChat = ({ setIsOpen, createNewChat }) => {
    const [recipientId, setRecipientId] = useState("");
    const navigate = useNavigate();
    const handleAddUser = async (e) => {
        setRecipientId("");
        e.preventDefault();
        await createNewChat(recipientId);
        setIsOpen(false);
    }
    return (
        <div className="card position-absolute z-3 top-50 start-50" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">Add user</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/chat");
                        }}
                    />
                </div>
                <div className="input-group">
                    <input type="number" className="form-control" placeholder="Enter user id" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} required/>
                    <button className="btn btn-success" onClick={handleAddUser}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddChat;
