import { useEffect, useState } from "react";
import { api } from "../api";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(cart);
    }, []);

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(
            item => item.id !== id
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const checkout = async () => {
        try {

            for (const item of cartItems) {

                await api.post("/orders/createorder", {
                    productId: item.id,
                    quantity: item.quantity
                });

            }

            alert("Order placed successfully");

            localStorage.removeItem("cart");

            setCartItems([]);

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.error ||
                "Checkout failed"
            );
        }
    };

    return (
        <div>

            <h1>My Cart</h1>

            {cartItems.length === 0 ? (
                <h3>Cart Empty</h3>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="glass"
                            style={{
                                padding: "1rem",
                                marginBottom: "1rem"
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt=""
                                width="120"
                            />

                            <h3>{item.name}</h3>

                            <p>
                                ₹{item.price}
                            </p>

                            <p>
                                Qty: {item.quantity}
                            </p>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    removeItem(item.id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <h2>
                        Total : ₹{totalPrice}
                    </h2>

                    <button
                        className="btn"
                        onClick={checkout}
                    >
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;