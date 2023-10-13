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
  const [errors, setErrors] = useState({});

  // Set the maximum character limit for description
  const maxDescriptionLength = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};

    if (!name.length) {
      errorsObj.name = "Name is Required";
    } else if (name.length < 5 || name.length > 50) {
      errorsObj.name = "Name should be between 5 and 50 characters.";
    }
    if (!price.length || price < 5 || price.toString().length > 5) {
      errorsObj.price = "Please enter a valid price with up to 5 digits.";
    }

    // Check if the description exceeds the character limit
    if (description.length < 5 || description.length > maxDescriptionLength) {
      errorsObj.description = `Description should be between 5 and ${maxDescriptionLength} characters.`;
    }

    // Check if description is empty
    if (!description.trim()) {
      errorsObj.description = "Description is required.";
    }

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
            {errors.name && <p className="new-product-errors">{errors.name}</p>}
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
            {errors.description && (
              <p className="new-product-errors">{errors.description}</p>
            )}
            <textarea
              type="textbox"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder={`Please enter a description for the product!`}
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
            {errors.price && (
              <p className="new-product-errors">{errors.price}</p>
            )}
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
            {errors.preview_image && (
              <p className="new-product-errors">{errors.preview_image}</p>
            )}
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
