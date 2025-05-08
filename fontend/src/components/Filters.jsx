import React from "react";

const Filters = ({ selectedSubCategories, setSelectedSubCategories, minRating, setMinRating, sortBy, setSortBy, clearFilters }) => {
  const subCategoryList = ["Men", "Women"]; // ✅ Only Men & Women, Kids Removed

  return (
    <div className="p-3 border rounded">
      <h5>Filters</h5>

      {/* ✅ Sub-Category Filter */}
      <label>Sub-Categories:</label>
      {subCategoryList.map((subCategory) => (
        <div key={subCategory}>
          <input
            type="checkbox"
            value={subCategory}
            checked={selectedSubCategories.includes(subCategory)}
            onChange={(e) => {
              const selected = e.target.checked
                ? [...selectedSubCategories, e.target.value]
                : selectedSubCategories.filter((id) => id !== e.target.value);
              setSelectedSubCategories(selected);
            }}
          />
          <span> {subCategory}</span>
        </div>
      ))}

      {/* ✅ Rating Filter (Slider) */}
      <label className="mt-2">Minimum Rating:</label>
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

      {/* ✅ Sort by Price (Radio Buttons) */}
      <label className="mt-2">Sort by Price:</label>
      <div>
        <input type="radio" name="sortPrice" value="low-to-high" checked={sortBy === "low-to-high"} onChange={() => setSortBy("low-to-high")} /> Low to High
      </div>
      <div>
        <input type="radio" name="sortPrice" value="high-to-low" checked={sortBy === "high-to-low"} onChange={() => setSortBy("high-to-low")} /> High to Low
      </div>

      {/* ✅ Clear Filters Button */}
      <button className="btn btn-danger w-100 mt-3" onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default Filters;
