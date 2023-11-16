import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as productStore from "../../store/products";
import "./EditProductForm.css";

const EditProduct = () => {
  const { product_id } = useParams();
  const productId = parseInt(product_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) => state.products.allProducts[productId]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // State to hold the image file
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    } else {
      console.log("cant find product!!");
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};
    if (!name.length) {
      errorsObj.name = "Name is Required";
    } else if (name.length < 4 || name.length > 50) {
      errorsObj.name = "Name should be between 4 and 50 characters.";
    }
    if (!price.length || price < 5 || price.toString().length > 5) {
      errorsObj.price =
        "Please enter a valid price with up to 5 digits, don't use Decimals!.";
    }
    if (!description || description.length < 5 || description.length > 200)
      errorsObj.description =
        "Description should be between 5 and 200 characters";

    if (Object.keys(errorsObj).length !== 0) {
      return setErrors(errorsObj);
    }

    const newProduct = new FormData();
    newProduct.append("name", name);
    newProduct.append("description", description);
    newProduct.append("price", price);
    if (previewImage) {
      newProduct.append("preview_image", previewImage);
    }

    const updatedProduct = await dispatch(
      productStore.editOwnedProductThunk(newProduct, product_id)
    );

    if (updatedProduct) {
      history.push(`/products/${updatedProduct.id}`);
    }
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
              value={name} // Prepopulate name field
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
              value={description} // Prepopulate description field
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
              value={price} // Prepopulate price field
              placeholder="Price"
              name="price"
            />
          </div>
          <div className="edit-product-photo">
            <label className="edit-product-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="preview_image"
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
