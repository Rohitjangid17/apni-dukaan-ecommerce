import { useState, useEffect } from "react";
import BASE_URL from "../constants/apiConfig";

const useProductDetails = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/${productId}`, {
                    signal: controller.signal
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                const enhancedProduct = {
                    ...data,
                    productId: data.product_id,
                    categoryId: data.category_id,
                    createdBy: data.created_by,
                };

                setProduct(enhancedProduct);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Failed to fetch product:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => controller.abort();
    }, [productId]);

    return { product, loading };
};

export default useProductDetails;