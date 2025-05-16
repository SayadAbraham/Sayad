// src/Veg.jsx
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from './store';
import './Veg.css';

function Veg() {
  const vegProducts = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  // Price Ranges
  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 150', min: 101, max: 150 },
    { value: 'Rs 151 to Rs 200', min: 151, max: 200 },
    { value: 'Rs 201 to Rs 250', min: 201, max: 250 },
    { value: 'Rs 251 to Rs 500', min: 251, max: 500 },
  ];

  // Filter state
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

  // Filter products
  const filteredVegProducts =
    selectedRanges.length > 0
      ? vegProducts.filter((product) =>
          selectedRanges.some((rangeValue) => {
            const range = priceRanges.find((r) => r.value === rangeValue);
            return range && product.price >= range.min && product.price <= range.max;
          })
        )
      : vegProducts;

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRanges]);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVegProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(filteredVegProducts.length / itemsPerPage);
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="veg-container container">
      <h1 className="title">Vegetables</h1>
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-3">
          <h5>Filter by Price</h5>
          <ul className="list-group">
            {priceRanges.map((range) => (
              <li
                key={range.value}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedRanges.includes(range.value) ? 'active' : ''
                }`}
                onClick={() => handleCheckboxChange(range.value)}
                style={{ cursor: 'pointer' }}
              >
                {range.value}
                <input
                  type="checkbox"
                  checked={selectedRanges.includes(range.value)}
                  readOnly
                  className="ms-2"
                />
              </li>
            ))}
          </ul>
          <button
            className="btn btn-secondary btn-sm mt-2"
            onClick={() => setSelectedRanges([])}
          >
            Clear Filters
          </button>
        </div>

        {/* Products and Pagination */}
        <div className="col-md-9">
          <div className="veg-list row">
            {currentItems.length > 0 ? (
              currentItems.map((product, index) => (
                <div className="veg-card col-sm-6 col-lg-4 mb-4" key={index}>
                  <img
                    src={product.image || '/images/default.jpg'}
                    alt={product.name}
                    className="veg-img img-fluid"
                  />
                  <div className="veg-info">
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <button
                      className="veg-cart btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Veg Products Available</p>
            )}
          </div>

          {/* Pagination Controls */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPage }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Veg;
