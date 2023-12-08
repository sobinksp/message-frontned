import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { initializeWebSocketConnection, disconnectWebSocket, sendMessage } from '../components/WebSocketService';
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [chatData, setChatData] = useState([]);
    const [userInformation, setUserInformation] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatMesssages, setChatMessages] = useState([]);
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
        // Initialize WebSocket connection when the user is available
        if (user) {
            initializeWebSocketConnection(user.id, (message) => {
            // Handle incoming WebSocket messages
            setChatMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    
        return () => {
            // Disconnect WebSocket when the component unmounts
            disconnectWebSocket();
        };
    }, [user]);

    useEffect(() => {
        const fetchUserInformation = async () => {
            const token = user?.token;
            if (token) {
                try {
                    for (const chat of chatData) {
                        for (const userId of chat.members) {
                            const response = await axios.get(`http://localhost:8080/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
                            const userInfo = await response.data;
                            setUserInformation((prevInfo) => ({
                                ...prevInfo,
                                [userId]: userInfo,
                            }));
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchUserInformation();
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
        }
        getMessage();
    }, [selectedChat])

    const sendMessage = async (messageData) => {
        const { chatId, content, sender, recipient } = messageData;
        const token = user?.token;
        if (token) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/message`,
                    {
                        chatId,
                        content,
                        sender,
                        recipient,
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

    return <ChatContext.Provider value={{ chatData, userInformation, sendMessage, selectedUser, setSelectedUser, selectedChat, setSelectedChat, chatMesssages }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
    return useContext(ChatContext);
};
