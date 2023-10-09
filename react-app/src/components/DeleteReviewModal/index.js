import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as reviewActions from "../../store/reviews";
import * as productActions from "../../store/reviews";


const DeleteReviewModal = ({ review_id }) => {
    const dispatch = useDispatch();
    const {product_id} = useParams()
    const history = useHistory();
    const {closeModal} = useModal()


    const deleteYes = () => {
        dispatch(reviewActions.thunkDeleteReview(review_id))
        // history.push(`products/${product_id}`)
        closeModal()
    }

    const deleteNo = () => {
        closeModal();
      };


      return (
        <>
          <div className="delete-review-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <div class="delete-yes-no-buttons">
              <button id="delete-yes" onClick={deleteYes}>
                Yes (Delete Review)
              </button>
              <button id="delete-no" onClick={deleteNo}>
                No (Keep Review)
              </button>
            </div>
          </div>
        </>
      );
    };

    export default DeleteReviewModal;
