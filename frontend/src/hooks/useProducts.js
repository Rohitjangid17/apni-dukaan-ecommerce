// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import BASE_URL from "../constants/apiConfig";


// Generate fake review like "2.5k+ reviews"
const generateFakeReview = () => {
    const value = (Math.random() * 4 + 1).toFixed(1); // Between 1.0 and 5.0
    const rounded = parseFloat(value).toFixed(1);
    return `${rounded}k+ reviews`;
};

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products?page=${page}&limit=12`);
                const data = await res.json();

                const productList = Array.isArray(data?.data) ? data.data : [];

                const enhancedProducts = productList.map((product) => ({
                    ...product,
                    productId: product.product_id,
                    categoryId: product.category_id,
                    createdBy: product.created_by,
                    productReviews: generateFakeReview(),
                    rating: (Math.random() * 2 + 3).toFixed(1),
                }));

                setProducts(enhancedProducts);
                setTotalPages(data.total_pages || 0);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    return { products, loading, page, totalPages, setPage };
};

export default useProducts;