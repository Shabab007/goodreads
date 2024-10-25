// src/components/Book.tsx
import React from "react";
import { useNavigate } from 'react-router-dom';

type BookProps = {
    id: number
    title: string;
    author: string;
    coverImage: string;
};

const Book: React.FC<BookProps> = ({ id, title, author, coverImage }) => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleClick = () => {
        navigate(`/books/${id}`); // Use navigate for redirection
    };

    return (
        <div onClick={handleClick} className="w-full p-4 bg-white shadow rounded-lg">
            <img src={coverImage} alt={title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{title}</h2>
            <p className="text-gray-500">{author}</p>
        </div>
    );
};

export default Book;
