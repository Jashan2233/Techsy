const GET_CURR_USER_SHOP = "/shop/GET_CURR_USER_SHOP";

// ACTIONS
export const actionGetCurrUserShop = (shops) => {
  return {
    type: GET_CURR_USER_SHOP,
    shops,
  };
};

export const fetchCurrUserShops = () => async (dispatch) => {
  const response = await fetch("/api/shops/");

  if (response.ok) {
    const shops = await response.json();
    dispatch(actionGetCurrUserShop(shops));
    return shops;
  }
};

const initialState = { shops: {} };

const allUserShops = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURR_USER_SHOP: {
      const newState = { ...state };
      newState.shops = action.shops;
      return newState;
    }
    default:
      return state;
  }
};

export default allUserShops;
