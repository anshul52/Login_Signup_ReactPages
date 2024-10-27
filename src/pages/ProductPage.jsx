import React from "react";
import ProductView from "../components/ProductViewCompo";
import Nav from "../components/nav";

const ProductPage = () => {
  return (
    <>
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <Nav />
        <ProductView />
      </div>
    </>
  );
};

export default ProductPage;
