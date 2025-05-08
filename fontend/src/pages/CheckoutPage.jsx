import { useState } from "react";
import Header from "../components/Header";
const CheckoutPage = () => {
    const [selectedAddress, setSelectedAddress] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const addressList = JSON.parse(localStorage.getItem("addressList")) || [];

    const handleConfirmOrder = () => {
        if (!selectedAddress) {
            alert("Please select an address before placing an order!");
            return;
        }
        console.log(JSON.parse(localStorage.getItem("orderHistory")));

        const newOrder = {
            items: cartItems || [],
            totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) || 0,
            address: selectedAddress,
            date: new Date().toLocaleString(),
        };
    
        let savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    
        if (!Array.isArray(savedOrders)) {
            savedOrders = []; //  Reset if invalid data found
        }
    
        savedOrders.push(newOrder);
        localStorage.setItem("orderHistory", JSON.stringify(savedOrders)); //  Save orders properly
        
        localStorage.setItem("cartItems", JSON.stringify([])); // Clear cart
        setOrderPlaced(true);
    };
    
    

    return (
        <>
        <Header />
        <div className="container my-4">
            <h2>Checkout Summary</h2>

            <h4>Select Address for Delivery</h4>
            <select onChange={(e) => setSelectedAddress(e.target.value)}>
                {addressList.length > 0 ? (
                    addressList.map((addr, index) => <option key={index} value={addr}>{addr}</option>)
                ) : (
                    <option>No saved addresses</option>
                )}
            </select>

            <h4 className="mt-3">Order Summary</h4>
            {cartItems.map((product, index) => (
                <p key={index}>{product.name} - ₹{product.price} x {product.quantity}</p>
            ))}

            {orderPlaced ? (
                <h4 className="text-success mt-3"> Order Placed Successfully! 🎉</h4>
            ) : (
                <button onClick={handleConfirmOrder} className="btn btn-success mt-3">Confirm & Place Order</button>
            )}
        </div>
        </>
    );
};

export default CheckoutPage;
