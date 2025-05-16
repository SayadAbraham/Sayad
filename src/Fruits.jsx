import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart } from './Store';
import './Veg.css'; // Same styling file

function Fruits() {
  const FruitsProducts = useSelector((state) => state.products.Fruits) || [];
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset currentPage if products count changes and current page becomes invalid
  useEffect(() => {
    const totalPage = Math.ceil(FruitsProducts.length / itemsPerPage);
    if (currentPage > totalPage && totalPage > 0) {
      setCurrentPage(totalPage);
    }
    if (totalPage === 0) {
      setCurrentPage(1);
    }
  }, [FruitsProducts.length, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = FruitsProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPage = Math.ceil(FruitsProducts.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="veg-container">
      <h1 className="title">Fruits</h1>
      <div className="veg-list">
        {FruitsProducts.length > 0 ? (
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
          <p>No Fruits Products Available</p>
        )}
      </div>

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
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPage || totalPage === 0}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Fruits;
