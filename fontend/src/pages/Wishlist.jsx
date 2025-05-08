import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Wishlist = () => {
    const { wishlistItems, addToCart, removeFromWishlist } = useContext(CartContext);

    return (
        <>
            <Header />
            <div className="container my-4">
                <h2 className="text-center">Your Wishlist</h2>

                {/* Wishlist Items in a Row */}
                <div className="row">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((product) => (
                            <div key={product._id} className="col-md-3 mb-4">
                                <div className="card h-100 d-flex flex-column justify-content-between"> 
                                    {/* Product Image - Fixed to Top */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="card-img-top"
                                        style={{ height: "250px", objectFit: "cover" }} // Full Card Image
                                    />

                                    {/* Product Details - Fixed to Bottom */}
                                    <div className="card-body text-center">
                                        <h5>{product.name}</h5>
                                        <p><strong>Price:</strong> ₹{product.price}</p>
                                    </div>

                                    {/* Action Buttons - Fixed Bottom */}
                                    <div className="p-3">
                                        <button 
                                            onClick={() => addToCart(product)} 
                                            className="btn btn-primary w-100 mb-2">
                                            Move to Cart
                                        </button>
                                        <button 
                                            onClick={() => removeFromWishlist(product._id)} 
                                            className="btn btn-danger w-100">
                                            Remove from Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Your wishlist is empty.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Wishlist;
