import React, { useState, useEffect } from "react";
import "./Filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";
import BASE_URL from "../../../constants/apiConfig";

const Filter = ({ filters = {}, setFilters = () => {}, scrollToTop = () => {} }) => {
 const [categories, setCategories] = useState([]);

  const filterColors = [
    "red", "white", "black", "green", "blue",
    "#D29B47", "#E5AE95", "#D76B67", "#BABABA", "#BFDCC4",
  ];

  const filterSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const updatedColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];
      scrollToTop?.();
      return { ...prev, colors: updatedColors };
    });
  };

  const handleSizeChange = (size) => {
    setFilters((prev) => {
      const updatedSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      scrollToTop?.();
      return { ...prev, sizes: updatedSizes };
    });
  };

  const [localPrice, setLocalPrice] = useState(filters.priceRange || [100, 5000]);

  // Sync local state with parent filter when changed outside (e.g., reset)
  useEffect(() => {
    setLocalPrice(filters.priceRange);
  }, [filters.priceRange]);

  // Handle live slider movement — just local state
  const handleLocalPriceChange = (event, newValue) => {
    setLocalPrice(newValue);
  };

  // Apply filter only when slider is dropped
  const handlePriceCommit = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
    scrollToTop?.();
  };

  const handleCategorySelect = (catId) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catId ? null : catId,
    }));
    scrollToTop?.();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  if (!filters || !setFilters) {
    console.warn("Filter component is missing required props.");
    return null;
  }


  return (
    <div className="filterSection">
      {/* Category Filter */}
      <div className="filterCategories">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Product Categories</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <p
                  key={cat.category_id}
                  className={`filterCategoryItem ${
                    filters.category === cat.category_id ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(cat.category_id)}
                >
                  {cat.name}
                </p>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Color Filter */}
      <div className="filterColors">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Color</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="filterColorBtn">
              {filterColors.map((color, index) => (
                <button
                  key={index}
                  className={`colorButton ${
                    filters.colors.includes(color) ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Size Filter */}
      <div className="filterSizes">
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary
            expandIcon={<IoIosArrowDown size={20} />}
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <h5 className="filterHeading">Sizes</h5>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="sizeButtons">
              {filterSizes.map((size, index) => (
                <button
                  key={index}
                  className={`sizeButton ${
                    filters.sizes.includes(size) ? "selected" : ""
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Price Filter */}
    <div className="filterPrice">
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown size={20} />}
          sx={{ padding: 0, marginBottom: 2 }}
        >
          <h5 className="filterHeading">Price</h5>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={localPrice}
            min={100}
            max={5000}
            step={50}
            onChange={handleLocalPriceChange}
            onChangeCommitted={handlePriceCommit}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `₹${value}`}
            sx={{
              color: "black",
              "& .MuiSlider-thumb": {
                backgroundColor: "white",
                border: "2px solid black",
                width: 18,
                height: 18,
              },
            }}
          />
      <div className="filterSliderPrice">
        <div className="priceRange">
          <p>Min Price: <span>₹{localPrice[0]}</span></p>
          <p>Max Price: <span>₹{localPrice[1]}</span></p>
        </div>
      </div>
    </AccordionDetails>
  </Accordion>
</div>
    </div>
  );
};

export default Filter;