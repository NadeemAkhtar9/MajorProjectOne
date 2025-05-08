import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header"
import { CartContext } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data: product, loading, error } = useFetch(`http://localhost:3000/api/products/${productId}`);
  const {addToCart,addToWishlist} = useContext(CartContext)

  if (loading) return <p className="text-center">Loading product details...</p>;
  if (error) return <p className="text-center">Error fetching product details: {error}</p>;

  //  Ensure product is defined before accessing properties
  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <>
    <Header />
    <div className="container my-4">
      <div className="row">
        {/*  Left Side - Product Image */}
        <div className="col-md-6">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "400px", objectFit: "cover" }} //  Fixed Image Size
            />
          ) : (
            <p>Image not available</p>
          )}
        </div>

        {/*  Right Side - Product Details */}
        <div className="col-md-6">
          <h2>{product.name || "No name available"}</h2>
          <p className="text-muted">{product.description || "No description available"}</p>
          <p><strong>Price:</strong> ₹{product.price || "N/A"}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating || "Not Rated"}</p>
          <button onClick={()=>addToCart(product)} className="btn btn-primary w-100 mt-3">Add to Cart</button>
          <button onClick={()=>addToWishlist(product)}  className="btn btn-outline-danger w-100 mt-2">❤️ Add to Wishlist</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailsPage;
