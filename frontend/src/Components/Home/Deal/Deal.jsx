import React from "react";
import { Link } from "react-router-dom";
import "./Deal.css";

const Deal = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mainDeal">
        <div className="deal">
          <div className="dealMainContent">
            <div className="dealContent">
              <p>Apni Dukaan Exclusive Deal</p>
              <h3>
                Monsoon
                <span> Sale</span>
              </h3>
              <div className="dealLink">
                <Link to="/shop" onClick={scrollToTop}>
                  Browse Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Deal;
