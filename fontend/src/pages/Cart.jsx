import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, addToWishlist } = useContext(CartContext);
    console.log(cartItems)
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        localStorage.setItem("cartItems", JSON.stringify([])); 
        alert("Redirecting to Checkout...");
        navigate("/checkout");
    };
    console.log(JSON.parse(localStorage.getItem("cartItems")));

    
    return (
        <>
            <Header />
            <div className="container my-4">
                <h2 className="text-center mb-4">Your Cart</h2>

                <div className="row">
                    <div className="col-12 col-md-8">
                        {cartItems.length > 0 ? (
                            cartItems.map((product) => (
                                <div key={product._id} className="card mb-4">
                                    <div className="row g-0 align-items-stretch">
                                        <div className="col-md-4">
                                            <img src={product.imageUrl} alt={product.name} className="img-fluid rounded-start w-100 h-100" style={{ objectFit: "cover", maxHeight: "250px" }} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold">{product.name}</h5>
                                                <p className="fw-bold">₹{product.price}</p>
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="me-2">Quantity:</span>
                                                    <button onClick={() => decrementQuantity(product._id)} className="btn btn-outline-secondary btn-sm me-2">-</button>
                                                    <span>{product.quantity}</span>
                                                    <button onClick={() => incrementQuantity(product._id)} className="btn btn-outline-secondary btn-sm ms-2">+</button>
                                                </div>
                                                <div className="d-grid gap-2 mt-3">
                                                    <button onClick={() => removeFromCart(product._id)} className="btn btn-danger">Remove from Cart</button>
                                                    <button onClick={() => addToWishlist(product)} className="btn btn-outline-primary">Move to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Your cart is empty.</p>
                        )}
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="border rounded p-3">
                            <h4>Price Details</h4>
                            <p><strong>Total Items:</strong> {cartItems.length}</p>
                            <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                            <button onClick={handlePlaceOrder} className="btn btn-primary w-100 mt-3">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
