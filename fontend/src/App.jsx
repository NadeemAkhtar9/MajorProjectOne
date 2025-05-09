import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage"
import { CartContext } from "./context/CartContext";
import useFetch from "./hooks/useFetch";
import Cart from "./pages/Cart";
import { useState } from "react";
import Wishlist from "./pages/Wishlist";
import UserProfile from "./pages/UserProfile";
import CheckoutPage from "./pages/CheckoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const { data = [], loading, error } = useFetch("https://major-project-one-backend-eight.vercel.app/api/products");
  const [cartItems, setCartItems] = useState(data);
  const [wishlistItems, setWishlistItems] = useState(data);


  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);alert("Item added to cart!")
  };

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);alert("Item added to wishlist!")
  };

  const incrementQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );alert("Item quantity increased!")
  };

  const decrementQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );alert("Item quantity decreased!")
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));alert("Item removed from the cart!")
  };
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item._id !== id)); 
    alert("Item removed from Wishlist!");
};

  
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        addToWishlist,
        wishlistItems,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        removeFromWishlist
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<ProductListingPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/checkout" element={<CheckoutPage />} />

        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
};

export default App;
			