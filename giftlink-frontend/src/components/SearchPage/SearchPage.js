import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import urlConfig from "../../data/urlConfig";
import "./SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState(6);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const categories = ["Toys", "Books", "Clothes", "Electronics"];
  const conditions = ["New", "Used", "Refurbished"];

  const handleSearch = async () => {
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById("categorySelect").value,
      condition: document.getElementById("conditionSelect").value,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Search Gifts 🎁</h2>

      <div className="card p-4 shadow-sm">
        {/* Search Text */}
        <label htmlFor="searchQuery">Search by Name</label>
        <input
          type="text"
          id="searchQuery"
          className="form-control my-2"
          placeholder="Enter gift name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Dropdown */}
        <label htmlFor="categorySelect">Category</label>
        <select id="categorySelect" className="form-control my-1">
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Condition Dropdown */}
        <label htmlFor="conditionSelect">Condition</label>
        <select id="conditionSelect" className="form-control my-1">
          <option value="">All</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>

        {/* Age Range Slider */}
        <label htmlFor="ageRange" className="mt-3">
          Less than {ageRange} years
        </label>
        <input
          type="range"
          id="ageRange"
          className="form-control-range w-100"
          min="1"
          max="10"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        />

        {/* Search Button */}
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="search-results mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product._id} className="card mb-3 shadow-sm">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description?.slice(0, 100)}...
                </p>
              </div>
              <div className="card-footer text-end">
                <button
                  onClick={() => goToDetailsPage(product._id)}
                  className="btn btn-outline-primary btn-sm"
                >
                  View More
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info" role="alert">
            No products found. Please adjust your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
