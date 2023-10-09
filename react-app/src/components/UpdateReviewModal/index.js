import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';

const UpdateReview = ({ review_id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const previousReviews = useSelector((state) => state.reviews.userReviews);
  const previousReview = previousReviews[review_id];

  // Check if previousReview exists before accessing its properties
  const [rating, setRating] = useState(previousReview?.rating || 1); // Initialize with the existing rating or default to 1
  const [reviewButton, setReviewButton] = useState();
  const [errors, setErrors] = useState("");
  const [review, setReview] = useState(previousReview?.review || "");

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let allErrors = {};

    if (review.length < 5) allErrors.review = "Review is too short";

    if (Object.keys(allErrors).length) {
      return setErrors(allErrors);
    }

    const newReview = {
      review,
      rating,
    };

    let updatedReview = await dispatch(reviewActions.thunkUpdateUserReview(review_id, newReview));
    closeModal();
  };

  return (
    <div className='update-review-container'>
      <h2 className='update-review-title-header'>Update Your Review</h2>
      <form onSubmit={handleSubmit} className='review-form'>
        {errors.review ? <p className='update-review-errors'>{errors.review}</p> : null}
        <textarea
          className="review-text-box"
          type="text"
          rows="7"
          value={review}
          placeholder="Leave your review here"
          onChange={handleInputChange}
        />
        <br />
        <div className="stars-review">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={
                star <= rating
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => handleRatingClick(star)}
              onClick={() => handleRatingClick(star)}
            ></div>
          ))}
          Rating: {rating}
        </div>
        <div className="update-review-submit-container">
          <button type="submit">Update Your Review</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
