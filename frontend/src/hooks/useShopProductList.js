import { useEffect, useState } from "react";
import BASE_URL from "../constants/apiConfig";

// Check if user actually changed price
const isPriceRangeModified = (priceRange) => {
    return priceRange &&
        Array.isArray(priceRange) &&
        priceRange.length === 2 &&
        (priceRange[0] > 100 || priceRange[1] < 5000);
};

// Check if any filters are active
const areFiltersActive = (filters) => {
    return (
        (filters.category && filters.category !== "") ||
        (filters.colors && filters.colors.length > 0) ||
        (filters.sizes && filters.sizes.length > 0) ||
        isPriceRangeModified(filters.priceRange) ||
        (filters.sort_by && filters.sort_by !== "")
    );
};

const useShopProductList = ({ filters = {}, limit = 12, page = 1 }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams();
                params.append("page", page);
                params.append("limit", limit);

                if (areFiltersActive(filters)) {
                    if (filters.category) {
                        params.append("category_id", filters.category);
                    }

                    if (filters.colors?.length) {
                        filters.colors.forEach((color) => params.append("colors", color));
                    }

                    if (filters.sizes?.length) {
                        filters.sizes.forEach((size) => params.append("sizes", size));
                    }

                    if (isPriceRangeModified(filters.priceRange)) {
                        params.append("min_price", filters.priceRange[0]);
                        params.append("max_price", filters.priceRange[1]);
                    }

                    if (filters.sort_by) {
                        params.append("sort_by", filters.sort_by);
                    }
                }

                const api_url = `${BASE_URL}/products/filters?${params.toString()}`;

                const res = await fetch(api_url);
                const data = await res.json();

                const enhanced = data.data.map((product) => ({
                    ...product,
                    productId: product.product_id,
                    categoryId: product.category_id,
                    createdBy: product.created_by,
                    productReviews: `${(Math.random() * 4 + 1).toFixed(1)}k+ reviews`,
                    rating: (Math.random() * 2 + 3).toFixed(1),
                }));

                // // 
                if (filters.sort_by === "top_rated") {
                    enhanced.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                }

                setProducts(enhanced);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                console.error("Failed to fetch filtered products:", err);
                setProducts([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredProducts();
    }, [filters, limit, page]);

    return { products, loading, totalPages };
};

export default useShopProductList;