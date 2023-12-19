import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WrapperDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100vh;
    z-index: 3;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CardDiv = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    width: 300px;

`
const AddChat = ({ setIsOpen, createNewChat }) => {
    const [recipientId, setRecipientId] = useState("");
    const navigate = useNavigate();
    const handleAddUser = async (e) => {
        setRecipientId("");
        e.preventDefault();
        await createNewChat(recipientId);
        setIsOpen(false);
    };
    return (
        <WrapperDiv>
            <CardDiv className="card">
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
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter user id"
                            value={recipientId}
                            onChange={(e) => setRecipientId(e.target.value)}
                            required
                        />
                        <button className="btn btn-success" onClick={handleAddUser}>
                            Add
                        </button>
                    </div>
                </div>
            </CardDiv>
        </WrapperDiv>
    );
};

export default AddChat;
