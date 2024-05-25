import React, { useState, useEffect, useRef } from "react";
import { getCategories } from "../api/products";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const debouncedQueryRef = useRef("");

  const [sortBy, setSortBy] = useState("");
  let handler;
  useEffect(() => {
    if (handler) {
      clearTimeout(handler);
    } else {
      handler = setTimeout(() => {
        debouncedQueryRef.current = query;
        onSearch(debouncedQueryRef.current);
      }, 2000);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      console.log(data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onSearch(query, e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onSearch(query, selectedCategory, e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {/* filter */}

      <select value={selectedCategory} onChange={handleCategoryChange} className="filter">
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* sort */}
      <select value={sortBy} onChange={handleSortChange} className="sort">
        <option value="">Sort by</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Search;
