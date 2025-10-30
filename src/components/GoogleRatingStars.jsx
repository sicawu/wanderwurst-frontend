import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function GoogleRatingStars({ rating }) {
  if (rating === undefined || rating === null) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="ml-2 text-sm text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default GoogleRatingStars;
