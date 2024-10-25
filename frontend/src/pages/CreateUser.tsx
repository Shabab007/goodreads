// src/pages/UserGenerator.tsx
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const generateRandomUser = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
    const randomName = names[Math.floor(Math.random() * names.length)] + Math.random();
    const randomEmail = `${randomName.toLowerCase() + Math.random()}@example.com`;
    const randomPassword = Math.random().toString(36).slice(-8);
    return { username: randomName, email: randomEmail, password: randomPassword };
};

const CreateUser: React.FC = () => {
    const [user, setUser] = useState<{ username: string; email: string; password: string } | null>(null);
    const { setUserDetails } = useUser();
    const navigate = useNavigate();

    const handleGenerateUser = () => {
        const newUser = generateRandomUser();
        setUser(newUser);
    };

    const handleCreateUser = async () => {
        if (!user) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API}/users/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const data = await response.json();
            setUserDetails(data);
            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Random User Generator</h1>
            <button
                onClick={handleGenerateUser}
                className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            >
                Generate Random User
            </button>

            {user && (
                <div className="mb-4">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password:</strong> {user.password}</p>
                    <button
                        onClick={handleCreateUser}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Create User
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateUser;
