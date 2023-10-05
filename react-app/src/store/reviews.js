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
  reviewId,
});

export const actionUpdateUserReview = (updated_review) => ({
  type: UPDATE_USER_REVIEW,
  updated_review,
});
