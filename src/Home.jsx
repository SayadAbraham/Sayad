import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Link this with your styles or add Tailwind/bootstrap if needed

function Home() {
  return (
    <div className="home-container">
      <div className="home-banner">
        <h1>Welcome to BigBasket 🛒</h1>
        <p>Your one-stop shop for fresh, quality groceries delivered to your doorstep.</p>
        <Link to="/veg" className="shop-now-btn">🌿 Start Shopping</Link>
      </div>

      <div className="category-highlights">
        <h2>Shop by Categories</h2>
        <div className="category-cards">
          <Link to="/veg" className="category-card">🌽 Fresh Veggies</Link>
          <Link to="/fruits" className="category-card">🍎 Juicy Fruits</Link>
          <Link to="/milk" className="category-card">🥛 Dairy Products</Link>
          <Link to="/nonveg" className="category-card">🍗 Non-Veg Items</Link>
          <Link to="/sproutes" className="category-card">🌱 Sprouts</Link>
        </div>
      </div>

      <div className="home-promo">
        <h3>Why BigBasket?</h3>
        <ul>
          <li>✅ Freshness Guaranteed</li>
          <li>✅ Quick & Safe Delivery</li>
          <li>✅ Best Prices in Town</li>
          <li>✅ Wide Variety of Products</li>
        </ul>
      </div>

      <footer className="home-footer">
        <p>Thank you for shopping with us. 💚 Happy Shopping!</p>
        <p style={{color:'darkgreen'}}>Official Partner ROYAL CHALLENGERS BANGLORE</p>
      </footer>
    </div>
  );
}

export default Home;
