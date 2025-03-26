import { Route, Routes } from "react-router-dom";
import CategoriesList from "../pages/Categories/CategoriesList";
import Home from "../pages/Home/Home";
import ProductsList from "../pages/Products/ProductsList";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<CategoriesList />} />
    <Route path="/products" element={<ProductsList />} />
  </Routes>
);

export default Router;
