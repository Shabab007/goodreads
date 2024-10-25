import React from 'react';

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

const UserActivity = ({ user }: any) => {


    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Recent Activities by {user.username}</h2>
            <div className="space-y-4">
                {user.reviews.map((review: Review) => (
                    <div key={review.id} className="p-4 border rounded">
                        <p><strong>Review:</strong> {review.content}</p>
                        <p>Rating: {review.rating} ⭐</p>
                        <p>Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
                        {review.comments.length > 0 && (
                            <div className="mt-2">
                                <p className="font-semibold">Comments:</p>
                                {review.comments.map((comment: Comment) => (
                                    <p key={comment.id} className="ml-4">
                                        {comment.content} - {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {user.comments.map((comment: Comment) => (
                    <div key={comment.id} className="p-4 border rounded">
                        <p><strong>Comment:</strong> {comment.content}</p>
                        <p>Commented on: {new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserActivity;
