import React, { useEffect } from "react";
import { FaPenToSquare, FaMagnifyingGlass } from "react-icons/fa6";
import styled from "styled-components";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";

const UserListDiv = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: #222;
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
const ImgProfile = styled.img`
    width: 45px;
    border-radius: 50%;
`;
const SearchDiv = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;
const MagnifyingIcon = styled(FaMagnifyingGlass)`
    position: absolute;
    top: 50%;
    left: 10px; /* Adjust the left position as needed */
    transform: translateY(-50%);
`;

const SearchInput = styled.input`
    padding-left: 30px;
`;

const UserList = ({ chatData, userInformation, handleSelectUser, user, selectedUser, isOpen, setIsOpen }) => {
    return (
        <UserListDiv className="p-3">
            <div className="mb-3 d-flex gap-2">
                <SearchDiv>
                    <MagnifyingIcon />
                    <SearchInput type="search" className="form-control" placeholder="Search" />
                </SearchDiv>
                <button className="btn text-white bg-transparent" onClick={() => setIsOpen(!isOpen)}>
                    <FaPenToSquare />
                </button>
            </div>
            <div>
                <ul className="list-group list-group-active">
                    {chatData?.map((chat) =>
                        chat.members.map((userId) => {
                            const isCurrentUser = userId === user?.id;
                            if (!isCurrentUser) {
                                return (
                                    <li
                                        key={userId}
                                        className={`list-group-item list-group-item-action ${selectedUser?.id === userId ? "active" : ""} d-flex justify-content-between align-items-start`}
                                        onClick={() => handleSelectUser(userInformation[userId], chat.id)}
                                        role="button"
                                    >
                                        <ImgProfile src="https://cdn-icons-png.flaticon.com/512/6236/6236513.png" />
                                        <div className="ms-2 me-auto text-truncate">
                                            <div className="fw-bold">
                                                <span className={``}>{userInformation[userId]?.username}</span>
                                            </div>
                                            *last message here*
                                        </div>
                                        <span className="badge bg-danger rounded-pill"></span>
                                    </li>
                                );
                            }

                            return null;
                        })
                    )}
                    {chatData.length === 0 && (
                        <li className="list-group-item d-flex justify-content-between align-items-start disabled">
                            <ImgProfile src="https://cdn-icons-png.flaticon.com/512/8824/8824303.png" />
                            <div className="ms-2 me-auto text-truncate">
                                <div className="fw-bold">No user chat found</div>
                                Add new user to chat
                            </div>
                            <span className="badge bg-danger rounded-pill"></span>
                        </li>
                    )}
                </ul>
            </div>
        </UserListDiv>
    );
};

export default UserList;
