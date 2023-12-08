import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import { AuthProvider } from "./contexts/AuthContext";
import Manage from "./components/ManageUsers/Manage";
import Verify from "./components/Verify";
import { Toaster } from "react-hot-toast";
import Chat from "./components/Chat/Chat";
import { ChatProvider } from "./contexts/ChatContext";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ChatProvider>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/user" element={<User />}>
                            <Route path="verify" element={<Verify />} />
                            <Route path="manage" element={<Manage />} />
                        </Route>
                        <Route path="/chat" element={<Chat />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </ChatProvider>
            </AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
    );
}

export default App;
