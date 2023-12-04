import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import { AuthProvider } from "./contexts/AuthContext";
import Manage from "./components/Manage";
import Verify from "./components/Verify";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<User />}>
                        <Route path="verify" element={<Verify />}/>
                        <Route path="manage" element={<Manage />}/>
                    </Route>
                    <Route path="*" element={<Login />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
