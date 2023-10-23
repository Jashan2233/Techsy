import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import CreateProduct from "./components/CreateProductForm";
import EditProduct from "./components/EditProductForm";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import DeleteProduct from "./components/DeleteProductModal";
import Shop from "./components/Shop";
import SingleProduct from "./components/SingleProduct";
import LoginFormModal from "./components/LoginFormModal";
import UserCart from "./components/UserCart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route exact path="/products/create">
            <CreateProduct />
          </Route>
          <Route exact path="/products/:product_id">
            <SingleProduct />
          </Route>
          <Route exact path="/cart">
            <UserCart />
          </Route>
          <Route exact path="/shops/current">
            <Shop />
          </Route>
          <Route exact path="/products/:product_id/edit">
            <EditProduct />
          </Route>
          <Route path="/">
            <Products />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
