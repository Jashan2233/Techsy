const GET_PRODUCT_REVIEWS = "product/GET_PRODUCT_REVIEWS";
const CREATE_PRODUCT_REVIEW = "product/CREATE_PRODUCT_REVIEW";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const UPDATE_USER_REVIEW = "reviews/UPDATE_USER_REVIEW";

// ACTIONS
export const actionGetUserReviews = (user_reviews) => ({
  type: GET_USER_REVIEWS,
  user_reviews,
});

export const actionGetProductReviews = (reviews) => ({
  type: GET_PRODUCT_REVIEWS,
  reviews,
});

export const actionCreateProductReview = (new_review) => ({
  type: CREATE_PRODUCT_REVIEW,
  new_review,
});

export const actionDeleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId, // Use the same key as in your reducer
});

export const actionUpdateUserReview = (updated_review) => ({
  type: UPDATE_USER_REVIEW,
  updated_review,
});

// NORMALIZE REVIEWS
const normalizingAllReviews = (reviews) => {
  let normalizedReviews = {};
  reviews.forEach((review) => {
    normalizedReviews[review.id] = review;
  });
  return normalizedReviews;
};

// THUNKS
export const thunkGetUserReviews = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/user/${user_id}`);

  if (response.ok) {
    const reviews = await response.json();
    const normalizedReviews = normalizingAllReviews(reviews);
    dispatch(actionGetUserReviews(normalizedReviews));
  }
};

export const thunkGetProductReviews = (product_id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/product/${product_id}`);

  if (response.ok) {
    const reviews = await response.json();
    const normalizedReviews = normalizingAllReviews(reviews);

    dispatch(actionGetProductReviews(normalizedReviews));
  }
};

export const thunkCreateProductReview =
  (product_id, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new/product/${product_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      const new_review = await response.json();
      console.log("HITTED CREATE REVIEW!", new_review);
      dispatch(actionCreateProductReview(new_review));
    } else {
      console.log("errors in create review!!");
    }
  };

export const thunkDeleteReview = (review_id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(actionDeleteReview(review_id));
  }
};

export const thunkUpdateUserReview =
  (review_id, newReview) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      const updated_review = await response.json();
      dispatch(actionUpdateUserReview(updated_review));
    }
  };

const initialState = { productReviews: {}, newReview: {}, userReviews: {} };

const productReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return { ...state, productReviews: action.reviews };

    case CREATE_PRODUCT_REVIEW:
      return { ...state, newReview: action.new_review };

    case GET_USER_REVIEWS:
      return { ...state, userReviews: action.user_reviews };

    case DELETE_REVIEW:
      // Create new objects without the deleted review
      console.log("STATEHERE", state);
      const { [action.reviewId]: deletedReview, ...userReviews } =
        state.userReviews;
      const { [action.reviewId]: deletedProductReview, ...productReviews } =
        state.productReviews;

      return {
        ...state,
        userReviews,
        productReviews,
      };

    case UPDATE_USER_REVIEW:
      return {
        ...state,
        productReviews: {
          ...state.productReviews,
          [action.updated_review.id]: action.updated_review,
        },
        userReviews: {
          ...state.userReviews,
          [action.updated_review.id]: action.updated_review,
        },
      };

    default:
      return state;
  }
};

export default productReviewsReducer;
