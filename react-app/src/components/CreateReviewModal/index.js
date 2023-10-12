import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as productActions from "../../store/products";

const CreateReviewModal = ({ product_id }) => {
  const user = useSelector((state) => state.session.user);
  const singleProduct = useSelector(
    (state) => state.products.allProducts[product_id - 1]
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
      errors.review = ""; // Clear the error when review length is within the allowed range
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

      console.log("Payload", payload);
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
            <div
              className={
                activeRating >= 1
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => setActiveRating(1)}
              onClick={() => setRating(1)}
            ></div>
            <div
              className={
                activeRating >= 2
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => setActiveRating(2)}
              onClick={() => {
                setRating(2);
                setActiveRating(2);
              }}
            ></div>
            <div
              className={
                activeRating >= 3
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => setActiveRating(3)}
              onClick={() => {
                setRating(3);
                setActiveRating(3);
              }}
            ></div>
            <div
              className={
                activeRating >= 4
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => setActiveRating(4)}
              onClick={() => {
                setRating(4);
                setActiveRating(4);
              }}
            ></div>
            <div
              className={
                activeRating >= 5
                  ? "fa-sharp fa-solid fa-star"
                  : "fa-sharp fa-regular fa-star"
              }
              onMouseEnter={() => setActiveRating(5)}
              onClick={() => {
                setRating(5);
                setActiveRating(5);
              }}
            ></div>
            Rating
          </div>
          <button type="submit">Submit Your Review</button>
        </form>
      </div>
    </>
  );
};

export default CreateReviewModal;
