import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RequireUser: React.FC = () => {
    const { userDetails } = useUser();

    if (!userDetails) {
        return <Navigate to="/create-user" replace />;
    }

    return <Outlet />;
};

export default RequireUser;