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

  // Handle the change in quantity dropdown
  let newCount;
  const handleQuantityChange = (e) => {
    newCount = parseInt(e.target.value);
    setCount(newCount); // Update the count state
  };

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

    const payload = {
      user_id: user.id,
      product_id: product_id,
      quantity: parseInt(count),
    };

    dispatch(cartActions.thunkAddToCart(payload));
    console.log(newCount, "newcount");
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
      <div className="wrapper">
        <div className="product-container">
          {product && (
            <div className="c-product-info-left">
              <img
                src={product.preview_image}
                alt="This is TV!"
                className="c-product-image"
              />
            </div>
          )}
          <div className="c-product-info-right">
            <h1 className="product-price-tag">${product.price.toFixed(2)}</h1>
            <h5 className="taxes-class">
              Local taxes included (where applicable)
            </h5>
            <h1 className="single-product-name">{product.name}</h1>
            <div className="c-product-owner">
              <h2>Sold by {product.owner_info}</h2>
              <h3>{product.description}</h3>
            </div>
            <div className="add-to-cart-button-container">
              <label htmlFor="quantity">Quantity: </label>
              <select
                id="select-quantity"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button id="cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
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
                      modalComponent={
                        <DeleteReviewModal review_id={review.id} />
                      }
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
                  className="create-button"
                  buttonText="Create Review"
                  modalComponent={<CreateReviewModal product_id={product_id} />}
                />
              </div>
            )}
            {/* <h2 id="be-first"> Be the first to post a review!</h2> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
