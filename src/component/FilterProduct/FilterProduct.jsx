import React, { useState, useEffect } from "react";
import { product as productsData } from "../../db/product";
import "./style.css";

const ProductFilter = () => {
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    rating: [0, 5],
    priceRange: [0, 500],
  });

  //   let a = ["a", "b", "c", "d", "a"];

  //   let c = a.filter((item) => ["a", "b"].includes(item));

  //   console.log(c);

  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Extract unique brands and categories
  const uniqueBrands = [
    ...new Set(productsData.map((product) => product.brand)),
  ];
  const uniqueCategories = [
    ...new Set(productsData.map((product) => product.category)),
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter =
        filterType === "rating" || filterType === "priceRange"
          ? value
          : prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value];

      console.log(updatedFilter);
      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = productsData;

      if (filters.brands.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.brands.includes(product.brand)
        );
      }

      if (filters.categories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.categories.includes(product.category)
        );
      }

      if (filters.rating.length === 2) {
        updatedProducts = updatedProducts.filter(
          (product) =>
            product.rating >= filters.rating[0] &&
            product.rating <= filters.rating[1]
        );
      }

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [filters]);

  return (
    <div className="container my-4 filterProduct">
      <div className="d-flex gap-3 border">
        <div className="d-flex flex-column p-3 flex-2 gap-4 text-white bg-dark position-sticky top-0 h-100">
          <h2>Filter Products</h2>
          {/* Brand Filter */}
          <div className="d-flex flex-column border-bottom">
            <h4>Brands</h4>
            {uniqueBrands.map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  className="mx-2"
                  value={brand}
                  onChange={() => handleFilterChange("brands", brand)}
                />
                {brand}
              </label>
            ))}
          </div>
          {/* Category Filter */}
          <div className="d-flex flex-column border-bottom">
            <h4>Categories</h4>
            {uniqueCategories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  className="mx-2"
                  value={category}
                  onChange={() => handleFilterChange("categories", category)}
                />
                {category}
              </label>
            ))}
          </div>
          {/* Rating Filter */}
          <div className="d-flex flex-column border-bottom">
            <h4>Rating</h4>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={filters.rating[0]}
              onChange={(e) =>
                handleFilterChange("rating", [
                  parseFloat(e.target.value),
                  filters.rating[1],
                ])
              }
            />
            <p>
              Rating: {filters.rating[0]} - {filters.rating[1]}
            </p>
          </div>
          {/* Price Range Filter */}
          <div className="border-bottom">
            <h4>Price Range</h4>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  parseInt(e.target.value),
                  filters.priceRange[1],
                ])
              }
            />
            <p>
              Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </p>
          </div>
        </div>
        {/* Render Filtered Products */}
        <div className="flex-3">
          <h3 className="text-center pb-4">Filtered Products</h3>
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-sm-12 col-md-4 col-lg-4 mb-3 ">
                <div className="card h-100">
                  <img
                    className="card-img"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h4 className="card-title">{product.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {product.sku}
                    </h6>
                    <p className="card-text">{product.description}</p>
                    <div className="buy d-flex justify-content-between align-items-center">
                      <div className="price text-success">
                        <h5 className="mt-4">${product.price}</h5>
                      </div>
                      <a href="#" className="btn btn-danger mt-3">
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
