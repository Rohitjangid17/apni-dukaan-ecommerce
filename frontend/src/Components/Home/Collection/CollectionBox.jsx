import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="collection">
        <div className="collectionLeft">
          <p className="col-p">Hot List</p>
          <h3 className="col-h3">
            <span>Women</span> Collection
          </h3>
          <div className="col-link">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Hot List</p>
            <h3 className="col-h3">
              <span>Men</span> Collection
            </h3>
            <div className="col-link">
              <Link to="/shop" onClick={scrollToTop}>
                <h5>Shop Now</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Hot List</p>
              <h3 className="col-h3">
                <span>Kids</span> Collection
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
                <span>Gift</span> Happiness
              </h3>
              <p className="col-p">
                The perfect gift — delivered in seconds.
              </p>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
