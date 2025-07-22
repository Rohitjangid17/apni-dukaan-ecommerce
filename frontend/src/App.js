import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Shop from "../src/Pages/Shop";
import Contact from "../src/Pages/Contact";
import Blog from "../src/Pages/Blog";
import Header from "../src/Components/Header/Navbar";
import Footer from "../src/Components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import TermsConditions from "./Pages/TermsConditions";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { Toaster } from "react-hot-toast";
import Search from "./Pages/Search";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
