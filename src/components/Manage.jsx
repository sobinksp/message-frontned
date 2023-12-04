import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

const Manage = () => {
    const { user, isAdmin, setIsOpen } = useAuth();
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            navigate("/login");
        }

        const fetchUsers = async () => {
            const token = user?.token;
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8080/api/entities", { headers: { Authorization: `Bearer ${token}` } });
                    console.log(response.data);
                    setUsers(response.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                navigate("/");
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">Manage Users</h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        setIsOpen(false);
                        navigate("/user");
                    }}
                />
            </div>
            <table className="table table-hover">
                <caption>You are managing users as {user.role}</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((userData) => (
                        <tr key={userData.id}>
                            <th>{userData.id}</th>
                            <td>{userData.username}</td>
                            <td>{userData.role}</td>
                            <td>
                                <div className="d-flex gap-1 justify-content-center">
                                    <button className="btn btn-outline-warning border border-0">
                                        <FaPen />
                                    </button>
                                    <button className="btn btn-outline-danger border border-0">
                                        <FaRegTrashCan />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manage;
