import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as productStore from "../../store/products";
import { getSingleProductThunk } from "../../store/products";

const EditProduct = () => {
  const { product_id } = useParams();
  console.log("productid in comp", product_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) => state.products.ownedProducts);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  useEffect(() => {
    dispatch(productStore.getSingleProductThunk(product_id));
  }, [dispatch, product_id]);

  if (!product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};
    if (!name || !name.length) errorsObj.name = "Name is Required";
    if (!price || !price.length) errorsObj.price = "Please enter a valid price";
    if (!description || description.length < 30)
      errorsObj.description = "Please add a description for your product";

    if (Object.keys(errorsObj).length !== 0) {
      return setErrors(errorsObj);
    }

    const editedProduct = await dispatch(
      productStore.editOwnedProductThunk(
        {
          name,
          description,
          price,
        },
        product_id
      )
    );

    if (editedProduct) {
      history.push(`/products/${product_id}`);
    } else {
      console.log("EDIT FAILED");
    }

    history.push("/products");
  };


  return (
    <div className="edit-product-container">
      <h1 className="edit-product-header">Update Your Product</h1>
      <div className="edit-product-photo-form">
        <form
          className="edit-product-form-container"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="edit-product-name" style={{ marginBottom: "2em" }}>
            <label className="edit-product-label">Name</label>
            <div className="edit-product-errors">
              {errors.name ? <p>{errors.name}</p> : null}
            </div>
            <input
              className="edit-product-input"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              name="name"
            />
          </div>
          <div
            className="edit-product-description"
            style={{ marginBottom: "2em" }}
          >
            <label className="edit-product-label">Description</label>
            <div className="edit-product-errors">
              {errors.description ? <p>{errors.description}</p> : null}
            </div>
            <textarea
              className="edit-product-description-field"
              type="textbox"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Please write at least 30 characters"
              name="description"
              rows="7"
            />
          </div>
          <div className="edit-product-price" style={{ marginBottom: "2em" }}>
            <label className="edit-product-label">Price($)</label>
            <div className="edit-product-errors">
              {errors.price ? <p>{errors.price}</p> : null}
            </div>
            <input
              className="edit-product-input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
              name="price"
            />
          </div>
          <div className="edit-submit-button-container">
            <button className="edit-product-submit-button" type="submit">
              Update Your Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
