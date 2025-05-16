// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem('cart');
const parsedCart = savedCart ? JSON.parse(savedCart) : [];

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 30, image: '/images/tomato.jpg' },
      { name: 'Potato', price: 20, image: '/images/potato.jpg' },
      { name: 'Carrot', price: 40, image: '/images/carrot.jpg' },
      { name: 'Broccoli', price: 30, image: '/images/broccoli.jpg' },
      { name: 'Cabagge', price: 20, image: '/images/cabbage.jpg' },
      { name: 'Cauliflower', price: 40, image: '/images/cauliflower.jpg' },
      { name: 'Onion', price: 30, image: '/images/onion.jpg' },
      { name: 'Spinach', price: 20, image: '/images/spinach.jpg' },
      { name: 'Peas', price: 40, image: '/images/peas.jpg' },
      { name: 'Capsicum', price: 30, image: '/images/capsicum.jpg' },
    ],
    nonveg: [
      { name: 'Chicken Drumsticks', price: 150, image: '/images/chickendrumstick.jpg' },
      { name: 'Chicken Wings', price: 120, image: '/images/chickenwings.jpg' },
      { name: 'Mutton Curry Cut', price: 250, image: '/images/muttoncurrycut.jpg' },
      { name: 'Beef Mince', price: 180, image: '/images/beefmince.jpg' },
      { name: 'Pork Shoulder', price: 200, image: '/images/porkshoulder.jpg' },
      { name: 'Fish Curry Cut', price: 220, image: '/images/fishcurrycut.jpg' },
      { name: 'Chicken Thighs', price: 300, image: '/images/chickenthighs.jpg' },
      { name: 'Mutton Liver', price: 100, image: '/images/muttonliver.jpg' },
      { name: 'Goat Meat (Mutton)', price: 130, image: '/images/goatmutton.jpg' },
      { name: 'Chicken Gizzards', price: 80, image: '/images/chickengizzards.jpg' },
    ],
    MilkProducts: [
      { name: 'Milk', price: 45, image: '/images/milk.jpg' },
      { name: 'Cheese', price: 210, image: '/images/cheese.jpg' },
      { name: 'Yogurt', price: 55, image: '/images/yogurt.jpg' },
      { name: 'Butter', price: 130, image: '/images/butter.jpg' },
      { name: 'Cream', price: 90, image: '/images/cream.jpg' },
      { name: 'Paneer', price: 160, image: '/images/paneer.jpg' },
      { name: 'Ghee', price: 320, image: '/images/ghee.jpg' },
      { name: 'Milk Powder', price: 100, image: '/images/milkpowder.jpg' },
      { name: 'Condensed Milk', price: 120, image: '/images/condensed.jpg' },
      { name: 'Ice Cream', price: 80, image: '/images/icecream.jpg' },
    ],
    Vegetables: [
      { name: 'Tomato', price: 30, image: '' },
      { name: 'Potato', price: 20, image: '' },
      { name: 'Carrot', price: 40, image: '' },
      { name: 'Broccoli', price: 25, image: '' },
      { name: 'Spinach', price: 35, image: '' },
      { name: 'Bell Pepper', price: 50, image: '' },
      { name: 'Onion', price: 28, image: '' },
      { name: 'Cucumber', price: 15, image: '' },
      { name: 'Zucchini', price: 45, image: '' },
      { name: 'Eggplant', price: 55, image: '' },
    ],
    Sprouts: [
      { name: 'Alfalfa Sprouts', price: 60, image: '' },
      { name: 'Mung Bean Sprouts', price: 40, image: '' },
      { name: 'Broccoli Sprouts', price: 75, image: '' },
      { name: 'Lentil Sprouts', price: 50, image: '' },
      { name: 'Radish Sprouts', price: 55, image: '' },
      { name: 'Soybean Sprouts', price: 45, image: '' },
      { name: 'Wheatgrass Sprouts', price: 80, image: '' },
      { name: 'Chickpea Sprouts', price: 65, image: '' },
      { name: 'Pea Sprouts', price: 70, image: '' },
      { name: 'Sunflower Sprouts', price: 90, image: '' },
    ],
    Fruits: [
      { name: 'Apple', price: 120, image: '/images/apple.jpg' },
      { name: 'Banana', price: 40, image: '/images/banana.jpg' },
      { name: 'Orange', price: 60, image: '/images/orange.jpg' },
      { name: 'Grapes', price: 90, image: '/images/grapes.jpg' },
      { name: 'Mango', price: 150, image: '/images/mango.jpg' },
      { name: 'Papaya', price: 50, image: '/images/papaya.jpg' },
      { name: 'Pineapple', price: 80, image: '/images/pineapple.jpg' },
      { name: 'Strawberry', price: 200, image: '/images/strawberry.jpg' },
      { name: 'Watermelon', price: 70, image: '/images/watermelon.jpg' },
      { name: 'Pomegranate', price: 110, image: '/images/pomegranate.jpg' },
    ],
    millets: [
      { name: 'Foxtail Millet', price: 60, image: '/images/foxtail.jpg' },
      { name: 'Barnyard Millet', price: 55, image: '/images/barnyard.jpg' },
      { name: 'Kodo Millet', price: 50, image: '/images/kodo.jpg' },
      { name: 'Little Millet', price: 45, image: '/images/little.jpg' },
      { name: 'Pearl Millet', price: 40, image: '/images/pearl.jpg' },
      { name: 'Finger Millet', price: 50, image: '/images/finger.jpg' },
      { name: 'Proso Millet', price: 55, image: '/images/proso.jpg' },
      { name: 'Sorghum (Jowar)', price: 35, image: '/images/jowar.jpg' },
      { name: 'Brown Top Millet', price: 60, image: '/images/browntop.jpg' },
      { name: 'Teff', price: 70, image: '/images/teff.jpg' },
    ],
  },
  reducers: {},
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: parsedCart,
  reducers: {
    AddToCart: (state, action) => {
      const item = state.find((i) => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    IncCart: (state, action) => {
      const item = state.find((i) => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    DecCart: (state, action) => {
      const item = state.find((i) => i.name === action.payload.name);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    RemoveItem: (state, action) => {
      return state.filter((item) => item.name !== action.payload.name);
    },
    clearCart: () => [],
  },
});

// Orders slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    orderDetails: (state, action) => {
      state.push(action.payload);
    },
  },
});

// ✅ ONLY ONE userSlice definition
const userSlice = createSlice({
  name: 'users',
  initialState: { 
    user: [],
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
      let userFound = state.user.find(user => user.name === action.payload.name);
      if (userFound) {
        state.isAuthenticated = true;
        state.currentUser = userFound;
      } else {
        alert("Invalid Credentials");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    registerUser: (state, action) => {
      state.user.push(action.payload);
    },
  },
});

// ✅ Configure store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    users: userSlice.reducer,
  },
});

// ✅ Persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

// ✅ Export actions
export const { AddToCart, IncCart, DecCart, RemoveItem, clearCart } = cartSlice.actions;
export const { orderDetails } = orderSlice.actions;
export const { registerUser, loginUser, logout } = userSlice.actions;

export default store;
