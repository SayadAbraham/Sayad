import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncCart, DecCart, RemoveItem, clearCart,orderDetails } from './Store'
import './Basket.css';
import emailjs from 'emailjs-com'
import { Navigate, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Alert } from 'bootstrap';

function CartComponent() {
  const cartObjects = useSelector(globalState => globalState.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ add this line

  const [discount, setDiscount] = useState(0);
  const [couponDiscountPercentage, SetCouponCodeDiscountPercentage] = useState(0);
  const [couponCodeName, SetCouponCodeName] = useState('');
  const [customerEmail,setCustomerEmail]=useState('');
  const emailRef=useRef();
  const couponCodeRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!cartObjects || cartObjects.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const CalculatingAmount = () => {
    const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
    const effectiveDiscount = Math.max(discount, couponDiscountPercentage);
    const discountAmount = (totalPrice * effectiveDiscount) / 100;
    const priceAfterDiscount = totalPrice - discountAmount;
    const taxPrice = (priceAfterDiscount * 5) / 100;
    const finalPrice = priceAfterDiscount + taxPrice;
    let couponDiscount = (totalPrice*couponDiscountPercentage)/100;
    return {
      totalPrice,
      discountAmount,
      priceAfterDiscount,
      taxPrice,
      finalPrice,
      couponDiscount,
      appliedDiscount: effectiveDiscount
    };
  };

  const { totalPrice, discountAmount, priceAfterDiscount, taxPrice, finalPrice,couponDiscount, appliedDiscount } = CalculatingAmount();

  const handlingCouponPercentage = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    SetCouponCodeName(couponCode);

    switch (couponCode) {
      case 'ABRAHAM10':
        SetCouponCodeDiscountPercentage(10);
        break;
      case 'ABRAHAM20':
        SetCouponCodeDiscountPercentage(20);
        break;
      case 'ABRAHAM30':
        SetCouponCodeDiscountPercentage(30);
        break;
      default:
        alert('Invalid coupon code');
        SetCouponCodeDiscountPercentage(0);
    }
  };

  const handleCompletePurchase = () => {
    const orderId = Math.floor(1000000 + Math.random() * 900000);
    const purchaseDate = new Date().toLocaleString();
    const purchaseDetails = {
      id: orderId,
      date: purchaseDate,
      items: [...cartObjects],
      finalPrice: finalPrice
    };
  
    dispatch(clearCart());
    dispatch(orderDetails(purchaseDetails));
    alert("Purchase Completed Successfully");
    setTimeout(() => {
      navigate("/orders"); // ✅ FIXED LINE
    }, 2000);
    const shipping=50;
  const templateParams = {
    order_id: orderId,
    orders: cartObjects.map(item => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
      image:item.image
    })),
    cost: {
      shipping: shipping,
      priceAfterDiscount:discountAmount.toFixed(2),
      couponDiscount:couponDiscount.toFixed(2),
      tax: taxPrice.toFixed(2),
      total: (shipping+finalPrice).toFixed(2)
    },
    email:customerEmail
  };

  emailjs.send('service_fw2kqhq', 'template_dpsbgv4', templateParams, 'MdfalU19beNH6ReJz')
    .then(() => {
      alert('✅ Email sent successfully!');
    })
    .catch((error) => {
      alert('❌ Email sending failed: ' + error.text);
    });

  };

  
  const handleCartPayment = (e) =>{
    e.preventDefault();
    //implement your actuall card payment processing logic here
    alert("Payment successful via Card!"); // Placeholder
    handleCompletePurchase();
  
  }

  return (
    <div>
      <h2>🛒 Cart Items</h2>
      
      
      
      <ul>
        {cartObjects.map((item, index) => (
          <li key={index} className='cart-item'>
            <div className='card-details'>
              <p><strong>{item.name}</strong></p>
              <label><p style={{ color: 'red' }}>Price: ₹{item.price.toFixed(2)}</p></label>
              <label><p style={{ color: 'blue' }}>Quantity: {item.quantity}</p></label>
            </div>

            <div style={{ padding: '2px', textAlign: 'left' }}>
              <div style={{ textAlign: 'right', padding: '2px' }}>
                {item.name} - Price: ₹{item.price} - Quantity: {item.quantity}
                <button onClick={() => dispatch(IncCart(item))} style={{ color: 'green' }}>+</button>
                <button onClick={() => dispatch(DecCart(item))} style={{ color: 'red' }}>-</button>
                <button onClick={() => dispatch(RemoveItem(item))} style={{ color: 'blue' }}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
        <button onClick={() => setDiscount(10)} style={{ backgroundColor: '#ff704d', color: '#fff', border: 'none', borderRadius: '8px' }}>
          Discount 10%
        </button>
        <button onClick={() => setDiscount(20)} style={{ backgroundColor: '#4caf50', padding: '6px 14px', border: 'none', borderRadius: '8px' }}>
          Discount 20%
        </button>
        <button onClick={() => setDiscount(30)} style={{ backgroundColor: '#2196f3', color: '#fff', border: 'none', borderRadius: '8px' }}>
          Discount 30%
        </button>
      </div>

      <div style={{ fontSize: '20px', padding: '15px', textAlign: 'center' }}>
        <input type='text' ref={couponCodeRef} placeholder='Enter Coupon Code' />
        <button
          onClick={handlingCouponPercentage}
          className="apply-coupon-btn"
          style={{ marginLeft: '10px', padding: '6px 12px', backgroundColor: 'orange', border: 'none', borderRadius: '6px' }}
        >
          Apply Coupon
        </button>

        <div className="card-details">
          <h5 className="mb-3">🧾 Billing Summary</h5>
          <div className="text-start">
            <div className="mb-1">Total Price: ₹{totalPrice.toFixed(2)}</div>
            <div className="mb-1">Discount ({appliedDiscount}%): ₹{discountAmount.toFixed(2)}</div>
            <div className="mb-1">Price After Discount: ₹{priceAfterDiscount.toFixed(2)}</div>
            <div className="mb-1">Tax (5%): ₹{taxPrice.toFixed(2)}</div>
            <div className="mb-2">Final Price: ₹{finalPrice.toFixed(2)}</div>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button onClick={() => setPaymentMethod('qr')} className="btn btn-outline-primary">QR Code</button>
            <button onClick={() => setPaymentMethod('card')} className="btn btn-outline-primary">Card</button>
          </div>
          <div className='mb-3'>
            <label className='form-label'>
              Enter Your Gmail to Recieve Order Confirmation
            </label>
            <input type='email' ref={emailRef}
            onChange={(e=>setCustomerEmail(e.target.value))}
            className='form-control'
            placeholder='you@example.com'/>
          </div>

          {paymentMethod === 'qr' && (
            <div className="d-flex flex-column align-items-center mt-4 p-4" style={{ backgroundColor: '#E6E6FA' }}>
              <h5>Scan this UPI QR to pay ₹{finalPrice.toFixed(2)}</h5>
              <QRCode value={`upi://pay?pa=9347827934@ybl&pn=SAYADABRAHAM&am=${finalPrice.toFixed(2)}&cu=INR`} />
              <p>UPI ID: merchant@upi</p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="mt-4">
              <h5>Enter Card Details</h5>

              <div className="mb-3">
                <label className="form-label">Cardholder Name:</label>
                <input type="text" placeholder="Name on Card" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Card Number:</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Expiry Date:</label>
                <input type="text" placeholder="MM/YY" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">CVV:</label>
                <input type="password" placeholder="123" maxLength={4} className="form-control" />
              </div>
            </div>
          )}

          <p>Total to be charged: ₹{finalPrice.toFixed(2)}</p>
          <button onClick={handleCompletePurchase} className="complete-purchase-btn mt-2">
            ✅ Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartComponent;
