import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as productActions from "../../store/products";
import * as reviewActions from "../../store/reviews";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product_id } = useParams();
  console.log(product_id, "product_id");
  const product = useSelector(
    (state) => state.products.allProducts[product_id - 1]
  );
  const reviews = Object.values(
    useSelector((state) => state.reviews.productReviews)
  );

  //   const new_review = useSelector((state) => state.reviews.newReview);
  //   const user = useSelector((state) => state.session.user);
  //   const singleProductArr = Object.values(singleProductObj);
  //   console.log("array of product", singleProductArr);
  console.log("obj of product", product);
  console.log("Reviews", reviews);

  //Average Rating for a Product
  let avg = 0;
  if (reviews.length) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating;
    }
    avg = sum / reviews.length; // Average!
  }

  useEffect(() => {
    dispatch(productActions.getSingleProductThunk(product_id));
    dispatch(reviewActions.thunkGetProductReviews(product_id));
    dispatch(productActions.getAllProductsThunk());
  }, [dispatch, product_id]);

  //   useEffect(() => {
  //     dispatch(reviewActions.thunkGetProductReviews(product_id));
  //   }, [dispatch, product_id]);

  if (!product || !reviews) return null;

  return (
    <>
      <div className="product-container">
        {product && (
          <>
            <div className="c-product-info-block">
              <div className="c-product-info-left">
                <img
                  src={product.preview_image}
                  alt="this is TV!"
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
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
