import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const UserProfile = () => {
    const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+91 9876543210",
        defaultAddress: "123, Park Street, Kolkata, India",
    };

    const [addresses, setAddresses] = useState(() => {
        return JSON.parse(localStorage.getItem("addressList")) || [userData.defaultAddress];
    });

    const [newAddress, setNewAddress] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];

        if (!Array.isArray(savedOrders)) {
            setOrderHistory([]);
        } else {
            setOrderHistory(savedOrders);
        }
    }, []);

    
    const validOrders = orderHistory.filter(order =>
        order &&
        typeof order === "object" &&
        order.address &&
        order.date &&
        Array.isArray(order.items) 
    );

    
    const handleDeleteOrder = (index) => {
        const updatedOrders = orderHistory.filter((_, i) => i !== index);
        localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
        setOrderHistory(updatedOrders);
        alert("Order deleted successfully!");
    };

    const handleAddAddress = () => {
        if (!newAddress.trim()) {
            alert("Please enter a valid address!");
            return;
        }

        const updatedAddresses = [...addresses, newAddress];
        localStorage.setItem("addressList", JSON.stringify(updatedAddresses));
        setAddresses(updatedAddresses);
        setNewAddress("");
        alert("Address added successfully!");
    };

    const handleDeleteAddress = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        localStorage.setItem("addressList", JSON.stringify(updatedAddresses));
        setAddresses(updatedAddresses);
        alert("Address deleted successfully!");
    };

    const handleEditAddress = () => {
        if (!newAddress.trim() || editIndex === null) return;

        const updatedAddresses = [...addresses];
        updatedAddresses[editIndex] = newAddress;
        localStorage.setItem("addressList", JSON.stringify(updatedAddresses));
        setAddresses(updatedAddresses);
        setNewAddress("");
        setEditIndex(null);
        alert("Address updated successfully!");
    };

    console.log("Valid Orders:", validOrders);

    return (
        <>
            <Header />
            <div className="container my-4">
                <h2>User Profile</h2>

                
                <div className="border p-3 mb-4">
                    <h5><strong>Name:</strong> {userData.name}</h5>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                </div>

                
                <h4>Saved Address</h4>
                {addresses.length > 0 ? (
                    addresses.map((addr, index) => (
                        <div key={index} className="border p-2 d-flex justify-content-between">
                            {addr}
                            <div>
                                <button onClick={() => { setNewAddress(addr); setEditIndex(index); }} className="btn btn-warning btn-sm me-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteAddress(index)} className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No saved address.</p>
                )}

               
                <div className="mt-3">
                    <input
                        type="text"
                        placeholder="Enter new address"
                        className="form-control mb-2"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                    {editIndex !== null ? (
                        <button onClick={handleEditAddress} className="btn btn-warning w-100">Update Address</button>
                    ) : (
                        <button onClick={handleAddAddress} className="btn btn-primary w-100">Add New Address</button>
                    )}
                </div>

               
                <h4 className="mt-4">Order History</h4>
                {validOrders.length > 0 ? (
                    validOrders.map((order, index) => (
                        <div key={index} className="border p-3 my-3">
                            <h5>Order Date: {order.date}</h5>
                            <p><strong>Delivery Address:</strong> {order.address}</p>
                            
                            <button onClick={() => handleDeleteOrder(index)} className="btn btn-danger btn-sm mt-2">Delete Order</button>
                        </div>
                    ))
                ) : (
                    <p>No past orders found.</p>
                )}
            </div>
        </>
    );
};

export default UserProfile;
