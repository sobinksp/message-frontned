import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import toast from "react-hot-toast";

const SOCKET_URL = "http://localhost:8080/api/auth/ws";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [chatData, setChatData] = useState([]);
    const [userInformation, setUserInformation] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatMesssages, setChatMessages] = useState([]);
    const [messageNotifications, setMessageNotifications] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (user) {
            const socket = new SockJS(SOCKET_URL);
            const stomp = Stomp.over(socket);
            const onConnected = () => {
                setStompClient(stomp);
                stomp.subscribe(`/user/${user?.id}/queue/messages`, onMessageReceived);
                stomp.subscribe(`/user/public/connect`, getOnlineUsers);
                stomp.send(`/app/user.addUser`, {}, JSON.stringify({ id: user?.id, username: user?.username, role: user?.role, status: "ONLINE" }));
                getOnlineUsers();
            };

            const onError = (error) => {
                console.error("WebSocket connection error:", error);
            };

            stomp.connect({}, onConnected, onError);
        }

        return () => {
            if (stompClient) {
                console.log("disconnect web socket");
                stompClient.send(
                    `/app/user.disconnectUser`,
                    {},
                    JSON.stringify({ id: user?.id, username: user?.username, role: user?.role, status: "OFFLINE" })
                );
                stompClient.disconnect();
            }
        };
    }, [user]);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        const { chatId, content, senderId, recipientId } = message;
        const selectedUserObject = JSON.parse(localStorage.getItem("selectedUser"));
        if (selectedUserObject?.id.toString() === senderId) {
            setChatMessages((prevMessages) => [...prevMessages, { chatId, content, senderId, recipientId }]);
        }
    };

    const sendMessageWS = (messageData) => {
        const { chatId, content, senderId, recipientId } = messageData;
        if (stompClient) {
            stompClient.send("/app/chat", {}, JSON.stringify({ chatId, content, senderId, recipientId }));
            setChatMessages((prevMessages) => [...prevMessages, { chatId, content, senderId: String(senderId), recipientId: String(recipientId) }]);
        } else {
            toast.error("Error sending message");
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (stompClient) {
                console.log("disconnect web socket");
                stompClient.send(
                    `/app/user.disconnectUser`,
                    {},
                    JSON.stringify({ id: user?.id, username: user?.username, role: user?.role, status: "OFFLINE" })
                );
                stompClient.disconnect();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [stompClient]);

    const getOnlineUsers = async () => {
        const token = user?.token;
        if (token) {
            try {
                const response = await axios.get("http://localhost:8080/api/usersOnline", { headers: { Authorization: `Bearer ${token}` } });
                const filtered = response.data.filter((onlineUser) => onlineUser.id !== user?.id);
                setOnlineUsers(filtered);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const sendMessage = async (messageData) => {
        const { chatId, content, senderId, recipientId } = messageData;
        const token = user?.token;
        if (token) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/message`,
                    {
                        chatId,
                        content,
                        senderId,
                        recipientId,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setChatMessages((prevMessages) => [...prevMessages, response.data]);
                toast.success("Message sent successfully");
            } catch (error) {
                console.error(error);
                toast.error("Error sending message");
            }
        }
    };

    const createNewChat = async (recipientId) => {
        const token = user?.token;
        if (token) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/chat",
                    { members: [user?.id, recipientId] },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setChatData((prevChats) => [...prevChats, response.data]);
                toast.success("Chat created successfully");
            } catch (error) {
                console.error(error);
                toast.success("Error creating chat");
            }
        }
    };

    useEffect(() => {
        const getChat = async () => {
            const token = user?.token;
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/chat/${user?.id}`, { headers: { Authorization: `Bearer ${token}` } });
                    setChatData(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getChat();
    }, [user]);

    useEffect(() => {
        const getUserInformation = async () => {
            const token = user?.token;
            if (token) {
                try {
                    for (const chat of chatData) {
                        for (const userId of chat.members) {
                            if (user?.id !== userId) {
                                const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                const userInfo = await response.data;
                                setUserInformation((prevInfo) => ({
                                    ...prevInfo,
                                    [userId]: userInfo,
                                }));
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getUserInformation();
    }, [chatData]);

    useEffect(() => {
        const getMessage = async () => {
            const token = user?.token;
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/message/${selectedChat}`, { headers: { Authorization: `Bearer ${token}` } });
                    setChatMessages(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getMessage();
    }, [selectedChat]);

    return (
        <ChatContext.Provider
            value={{
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
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};
