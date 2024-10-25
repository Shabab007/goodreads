import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useUser } from '../context/UserContext';

export interface Comment {
    id: string;
    content: string;
    userId: number;
    reviewId: string;
    username: string; // Assuming you want to display the user's name
}

export interface Review {
    id: string;
    userId: number;
    rating: number;
    content: string;
    comments: Comment[];
}

export interface Book {
    id: string;
    title: string;
    coverImage: string;
    description: string;
    author: string;
    publishedDate: string;
    averageRating: number;
    rating: number;
    userContent?: string;
    reviews: Review[];
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [userRating, setUserRating] = useState<number>(0);
    const [userContent, setUserContent] = useState<string>('');
    const [comments, setComments] = useState<{ [reviewId: string]: boolean }>({});
    const [newComment, setNewComment] = useState<{ [reviewId: string]: string }>({});
    const { userDetails }: any = useUser();


    const fetchBookDetails = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}/books/${id}`);
        const data: Book = await response.json();
        setBook(data);
    };
    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const handleRatingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_API}/reviews/add-review`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userDetails?.user?.id, // Replace with actual user ID
                rating: userRating,
                content: userContent,
                bookId: book?.id,
            }),
        });

        await fetchBookDetails();
        setUserRating(0);
        setUserContent('');
    };

    const handleCommentSubmit = async (reviewId: string) => {
        const commentContent = newComment[reviewId];

        await fetch(`${process.env.REACT_APP_API}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userDetails?.user?.id, // Replace with actual user ID
                content: commentContent,
                reviewId,
            }),
        });

        await fetchBookDetails();
        setNewComment({ ...newComment, [reviewId]: '' }); // Reset input
    };

    const toggleComments = (reviewId: string) => {
        setComments((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">{book.title}</h1>
            <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <p className="text-gray-700 mb-2">{book.description}</p>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Published Date: {book.publishedDate}</p>
            <p className="text-gray-600">Average Rating: {book.averageRating}</p>
            <p className="text-gray-600 mb-2">Your Rating:</p>
            <StarRating rating={userRating} onRatingChange={setUserRating} />

            <form onSubmit={handleRatingSubmit} className="mt-4">
                <textarea
                    value={userContent}
                    onChange={(e) => setUserContent(e.target.value)}
                    placeholder="Leave your review"
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
                    Submit Rating
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">All Reviews</h3>
                {book?.reviews.length > 0 ? (
                    book?.reviews.map((review: any) => (
                        <div key={review.id} className="border-b py-2">
                            <p className="font-semibold">
                                {review.user.username} - {review.rating} ⭐
                            </p>
                            <p>{review.content}</p>
                            <button onClick={() => toggleComments(review.id)} className="text-blue-500">
                                {comments[review.id] ? 'Hide Comments' : `Comments ${review.comments.length || 0}`}
                            </button>

                            {comments[review.id] && (
                                <div className="ml-4 mt-2">
                                    <h4 className="font-semibold">Comments</h4>
                                    {review.comments.length > 0 ? (
                                        review.comments.map((comment: any) => (
                                            <div key={comment.id} className="border-b px-2 py-4 flex justify-between">
                                                <p>
                                                    {comment.content} <br />
                                                </p>
                                                <p>
                                                    {new Date(comment?.updatedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}

                                    <textarea
                                        value={newComment[review.id] || ''}
                                        onChange={(e) => setNewComment({ ...newComment, [review.id]: e.target.value })}
                                        placeholder="Add a comment"
                                        className="border border-gray-300 rounded-md p-2 w-full mb-2"
                                    />
                                    <button
                                        onClick={() => handleCommentSubmit(review.id)}
                                        className="bg-green-500 text-white rounded-md px-4 py-2"
                                    >
                                        Submit Comment
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
