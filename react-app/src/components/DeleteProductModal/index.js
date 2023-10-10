import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/products";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import * as productActions from "../../store/products";

const DeleteProduct = ({ product_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("product_id in modal", product_id);
  // const product = useSelector((state) => state.products.ownedProducts);
  // console.log("Product in delete", product);
  const { closeModal } = useModal();

  const handleSubmit = async () => {
    const deletedSuccess = await dispatch(
      productActions.deleteOwnedProductThunk(product_id)
    );
    if (deletedSuccess) {
      // Product deleted successfully, navigate to "/products"
      history.push("/shops/current");
      closeModal();
    } else {
      console.log("Delete failed!");
    }
  };

  return (
    <div className="delete-product-container">
      <h1 className="delete-product-title">Confirm Delete</h1>
      <p className="delete-product-text">
        Are you sure you want to remove this Product?
      </p>
      <div className="delete-product-submit">
        <button id="yes-delete" onClick={handleSubmit}>
          Yes, Delete Product
        </button>
        <button id="no-keep" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
