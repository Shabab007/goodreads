import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { userDetails }: any = useUser();

    return (
        <header className="bg-blue-500 p-4 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Good Reads</h1>
            <button
                onClick={() => navigate("/")}
                className="text-white bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
            >
                Home
            </button>
            <p>{userDetails?.user?.username}</p>
        </header>
    );
};

export default Header;
