import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as productStore from "../../store/products";
import "./EditProductForm.css";

const EditProduct = () => {
  const { product_id } = useParams();
  const productId = parseInt(product_id);
  console.log("productid in comp", product_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector(
    (state) => state.products.allProducts[productId - 1]
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = dispatch(productStore.getSingleProductThunk(productId));
  //       console.log("this res", res);
  //       const data = await res.json();
  //       console.log("this data", data);
  //       if (res.ok) {
  //         if (data) {
  //           const oldProduct = data.product;
  //           setName(oldProduct.name);
  //           setDescription(oldProduct.description);
  //           setPrice(oldProduct.price);
  //           console.log("Fetched product data for editing.");
  //         } else {
  //           console.log("No product data received.");
  //         }
  //       } else {
  //         console.error("API call failed with status code:", res.status);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while fetching the product:", error);
  //     }
  //   };
  //   fetchProduct();
  // }, [product_id]);

  //Prepopulating Form!
  useEffect(() => {
    if (product) {
      console.log("Product edit here", product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

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
      console.log("edited is there!!!", editedProduct.id);
      history.push(`/products/${editedProduct.id}`);
    } else {
      console.log("EDIT FAILED");
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
