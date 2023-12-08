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
    const { chatData, userInformation, sendMessage, selectedUser, setSelectedUser, selectedChat, setSelectedChat, chatMesssages } = useChat();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const handleSelectUser = (user, chatId) => {
        setSelectedUser(user)
        setSelectedChat(chatId)
    }
    return (
        <ScreenDiv>
            <UserList chatData={chatData} userInformation={userInformation} user={user} handleSelectUser={handleSelectUser} selectedUser={selectedUser} setIsOpen={setIsOpen} isOpen={isOpen}/>
            <ChatMessage selectedUser={selectedUser} sendMessage={sendMessage} selectedChat={selectedChat} user={user} chatMesssages={chatMesssages}/>
            {isOpen && <AddChat setIsOpen={setIsOpen} />}
        </ScreenDiv>
    );
};

export default Chat;
