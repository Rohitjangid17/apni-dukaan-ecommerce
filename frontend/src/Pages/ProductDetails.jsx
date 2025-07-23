import React from "react";
import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();

  return (
    <>
      {/* <Product productId={productId}/>
      <AdditionalInfo productId={productId}/> */}
      <RelatedProducts/>
    </>
  );
};

export default ProductDetails;
