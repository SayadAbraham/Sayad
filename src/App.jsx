// src/App.jsx
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Store'; // ✅ Import Redux store and logOut action

// Pages/Components
import Veg from './Veg';
import NonVeg from './NonVeg';
import Home from './Home';
import MilkProducts from './MilkProducts';
import './Basket.css';
import './App.css';
import './AboutUs.css'
import CartComponent from './cartComponent';
import Order from './Order';
import './Order.css';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import PageNotFound from './PageNotFound';
import Fruits from './Fruits';
import SignIn from './SignIn';
import SignUp from './SignUp';
//import SignUp from './SignUp';

// ✅ Move header into its own component so useSelector is called correctly
function HeaderWithCart() {
  let cartItems = useSelector((state) => state.cart);
  let cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className="bb-header">
      <div className="logo">
        big<span>basket</span>
      </div>
      <nav className="bb-nav">
        <Link to="/Home" className="nav">🏠Home</Link>
        <Link to="/veg" className="nav">🌿Veg</Link>
        <Link to="/nonveg" className="nav">🍗NonVeg</Link>
        <Link to="/fruits" className="nav">🍉Fruits</Link>
        <Link to="/milk" className="nav">🍫Milk</Link>
        <Link to="/cart" className="nav">Cart <span style={{ color: 'slateblue' }}>{cartCount}</span></Link>
        <Link to="/order" className="nav">Orders</Link>
        <Link to="/aboutUs" className="nav">AboutUs</Link>
        <Link to="/contactUs" className="nav">📞Contact Us</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/SignIn" className="nav">SignIn</Link>
            
          </>
        ) : (
          <>
            <span className="nav">👤 {currentUser?.name || currentUser?.username}</span>
            <button className="nav" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

// ✅ AppContent keeps the router & routes
function AppContent() {
  return (
    <BrowserRouter>
      <HeaderWithCart />
      <div className="page">
        <Routes>
          <Route path="/Home" element={<Home/>} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/fruits" element={<Fruits/>} />
          <Route path="/milk" element={<MilkProducts />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/order" element={<Order />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// ✅ Top-level App wraps everything with Redux provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
