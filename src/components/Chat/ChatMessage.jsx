import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaPaperPlane, FaPaperclip, FaAngleLeft, FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const ImgProfile = styled.img`
    width: 60px;
    border-radius: 50%;
`;

const ImgChat = styled.img`
    width: 40px;
    border-radius: 50%;
`;
const UserInfoDiv = styled.div`
    background: #222;
`;
const ChatContainer = styled.div`
    height: 100vh;
    position: relative;
`;

const ChatDiv = styled.div`
    height: calc(100vh - 76px - 72px);
    overflow: auto;

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

const ChatStack = styled.div`
    display: flex;
    align-items: end;
    &.self {
        margin-top: 1rem;
        flex-direction: row-reverse;
    }
`;

const ChatBalloon = styled.div`
    display: flex;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
    background-color: #212529;
    color: #fff;
`;

const ChatSelfBalloon = styled(ChatBalloon)`
    background-color: #0d6efd;
`;

const BackToBottom = styled.div`
    position: absolute;
    left: 50%;
    bottom: 100px;
    background-color: #b6bbc4;
    padding: 12px 16px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
        opacity: 0.8;
    }
`;
const ChatMessage = ({ selectedUser, sendMessage, sendMessageWS, selectedChat, user, chatMesssages }) => {
    const messageContainerRef = useRef(null);
    const [showButton, setShowButton] = useState(false);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");

    const scrollToBottom = () => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

        const handleScroll = () => {
            const maxScrollHeight = messageContainerRef.current.scrollHeight;
            const containerHeight = messageContainerRef.current.clientHeight;
            const isScrollingUp = messageContainerRef.current.scrollTop < maxScrollHeight - containerHeight;

            setShowButton(isScrollingUp);
        };

        messageContainerRef.current.addEventListener("scroll", handleScroll);

        return () => {
            if (messageContainerRef.current) messageContainerRef.current.removeEventListener("scroll", handleScroll);
        };
    }, [chatMesssages]);

    const handleSend = () => {
        if (!message) {
            return setMessageError("Invalid Message");
        }
        const messageData = {
            chatId: selectedChat,
            content: message,
            senderId: user?.id,
            recipientId: selectedUser.id,
        };
        sendMessageWS(messageData);
        setMessage("");
        setMessageError("");
    };

    return (
        <ChatContainer>
            <UserInfoDiv className="py-2 px-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <ImgProfile src={selectedUser?.userImageUrl ? selectedUser?.userImageUrl : "https://cdn-icons-png.flaticon.com/512/8824/8824303.png"} />
                    <h4 className="mb-0 fw-bold text-white">
                        {selectedUser ? <span className="text-warning">{selectedUser.username}</span> : "No user selected"}
                    </h4>
                </div>
                <div>
                    <Link to="/user" className="text-decoration-none link-danger">
                        <h5>
                            <FaAngleLeft /> Back
                        </h5>
                    </Link>
                </div>
            </UserInfoDiv>
            {selectedUser ? (
                <ChatDiv className="p-3" ref={messageContainerRef}>
                    {chatMesssages?.map((message, i) =>
                        message.senderId !== user?.id.toString() ? (
                            <div key={i}>
                                <ChatStack>
                                    <ImgChat src={selectedUser?.userImageUrl ? selectedUser?.userImageUrl : "https://cdn-icons-png.flaticon.com/512/8824/8824303.png"} />
                                    <ChatBalloon>{message.content}</ChatBalloon>
                                </ChatStack>
                                <div className="text-start ms-5">{moment(message.timestamp).calendar()}</div>
                            </div>
                        ) : (
                            <div key={i}>
                                <ChatStack className="self">
                                    <ImgChat src={user?.userImageUrl ? user?.userImageUrl : "https://cdn-icons-png.flaticon.com/512/4600/4600417.png"} />
                                    <ChatSelfBalloon>{message.content}</ChatSelfBalloon>
                                </ChatStack>
                                <div className="text-end me-5">{moment(message.timestamp).calendar()}</div>
                            </div>
                        )
                    )}
                </ChatDiv>
            ) : (
                <ChatDiv ref={messageContainerRef} className="d-flex justify-content-center align-items-center">
                    <h3>Please select user to start conversation</h3>
                </ChatDiv>
            )}
            <div className="p-3 d-flex gap-2 border-top border-2">
                <div className="input-group">
                    {/* <button className="btn btn-primary">
                        <FaPaperclip />
                    </button> */}
                    <input
                        type="text"
                        className={`form-control ${messageError ? "is-invalid" : ""}`}
                        placeholder="Message"
                        disabled={!selectedUser}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    <button className="btn btn-dark" onClick={handleSend} disabled={!selectedUser}>
                        <FaPaperPlane /> Send
                    </button>
                </div>
            </div>
            {showButton && (
                <BackToBottom onClick={scrollToBottom}>
                    <FaAngleDown />
                </BackToBottom>
            )}
        </ChatContainer>
    );
};

export default ChatMessage;
