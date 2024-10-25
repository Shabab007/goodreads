// StarRating.tsx
import React from 'react';

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div className="flex space-x-1">
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => onRatingChange(star)}
                    className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                >
                    &#9733; {/* Unicode star character */}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
