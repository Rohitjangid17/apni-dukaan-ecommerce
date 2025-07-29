import { useEffect, useState } from "react";
import BASE_URL from "../constants/apiConfig";

const generateFakeReview = () => {
    const value = (Math.random() * 4 + 1).toFixed(1);
    return `${parseFloat(value).toFixed(1)}k+ reviews`;
};

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/products`);
                const data = await res.json();

                const productList = Array.isArray(data?.data) ? data.data : [];

                const enhanced = productList.map(product => ({
                    ...product,
                    productId: product.product_id,
                    categoryId: product.category_id,
                    createdBy: product.created_by,
                    productReviews: generateFakeReview(),
                    rating: (Math.random() * 2 + 3).toFixed(1),
                }));

                setProducts(enhanced);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return { products, loading };
};

export default useProducts;