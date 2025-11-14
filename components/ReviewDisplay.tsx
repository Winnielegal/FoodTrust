import React from 'react';
import type { Review } from '../types';
import { StarIcon } from './icons/StarIcon';

interface ReviewDisplayProps {
  reviews: Review[];
}

const StarRating: React.FC<{ rating: number | null }> = ({ rating }) => {
  if (rating === null) return null;
  const totalStars = 5;
  
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} solid={i < rating} />
      ))}
       <span className="ml-2 text-sm font-semibold text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
            <StarIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" solid={false}/>
            <p className="font-semibold">No Reviews Available</p>
            <p className="text-sm">The AI investigator could not find any customer reviews for this product.</p>
        </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-brand-text">{review.source}</p>
              <StarRating rating={review.rating} />
            </div>
            <blockquote className="text-sm text-gray-700 italic border-l-4 border-gray-300 pl-4">
              "{review.summary}"
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};