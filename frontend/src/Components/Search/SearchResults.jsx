// src/Components/Search/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchResults.css";
import { Link } from "react-router-dom";
import BASE_URL from "../../constants/apiConfig";
import useAddToCart from "../../hooks/useAddToCart";
import Spinner from "../Spinner/Spinner";
import no_result_img from "../../Assets/no_results.jpg"
import useProducts from "../../hooks/useProducts";
import RenderStars from "../../Utils/RenderStars";

const SearchResults = () => {
    const addToCartHandler = useAddToCart();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase();
    const [filtered, setFiltered] = useState([]);
    const {products, loading} = useProducts({ fetchAll: true, limit: 10 })
    const [visibleCount, setVisibleCount] = useState(20);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };

    useEffect(() => {
      if (!loading && query && products.length) {
        const matched = products.filter((item) =>
          item.name.toLowerCase().includes(query)
        );
        setFiltered(matched);
      }
    }, [query, products, loading]);

    if (loading) {
      return (
        <div className="search-results-page">
          <Spinner />
        </div>
      );
    }

    return (
    <div className="search-results-page">
      
      {filtered.length === 0 ? (
        <div className="noResultsWrapper">
            <img src={no_result_img} alt="No Results" />
            <h3>No Matching Products Found</h3>
            <p>We couldn't find anything related to your search.</p>
            <Link to="/shop" onClick={scrollToTop}>
                Browse All Products
            </Link>
            </div>
      ) : (
        <div className="searchProducts">
          <h2>Search Results for "{query}"</h2>

          <div className="searchTabs">

            <div className="searchTabContent">
              <div className="searchMainContainer">
                {loading ? (
                  <Spinner/>
                ) : (
                  filtered.slice(0, visibleCount).map((product) => (
                    <div className="searchProductContainer" key={product.productId}>
                      <div className="searchProductImages">
                        <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                          {product.images && product.images.length > 0 && (
                            <img
                              src={`${BASE_URL}${product.images[0]}`}
                              loading="lazy"
                              className="sdProduct_front"
                              alt="product image"
                            />
                          )}
                        </Link>
                        <h4 onClick={() => addToCartHandler(product)}>Add to Cart</h4>
                      </div>
                      <div className="searchProductInfo">
                        <div className="searchProductCategoryWishlist">
                          <p>{product.category?.name || 'Apparel'}</p>
                        </div>
                        <div className="searchProductNameInfo">
                          <Link to={`/product/${product.productId}`} onClick={scrollToTop}>
                            <h5>{product.name}</h5>
                          </Link>
                          <p>₹{product.price}</p>
                          <div className="searchProductRatingReviews">
                            <div className="searchProductRatingStar">
                              {RenderStars(product.rating || 4.3)}
                            </div>
                            <span>{product.productReviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            {visibleCount < filtered.length ? (
              <button className="loadMoreBtn" onClick={() => setVisibleCount(prev => prev + 20)}>
                Load More
              </button>
            ) : (

                 <div className="searchDiscoverMore">
                    <Link to="/shop" onClick={scrollToTop}>
                    <p>Discover All</p>
                    </Link>
                </div>
            )}
          </div>

         
        </div>
      )}
    </div>
  );
};

export default SearchResults;