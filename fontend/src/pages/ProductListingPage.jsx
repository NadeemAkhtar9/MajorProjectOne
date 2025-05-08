import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Header from "../components/Header"
import { CartContext } from "../context/CartContext";

const ProductListingPage = () => {
    const { addToCart, addToWishlist } = useContext(CartContext);
    const { categoryId } = useParams();
    const { data = [], loading, error } = useFetch("http://localhost:3000/api/products");

    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); //  Search query state

    const handleSubCategoryChange = (subCat) => {
        if (selectedSubCategories.includes(subCat)) {
            setSelectedSubCategories(selectedSubCategories.filter(item => item !== subCat));
        } else {
            setSelectedSubCategories([...selectedSubCategories, subCat]);
        }
    };

    const clearFilters = () => {
        setMinRating(0);
        setSortBy("");
        setSelectedSubCategories([]);
        setSearchQuery(""); //  Clear search query
    };

    if (loading) return <p className="text-center">Loading products...</p>;
    if (error) return <p className="text-center">Error fetching products: {error}</p>;

    const uniqueSubCategories = [...new Set(data.map(p => p.subCategories).filter(Boolean))];

    const filteredProducts = data.filter(product => {
        const matchCategory = product.categories && product.categories._id === categoryId;
        const matchRating = product.rating ? product.rating >= minRating : true;
        const matchSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategories);
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()); //  Search query check

        return matchCategory && matchRating && matchSubCategory && matchSearch; //  Combine all filters
    });

    if (sortBy === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <>
            {/*  Pass Search Function to Header */}
            <Header onSearch={setSearchQuery} />
            <div className="container my-4">
                <div className="row">
                    {/* === Left Side: Filters === */}
                    <div className="col-md-3">
                        <div className="p-3 border rounded">
                            <h5>Filters</h5>
                            <h6 className="mt-3">Sub-Categories:</h6>
                            {uniqueSubCategories.map(sub => (
                                <div key={sub}>
                                    <input
                                        type="checkbox"
                                        id={sub}
                                        checked={selectedSubCategories.includes(sub)}
                                        onChange={() => handleSubCategoryChange(sub)}
                                    />
                                    <label htmlFor={sub} className="ms-2">{sub}</label>
                                </div>
                            ))}
                            <label className="mt-3">Minimum Rating:</label>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.5"
                                value={minRating}
                                onChange={(e) => setMinRating(Number(e.target.value))}
                                className="form-range"
                            />
                            <p>Selected Rating: {minRating}</p>
                            <label className="mt-2">Sort by Price:</label>
                            <div>
                                <input
                                    type="radio"
                                    name="sortPrice"
                                    value="low-to-high"
                                    checked={sortBy === "low-to-high"}
                                    onChange={() => setSortBy("low-to-high")}
                                /> Low to High
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="sortPrice"
                                    value="high-to-low"
                                    checked={sortBy === "high-to-low"}
                                    onChange={() => setSortBy("high-to-low")}
                                /> High to Low
                            </div>
                            <button className="btn btn-danger w-100 mt-3" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* === Right Side: Product List === */}
                    <div className="col-md-9">
                        {filteredProducts.length > 0 ? (
                            <div className="row">
                                {filteredProducts.map(product => (
                                    <div key={product._id} className="col-md-4 mb-4">
                                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <div className="card">
                                                <img src={product.imageUrl} alt={product.name} className="card-img-top" style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                                    <p><strong>Rating:</strong> {product.rating}</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <button onClick={(e) => { e.preventDefault(); addToCart(product) }} className="btn btn-primary w-100 mt-auto">Add to Cart</button>
                                        <button onClick={(e) => { e.preventDefault(); addToWishlist(product)}} className="btn btn-outline-danger w-100 mt-2">❤️ Add to Wishlist</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductListingPage;
