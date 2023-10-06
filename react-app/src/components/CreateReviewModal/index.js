import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as productActions from "../../store/products";

const CreateReviewModal = ({ product_id }) => {
  console.log();
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
    if (review.length < 10)
      errors.review = "Please enter more than 10 Character";
    setValidationErrors(errors);
  }, [review]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // setSubmitted(true);
    // if (
    //   !Object.values(validationErrors).length &&
    //   user.id !== singleProduct.owner_id
    {
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
    }
  };

  //   const reviewButtonId =
  //     review.length < 10 && !rating
  //       ? "submit-review-not-valid"
  //       : "submit-review-button";

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
              onClick={() => {
                setRating(1);
              }}
            >
              {/* <i class="fa-sharp fa-regular fa-star"></i> */}
            </div>
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
            >
              {/* <i class="fa-regular fa-star"></i> */}
            </div>
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
            >
              {/* <i class="fa-regular fa-star"></i> */}
            </div>
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
            >
              {/* <i class="fa-regular fa-star"></i> */}
            </div>
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
            >
              {/* <i class="fa-regular fa-star"></i> */}
            </div>
            Rating
          </div>
          <button
            type="submit"
            // id={reviewButtonId}
            disabled={review.length < 10 || !rating}
          >
            Submit Your Review
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReviewModal;
