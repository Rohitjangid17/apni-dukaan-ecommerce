// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import BASE_URL from "../constants/apiConfig";


const fakeReviewList = [
    "4.8k+ reviews", "3.5k+ reviews", "5.1k+ reviews", "2.2k+ reviews", "4.1k+ reviews",
    "1.9k+ reviews", "3.8k+ reviews", "3.1k+ reviews", "2.5k+ reviews", "4.9k+ reviews",
    "1.1k+ reviews", "2.9k+ reviews", "1.4k+ reviews", "3.6k+ reviews", "2.0k+ reviews",
    "1.7k+ reviews", "2.4k+ reviews", "1.3k+ reviews", "1.6k+ reviews", "1.2k+ reviews",
    "2.6k+ reviews", "3.4k+ reviews", "4.3k+ reviews", "1.8k+ reviews", "2.1k+ reviews",
    "3.9k+ reviews", "4.2k+ reviews", "2.3k+ reviews", "1.5k+ reviews", "5.0k+ reviews",
    "1.0k+ reviews", "2.8k+ reviews", "3.3k+ reviews", "4.6k+ reviews", "3.2k+ reviews",
    "2.7k+ reviews", "1.8k+ reviews", "4.5k+ reviews",
    "3.0k+ reviews", "2.2k+ reviews", "1.9k+ reviews", "3.7k+ reviews", "2.6k+ reviews",
    "4.4k+ reviews", "3.3k+ reviews", "2.1k+ reviews", "1.6k+ reviews", "3.5k+ reviews",
    "4.0k+ reviews", "2.9k+ reviews"
];

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/`);
                const data = await res.json();
                const productList = Array.isArray(data?.data) ? data.data : [];

                const enhancedProducts = productList.map((product, index) => ({
                    ...product,
                    // Convert snake_case to camelCase for consistency
                    productId: product.product_id,
                    categoryId: product.category_id,
                    createdBy: product.created_by,

                    productReviews: fakeReviewList[index % fakeReviewList.length],
                    rating: (Math.random() * 2 + 3).toFixed(1),
                }));

                setProducts(enhancedProducts);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading };
};

export default useProducts;