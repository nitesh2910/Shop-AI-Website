import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#f8e825' }) => {
    return (
        <div className="flex items-center space-x-1">
            <span className="flex">
                {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num}>
                        {value >= num ? (
                            <Star size={16} fill={color} color={color} />
                        ) : value >= num - 0.5 ? (
                            <StarHalf size={16} fill={color} color={color} />
                        ) : (
                            <Star size={16} color="#d1d5db" />
                        )}
                    </span>
                ))}
            </span>
            {text && <span className="text-xs text-gray-500 font-medium ml-1">{text}</span>}
        </div>
    );
};

export default Rating;
