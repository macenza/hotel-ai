function ReviewCard({ review, rating }) {
  return (
    <div className="review-card">
      <div className="review-rating">
        <span className="stars">
          {"★".repeat(rating)}
          <span className="empty-stars">
            {"★".repeat(5 - rating)}
          </span>
        </span>

        <span className="rating-number">
          {rating}/5
        </span>
      </div>

      <p className="review-text">
        {review}
      </p>
    </div>
  );
}

export default ReviewCard;