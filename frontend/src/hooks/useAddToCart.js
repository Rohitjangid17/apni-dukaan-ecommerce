import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice";
import toast from "react-hot-toast";
import BASE_URL from "../constants/apiConfig";

const useAddToCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const addToCartHandler = async (product, userId = 8, quantity = 1) => {

        const productInCart = cartItems.find((item) => item.id === product.id);


        if (productInCart && productInCart.quantity >= 20) {
            toast.error("Product limit reached", {
                duration: 2000,
                style: { backgroundColor: "#ff4b4b", color: "white" },
                iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
            });
            return;
        }

        product.color = product.color ? product.color : product.colors[0];
        product.size = product.size ? product.size : product.sizes[0];


        try {
            const res = await fetch(`${BASE_URL}/cart/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId, // HARD CODED USER ID
                    product_id: product.id,
                    quantity,
                    price: product.price,
                    color: product.color,
                    size: product.size,
                }),
            });

            if (!res.ok) throw new Error("Failed to add to cart");

            // dispatch(addToCart(product));

            dispatch(addToCart({ ...product, quantity }));

            toast.success("Added to cart!", {
                duration: 2000,
                style: { backgroundColor: "#07bc0c", color: "white" },
                iconTheme: { primary: "#fff", secondary: "#07bc0c" },
            });
        } catch (err) {
            console.error("Add to cart error:", err);
            toast.error("Error adding to cart.");
        }

    };

    return addToCartHandler;
};

export default useAddToCart;