// src/Veg.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from './Store'; // ✅ Import AddToCart
import './Veg.css'; // optional, or remove if not using
//import { AddToCart } from './Store';


function Veg() {
  const vegProducts = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  // ✅ Price Ranges
  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 150', min: 101, max: 150 },
    { value: 'Rs 151 to Rs 200', min: 151, max: 200 },
    { value: 'Rs 201 to Rs 250', min: 201, max: 250 },
    { value: 'Rs 251 to Rs 500', min: 251, max: 500 },
  ];

  // ✅ Filter state
  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckboxChange = (selectedRange) => {
    if (selectedRanges.includes(selectedRange)) {
      const updated = selectedRanges.filter((r) => r !== selectedRange);
      setSelectedRanges(updated);
    } else {
      const updated = [...selectedRanges, selectedRange];
      setSelectedRanges(updated);
    }
  };

  // ✅ Filter products before paginating
  const filteredVegProducts =
    selectedRanges.length > 0
      ? vegProducts.filter((product) =>
          selectedRanges.some((rangeValue) => {
            const range = priceRanges.find((r) => r.value === rangeValue);
            return range && product.price >= range.min && product.price <= range.max;
          })
        )
      : vegProducts;

  // ✅ Pagination logic (after filtering)
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVegProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(filteredVegProducts.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="veg-container">
      <h1 className="title">Vegetables</h1>
  
      <div className="row">
        {/* ✅ Filters */}
        <div className="col-md-3 mb-3">
          <h5 className="mb-3">Filter by Price</h5>
  
          <div className="d-flex flex-wrap gap-2 mb-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className={`btn btn-outline-primary btn-sm rounded-pill ${
                  selectedRanges.includes(range.value) ? 'active' : ''
                }`}
                style={{ userSelect: 'none' }}
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  autoComplete="off"
                  checked={selectedRanges.includes(range.value)}
                  onChange={() => handleCheckboxChange(range.value)}
                />
                {range.value}
              </label>
            ))}
          </div>
  
          <button className="btn btn-secondary btn-sm mt-2" onClick={() => setSelectedRanges([])}>
            Clear Filters
          </button>
        </div>
   
        {/* ✅ Product List */}
        <div className="col-md-9">
          <div className="veg-list">
            {filteredVegProducts.length > 0 ? (
              currentItems.map((product, index) => (
                <div className="veg-card" key={index}>
                  <img
                    src={product.image || '/images/default.jpg'}
                    alt={product.name}
                    className="veg-img"
                  />
                  <div className="veg-info">
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <button className="veg-cart" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Veg Products Available</p>
            )}
          </div>
  
          {/* ✅ Pagination Controls */}
          <div className="mt-4">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                style={{
                  margin: '0 5px',
                  fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                }}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Veg;