import { Route, Routes } from "react-router-dom";
import CategoriesList from "../pages/categories/categories-list";
import Home from "../pages/home/home";
import ProductsList from "../pages/products/products-list";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<CategoriesList />} />
    <Route path="/products" element={<ProductsList />} />
  </Routes>
);

export default Router;
