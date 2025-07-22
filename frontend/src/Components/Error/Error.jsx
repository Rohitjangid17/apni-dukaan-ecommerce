import React from "react";
import { Link } from "react-router-dom";

import "./Error.css";

const Error = () => {
  return (
    <>
      <div className="errorContainer">
        <h1>Oops!</h1>
        <h3>This page doesn't exist</h3>
        <p>
          The page you’re trying to reach isn’t available on <strong>Apni Dukaan</strong>. <br />
          Don’t worry, click the button below to head back to the home page and continue shopping!
        </p>
        <Link to="/" className="errorBackBtn">Return to Homepage</Link>
      </div>
    </>
  );
};

export default Error;
