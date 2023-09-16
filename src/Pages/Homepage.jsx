import React from "react";
import NavBar from "../Features/Navbar/Navbar";
import Home from "../Features/LandingPages/Home";
import { selectnavsearchTrue } from "../Features/Product/productSlice";
import { useSelector } from "react-redux";
import { ProductGrid } from "../Features/Product/Component/ProductList";
const Homepage = () => {
  const navsearch = useSelector(selectnavsearchTrue);
  return (
    <NavBar>
      {navsearch === false ? <Home></Home> : <ProductGrid></ProductGrid>}
    </NavBar>
  );
};

export default Homepage;
