import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import UserActivity from "../components/UserActivity";


type BookData = {
    id: number;
    title: string;
    author: string;
    coverImage: string;
};

type ApiResponse = {
    books: BookData[];
    count: number;
};

interface Comment {
    id: number;
    content: string;
    createdAt: string;
}

interface Review {
    id: number;
    content: string;
    rating: number;
    createdAt: string;
    comments: Comment[];
}

interface User {
    id: number;
    username: string;
    reviews: Review[];
    comments: Comment[];
}

const MainPage: React.FC = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cache, setCache] = useState<Map<number, BookData[]>>(new Map());

    const fetchBooks = async (page: number) => {
        if (cache.has(page)) {
            setBooks(cache.get(page) || []);
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API}/books?page=${page}&limit=6`);
        const data: ApiResponse = await response.json();

        setBooks(data.books);
        setCache((prevCache) => new Map(prevCache).set(page, data.books));
        setTotalPages(Math.ceil(data.count / 6));
    };

    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${process.env.REACT_APP_API}/users`);
            const data = await response.json();
            setUsers(data.users);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const handlePageClick = (page: number) => setCurrentPage(page);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Book List Section */}
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Book List</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {books.map((book) => (
                        <Book key={book.id} id={book.id} title={book.title} author={book.author} coverImage={book.coverImage} />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageClick(pageNum)}
                            className={`px-3 py-1 rounded ${pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* User Activity Section */}
            <div className="flex-1 p-4 lg:border-l lg:border-gray-300">
                {users?.map.length && users.map(((user: User, index: number) => {
                    if (user.reviews.length) {
                        return <UserActivity key={index} user={user} />
                    }
                }))}

            </div>
        </div>
    );
};

export default MainPage;
