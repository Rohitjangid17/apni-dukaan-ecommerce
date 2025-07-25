import { useEffect, useState } from "react";
import BASE_URL from "../constants/apiConfig";

const generateFakeReview = () => {
    const value = (Math.random() * 4 + 1).toFixed(1);
    const rounded = parseFloat(value).toFixed(1);
    return `${rounded}k+ reviews`;
};

const useProducts = ({ fetchAll = true, filters = {}, limit = 12, startPage = 1 } = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(startPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                let allProducts = [];
                let currentPage = startPage;
                let keepFetching = true;

                while (keepFetching) {
                    const res = await fetch(`${BASE_URL}/products?page=${currentPage}&limit=${limit}`);
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

                    allProducts = [...allProducts, ...enhanced];

                    const total = data.total_pages || 1;
                    setTotalPages(total);

                    if (currentPage >= total) {
                        keepFetching = false;
                    } else {
                        currentPage++;
                    }
                }

                setProducts(allProducts);
            } catch (err) {
                console.error("Failed to fetch all products:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchPaginatedProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`);
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
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                console.error("Failed to fetch paginated products:", err);
            } finally {
                setLoading(false);
            }
        };

        if (fetchAll) {
            fetchAllProducts();
        } else {
            fetchPaginatedProducts();
        }
    }, [fetchAll, limit, page, startPage]);

    return { products, loading, page, totalPages, setPage };
};

export default useProducts;