import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as productActions from "../../store/products";
import * as reviewActions from "../../store/reviews";
import * as cartActions from "../../store/shopping_carts";
import "./SingleProduct.css";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReview from "../UpdateReviewModal";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { product_id } = useParams();
  const product = useSelector(
    (state) => state.products.allProducts[product_id]
  );
  const new_review = useSelector((state) => state.reviews.newReview);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const user = useSelector((state) => state.session.user);
  const reviews = Object.values(
    useSelector((state) => state.reviews.productReviews)
  );

  // Cart Store and Quantity State
  const userCart = Object.values(
    useSelector((state) => state.userCart.userCart)
  );
  const [count, setCount] = useState(1);

  // Calculate Average Rating for a Product
  let avg = 0;
  if (reviews.length) {
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    avg = sum / reviews.length; // Average!
  }

  // Handle Add to Cart

  const handleAddToCart = (count) => {
    if (!user) {
      alert("Please Login first!");
      return;
    }

    // let itemMaxQuantity = false;

    // if (userCart.length > 0) {
    //   userCart.forEach((item) => {
    //     if (item.product_id === parseInt(product_id)) {
    //       if (item.quantity >= 20 || item.quantity + parseInt(count) > 50) {
    //         alert("You cant add more than 20 items to your cart");
    //         itemMaxQuantity = true;
    //         return;
    //       }
    //     }
    //   });
    // }

    // if (itemMaxQuantity) {
    //   return;
    // }

    const payload = {
      user_id: user.id,
      product_id: product_id,
      quantity: parseInt(5),
    };

    dispatch(cartActions.thunkAddToCart(payload));
    history.push("/cart");
  };

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
                  <h3>{product.description}</h3>
                </div>
              </div>
            </div>
            <button onClick={handleAddToCart} id="add-to-cart-button">
              {" "}
              Add to Cart
            </button>
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
                {review.User_Info?.username}
                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </h3>
              {userReview && userReview.id === review.id && (
                <div id="delete-review-home">
                  <OpenModalButton
                    buttonText="Delete Review"
                    modalComponent={<DeleteReviewModal review_id={review.id} />}
                  />
                  <div className="update-review">
                    <OpenModalButton
                      buttonText="Edit Review"
                      modalComponent={<UpdateReview review_id={review.id} />}
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
          {user && user?.id !== product?.owner_id && !userReview && (
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
