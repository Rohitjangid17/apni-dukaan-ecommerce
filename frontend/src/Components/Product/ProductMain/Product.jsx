import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";

import BASE_URL from "../../../constants/apiConfig";
import Spinner from "../../Spinner/Spinner";
import { Link } from "react-router-dom";
import useAddToCart from "../../../hooks/useAddToCart";
import useProductDetails from "../../../hooks/useProductDetails";

import toast from "react-hot-toast";
import "./Product.css";

const Product = ({productId}) => {

  // const [product, setProduct] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const addToCartHandler = useAddToCart();
  const { product, loading } = useProductDetails(productId);

  console.log("Product ID in product",productId)

  // Product images Gallery
  const [currentImg, setCurrentImg] = useState(0);
  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? productImg.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === productImg.length - 1 ? 0 : currentImg + 1);
  };

  // Product Quantity
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Size and Color Selection
  const [selectSize, setSelectSize] = useState(null);
  const [highlightedColor, setHighlightedColor] = useState(null);

  // Set default size and color after product is loaded
  useEffect(() => {
    if (product) {
      if (!selectSize && product.sizes?.length > 0) {
        setSelectSize(product.sizes[0]);
      }
      if (!highlightedColor && product.colors?.length > 0) {
        setHighlightedColor(product.colors[0]);
      }
    }
  }, [product]);

  // Add to Cart Handler
  const handleAddToCart = () => {
    if (!product) return;

    const selectedColor = highlightedColor || (Array.isArray(product.colors) && product.colors[0]) || "-";
    const selectedSize = selectSize || (Array.isArray(product.sizes) && product.sizes[0]) || "-";

      addToCartHandler(
        {
          ...product,
          color: selectedColor,
          size: selectedSize,
        },
        8,
        quantity
      );
    };

    if (loading) {
      return (
        <div className="loadingContainer">
          <Spinner />
        </div>
      );
    }

    return (
      <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {productImg.map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}${img}`}
                  alt={`product-${index}`}
                  onClick={() => setCurrentImg(index)}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="productFullImg">
             {productImg.length > 0 && (
                <img
                  src={`${BASE_URL}${productImg[currentImg]}`}
                  alt="current-product"
                  loading="lazy"
                />
              )}
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
            </div>
            <div className="productName">
              <h1>{product?.name}</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>1.2k reviews</p>
            </div>
            <div className="productPrice">
              <h3>₹{product?.price}</h3>
            </div>
            <div className="productDescription">
              <p>
                {product?.description}
              </p>
            </div>
            <div className="productSizeColor">
              <div className="productSize">
                <p>Sizes</p>
                <div className="sizeBtn">
                  {product?.sizes?.map((size) => (
                    <Tooltip
                      key={size}
                      title={size}
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <button
                        style={{
                          borderColor: selectSize === size ? "#000" : "#e0e0e0",
                        }}
                        onClick={() => setSelectSize(size)}
                      >
                        {size}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className="productColor">
                  <p>Color</p>
                  <div className="colorBtn">
                    {product?.colors?.map((color, index) => (
                      <Tooltip
                        key={index}
                        title={color}
                        placement="top"
                        TransitionComponent={Zoom}
                        arrow
                      >
                        <button
                          className={highlightedColor === color ? "highlighted" : ""}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            border: highlightedColor === color ? "2px solid #000" : "1px solid #ccc",
                            padding: "8px",
                            margin: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => setHighlightedColor(color)}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </div>
            </div>
            <div className="productCartQuantity">
              <div className="productQuantity">
                <button onClick={decrement}>-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <button onClick={increment}>+</button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
           {(product?.tags?.length > 0 ||
              (product?.dimensions && product.dimensions.toLowerCase() !== "string") ||
              (product?.weight && product.weight !== "string")) && (
              <div className="productTags">
                
                {product?.tags?.length > 0 && (
                  <p>
                    <span>Tags: </span>
                    {product.tags.map((tag, i) => (
                      <span key={i}>
                        {tag}
                        {i !== product.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}

                {product?.dimensions &&
                  product.dimensions.toLowerCase() !== "string" && (
                    <p>
                      <span>Dimensions: </span>
                      {product.dimensions}
                    </p>
                  )}

                {product?.weight &&
                  product.weight !== "string" && (
                    <p>
                      <span>Weight: </span>
                      {product.weight} kg
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
