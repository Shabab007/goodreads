import React, { createContext, useContext, useState, ReactNode } from "react";

type UserDetails = {
    id: number;
    username: string;
    email: string;
    // Add any other fields as needed
};

type UserContextType = {
    userDetails: UserDetails | null;
    setUserDetails: (user: UserDetails | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
