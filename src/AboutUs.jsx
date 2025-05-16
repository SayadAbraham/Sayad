import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container" style={{ padding: '2rem', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#28a745', fontWeight: 'bold' }}>Why Choose BigBasket? 🛒</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        At <strong>BigBasket</strong>, we believe grocery shopping should be simple, affordable, and joyful. 
        Whether you're stocking up on daily essentials or planning for a weekend feast, we've got you covered!
      </p>

      <h3 style={{ marginTop: '2rem', color: '#155724' }}>✅ What Makes Us Different?</h3>
      <ul style={{ listStyle: 'square', marginLeft: '1.5rem', fontSize: '1.05rem' }}>
        <li><strong>Freshness Guaranteed:</strong> Direct-from-farm vegetables and fruits, delivered same-day.</li>
        <li><strong>Wide Range:</strong> From dairy, meats, snacks to organic products – all in one place.</li>
        <li><strong>Hyderabad Specials:</strong> We bring you local meats, spices & more at the best prices.</li>
        <li><strong>Affordable Pricing:</strong> Competitive prices and exciting discounts every day.</li>
        <li><strong>Quick Delivery:</strong> On-time delivery that fits your schedule.</li>
        <li><strong>Trust & Safety:</strong> Hygienic packaging and safe delivery practices.</li>
      </ul>

      <h3 style={{ marginTop: '2rem', color: '#155724' }}>💬 What Our Customers Say</h3>
      <blockquote style={{ fontStyle: 'italic', backgroundColor: '#e9f7ef', padding: '1rem', borderLeft: '4px solid #28a745', borderRadius: '5px' }}>
        “BigBasket has completely changed the way I shop. I get everything I need without stepping out — fresh and on time!” – A Happy Customer
      </blockquote>

      <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
        Thank you for choosing BigBasket. We’re here to serve you better, every day. 💚
      </p>
    </div>
  );
}

export default AboutUs;
