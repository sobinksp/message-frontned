import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaPen, FaRegTrashCan, FaFloppyDisk } from "react-icons/fa6";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../apiConfig";

const Manage = () => {
    const { user, isAdmin, setIsOpen } = useAuth();
    const [users, setUsers] = useState();
    const [editMode, setEditMode] = useState({});
    const roles = ["ADMIN", "USER"];
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate("/login");
        }

        const fetchUsers = async () => {
            const token = user?.token;
            if (token) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } });
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

    const handleEditClick = (userId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [userId]: !prevEditMode[userId],
        }));
    };

    const handleSaveClick = async (userId, updatedUserData) => {
        const token = user?.token;
        if (token) {
            try {
                await axios.put(`${API_BASE_URL}/api/users`, updatedUserData, { headers: { Authorization: `Bearer ${token}` } });
                setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, ...updatedUserData } : user)));
                setEditMode((prevEditMode) => ({
                    ...prevEditMode,
                    [userId]: false,
                }));
                toast.success("User saved successfully")
            } catch (error) {
                console.error(error);
                toast.error("Error saved user")
            }
        }
    };

    const renderSelectCell = (userData, field) => {
        if (editMode[userData.id]) {
            return (
                <select className="form-select" id="role" value={userData[field]} onChange={(e) => handleChange(userData.id, field, e.target.value)}>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            );
        }
        return userData[field];
    };

    const handleChange = (userId, field, value) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, [field]: value } : user)));
    };

    const handleDelete = async (userId) => {
        console.log("delete", userId);
        const token = user?.token;
        if (token) {
            try {
                await axios.delete(`${API_BASE_URL}/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
                setUsers((prevUsers) => prevUsers.filter((userData) => userData.id !== userId));
                setEditMode((prevEditMode) => ({
                    ...prevEditMode,
                    [userId]: false,
                }));
                toast.success("User deleted successfully")
            } catch (error) {
                console.error(error);
                toast.error("Error deleted user")
            }
        }
    };
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
                        <th style={{ width: "124px" }}>Role</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((userData) => (
                        <tr key={userData.id}>
                            <th>{userData.id}</th>
                            <td>{userData.username}</td>
                            <td>{renderSelectCell(userData, "role")}</td>
                            <td>
                                <div className="d-flex gap-1 justify-content-center">
                                    {editMode[userData.id] ? (
                                        <button className="btn btn-outline-success border border-0" onClick={() => handleSaveClick(userData.id, userData)}>
                                            <FaFloppyDisk />
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline-warning border border-0" onClick={() => handleEditClick(userData.id)}>
                                            <FaPen />
                                        </button>
                                    )}
                                    <button className="btn btn-outline-danger border border-0" onClick={() =>  handleDelete(userData.id)}>
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
