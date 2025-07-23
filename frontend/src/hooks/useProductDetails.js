import { useState, useEffect } from "react";
import BASE_URL from "../constants/apiConfig";

const useProductDetails = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Id in fetch", productId)


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/${productId}`);
                http://127.0.0.1:8000/products/11

                console.log("API Response:", "dataaaaaa");

                const data = await res.json();

                setProduct(data?.data || null);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    console.log("Product deta", product)

    return { product, loading };
};

export default useProductDetails;