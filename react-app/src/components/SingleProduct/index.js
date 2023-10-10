import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as productActions from "../../store/products";
import * as reviewActions from "../../store/reviews";
import "./SingleProduct.css";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReview from "../UpdateReviewModal";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const product = useSelector(
    (state) => state.products.allProducts[product_id - 1]
  );
  const new_review = useSelector((state) => state.reviews.newReview);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const user = useSelector((state) => state.session.user);
  const reviews = Object.values(
    useSelector((state) => state.reviews.productReviews)
  );

  // Calculate Average Rating for a Product
  let avg = 0;
  if (reviews.length) {
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    avg = sum / reviews.length; // Average!
  }

  // Helper functions:

  const totalReviews = reviews.length;

  let userReview;

  if (user) {
    userReview = reviews.find((review) => review.user_id === user?.id);
  }

  useEffect(() => {
    dispatch(reviewActions.thunkGetProductReviews(product_id));
    dispatch(productActions.getSingleProductThunk(product_id));
    dispatch(productActions.getAllProductsThunk());
  }, [dispatch, product_id, new_review, userReviews]);

  if (!product || !reviews) return null;

  return (
    <>
      <div className="product-container">
        {product && (
          <div className="c-product-info-block">
            <div className="c-product-info-left">
              <img
                src={product.preview_image}
                alt="This is TV!"
                className="c-product-image"
              />
            </div>
            <div className="c-product-info-right">
              <div>
                <h1>${product.price.toFixed(2)}</h1>
                <h1 className="single-product-name">{product.name}</h1>
                <div className="c-product-owner">
                  Sold by {product.owner_info}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="reviews-container">
        <div className="total-reviews">Reviews: {totalReviews}</div>
        <div className="average-rating">
          {avg.toFixed(1)} <i className="fa-solid fa-star"></i>
        </div>
        <div className="product-reviews">
          {reviews.reverse().map((review, index) => (
            <div className="reviews-details" key={index}>
              <h3 className="review-name">
                {user?.username} -{" "}
                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </h3>
              {userReview && userReview.id === review.id && (
                <div id="delete-review-home">
                  <OpenModalButton
                    buttonText="Delete Review"
                    modalComponent={
                      <DeleteReviewModal review_id={review.id} />
                    }
                  />
                  <div className="update-review">
                    <OpenModalButton
                      buttonText="Edit Review"
                      modalComponent={
                        <UpdateReview review_id={review.id} />
                      }
                    />
                  </div>
                </div>
              )}
              <h5>
                {new Date(review.created_at).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(review.created_at).getFullYear()}
              </h5>
              <h4>{review.review}</h4>
            </div>
          ))}
          {!reviews.length && !userReview && user?.id !== product?.owner_id && (
            <div className="post-review-button">
              <OpenModalButton
                buttonText="Create Review"
                modalComponent={<CreateReviewModal product_id={product_id} />}
              />
              <p id="be-first">Be the first to post a review!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
