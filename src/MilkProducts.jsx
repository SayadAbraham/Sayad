import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from './Store';
import './Veg.css';

function MilkProducts() {
  const milkProducts = useSelector((state) => state.products.MilkProducts);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  // ✅ Pagination logic
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = milkProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(milkProducts.length / itemsPerPage);
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="veg-container">
      <h1 className="title">Milk Products</h1>
      <div className="veg-list">
        {milkProducts && milkProducts.length > 0 ? (
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
                <button className="veg-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No Milk Products Available</p>
        )}
      </div>

      {/* ✅ Pagination Controls */}
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: "0 5px",
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
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
  );
}

export default MilkProducts;
