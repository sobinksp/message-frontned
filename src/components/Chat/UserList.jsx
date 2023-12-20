import React, { useEffect, useState } from "react";
import { FaPenToSquare, FaMagnifyingGlass } from "react-icons/fa6";
import styled from "styled-components";

const UserListDiv = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: #222;
    transition: left 0.3s ease;
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
    @media screen and (max-width: 768px) {
        position: absolute !important;
        z-index: 3;
        min-width: 0px;
        left: ${props => (props.open ? '0' : '-1000px')}; 
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

const OnlineLight = styled.div`
    width: 10px;
    height: 10px;
    background: #0eff00;
    border-radius: 50%;
    margin-left: 10px;
    box-shadow: 0px 0px 8px #0eff00;
`;
const OfflineLight = styled.div`
    width: 10px;
    height: 10px;
    background: #d3d3d3;
    border-radius: 50%;
    margin-left: 10px;
    box-shadow: 0px 0px 8px #d3d3d3;
`;

const UserList = ({ chatData, userInformation, user, selectedUser, isOpen, setIsOpen, onlineUsers, setSelectedUser, setSelectedChat, isMenuOpen, toggleMenu }) => {
    const [searchFilter, setSearchFilter] = useState("");

    const filteredUserIds = Object.keys(userInformation).filter((userId) =>
        userInformation[userId].username.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const handleSelectUser = (recipientUser, chatId) => {
        setSelectedUser(recipientUser)
        setSelectedChat(chatId)
        localStorage.setItem("selectedUser", JSON.stringify(recipientUser));
        toggleMenu();
    }

    
    return (
        <UserListDiv className="p-3" open={isMenuOpen}>
            <div className="mb-3 d-flex gap-2">
                <SearchDiv>
                    <MagnifyingIcon />
                    <SearchInput
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
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
                            const onlineUser = onlineUsers.find((onlineUser) => onlineUser.id === userId);
                            if(isCurrentUser) return null;
                            if (filteredUserIds.includes(userId.toString())) {
                                return (
                                    <li
                                        key={userId}
                                        className={`list-group-item list-group-item-action ${
                                            selectedUser?.id === userId ? "active" : ""
                                        } d-flex justify-content-between align-items-start`}
                                        onClick={() => handleSelectUser(userInformation[userId], chat.id)}
                                        role="button"
                                    >
                                        <ImgProfile src={userInformation[userId].userImageUrl ? userInformation[userId].userImageUrl : "https://cdn-icons-png.flaticon.com/512/8824/8824303.png"} />
                                        <div className="ms-2 me-auto text-truncate">
                                            <div className="fw-bold">
                                                <span className="d-flex align-items-center">
                                                    {userInformation[userId]?.username} ({userInformation[userId]?.id}){onlineUser ? <OnlineLight /> : <OfflineLight />}
                                                </span>
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
                        <li className="list-group-item d-flex justify-content-between align-items-start" onClick={toggleMenu}>
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
