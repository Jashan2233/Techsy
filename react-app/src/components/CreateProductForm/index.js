import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  createProductThunk,
  getSingleProductThunk,
} from "../../store/products";
import { getAllProductsThunk } from "../../store/products";

import "./CreateForm.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preview_image, setPreview_image] = useState("");
  const [errors, setErrors] = useState({}); // Initialize errors as an object

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};
    if (!name.length) errorsObj.name = "Name is Required";
    if (!price.length || price < 5)
      errorsObj.price = "Please enter a valid price";
    if(!description.length) errorsObj.description = "Please add a description for the product!"
    if (!preview_image) errorsObj.preview_image = "Image is required!";

    // Set the errors state
    setErrors(errorsObj);

    // If there are errors, don't proceed with form submission
    if (Object.keys(errorsObj).length > 0) {
      return;
    }

    const newProduct = new FormData();
    newProduct.append("name", name);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("preview_image", preview_image);

    console.log("name", name);

    // Dispatch Thunk
    const createdProduct = await dispatch(createProductThunk(newProduct));
    dispatch(getAllProductsThunk());
    if (createdProduct) {
      history.push(`/products/${createdProduct.id}`);
    }
  };

  return (
    <div className="new-product-container">
      <h1 className="new-product-header">Create a New Product</h1>
      <div className="new-product-photo-form">
        <form
          className="new-product-form-container"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div
            className="new-product-name"
            style={{
              marginBottom: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="new-product-label">Name</label>
            {errors.name ? (
              <p className="new-product-errors">{errors.name}</p>
            ) : null}
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              name="name"
            />
          </div>
          <div
            className="new-product-description"
            style={{
              marginBottom: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="new-product-label">Description</label>
            {errors.description ? (
              <p className="new-product-errors">{errors.description}</p>
            ) : null}
            <textarea
              type="textbox"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Please write at least 30 characters"
              name="description"
              rows="7"
            />
          </div>
          <div
            className="new-product-price"
            style={{
              marginBottom: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="new-product-label">Price($)</label>
            {errors.price ? (
              <p className="new-product-errors">{errors.price}</p>
            ) : null}
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
              name="price"
            />
          </div>
          <div
            className="new-product-preview-img"
            style={{
              marginBottom: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="new-product-label">Preview Image</label>
            {errors.preview_image ? (
              <p className="new-product-errors">{errors.preview_image}</p>
            ) : null}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setPreview_image(e.target.files[0])}
              placeholder="Preview Image"
              name="preview_img"
            />
          </div>
          <div className="new-submit-button-container">
            <button className="new-product-submit-button" type="submit">
              Create a New Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
