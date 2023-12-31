import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as productActions from "../../store/products";
import "./index.css";

const CreateReviewModal = ({ product_id }) => {
  const user = useSelector((state) => state.session.user);
  const singleProduct = useSelector(
    (state) => state.products.allProducts[product_id]
  );
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [activeRating, setActiveRating] = useState();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (review.length < 10) {
      errors.review = "Review must be at least 10 characters long.";
    } else if (review.length > 50) {
      errors.review = "Review can't be more than 50 characters long.";
    } else {
      errors.review = ""; // Clear the error when the review length is within the allowed range
    }
    setValidationErrors(errors);
  }, [review]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.review && user.id !== singleProduct.owner_id) {
      const payload = {
        review,
        rating,
      };

      await dispatch(
        reviewActions.thunkCreateProductReview(product_id, payload)
      );
      closeModal();
      await dispatch(productActions.getSingleProductThunk(product_id));
    } else {
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="create-review-modal">
        <h3>How was the product?</h3>
        <form onSubmit={onSubmit}>
          <label>
            <textarea
              rows="5"
              cols="40"
              type="text"
              placeholder="Leave your review here..."
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          {validationErrors.review && submitted && (
            <p>{validationErrors.review}</p>
          )}
          <div className="stars-review">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={
                  rating && rating >= star
                    ? "fa-sharp fa-solid fa-star"
                    : "fa-sharp fa-regular fa-star"
                }
                onMouseEnter={() => setActiveRating(star)}
                onClick={() => {
                  setRating(star);
                  setActiveRating(star);
                }}
              ></div>
            ))}
            Rating
          </div>
          <button type="submit">Submit Your Review</button>
        </form>
      </div>
    </>
  );
};

export default CreateReviewModal;
