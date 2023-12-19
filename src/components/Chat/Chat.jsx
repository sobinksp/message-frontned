import React, { useState } from "react";
import styled from "styled-components";
import UserList from "./UserList";
import ChatMessage from "./ChatMessage";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import AddChat from "./AddChat";

const ScreenDiv = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 5fr;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Chat = () => {
    const {
        chatData,
        userInformation,
        sendMessage,
        sendMessageWS,
        selectedUser,
        setSelectedUser,
        selectedChat,
        setSelectedChat,
        chatMesssages,
        onlineUsers,
        createNewChat,
    } = useChat();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <ScreenDiv>
            <UserList
                chatData={chatData}
                userInformation={userInformation}
                user={user}
                setSelectedUser={setSelectedUser}
                setSelectedChat={setSelectedChat}
                selectedUser={selectedUser}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                onlineUsers={onlineUsers}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
            <ChatMessage selectedUser={selectedUser} sendMessageWS={sendMessageWS} selectedChat={selectedChat} user={user} chatMesssages={chatMesssages} toggleMenu={toggleMenu}/>
            {isOpen && <AddChat setIsOpen={setIsOpen} createNewChat={createNewChat} />}
        </ScreenDiv>
    );
};

export default Chat;
