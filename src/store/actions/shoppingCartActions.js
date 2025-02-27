import axiosInstance from "../../utils/axios";
import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  SET_PAYMENT,
  SET_ADDRESS
} from '../reducers/shoppingCartReducer';

// Basic action creators
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

// Helper action creators for cart operations
export const addToCart = (product, count = 1) => ({
  type: ADD_TO_CART,
  payload: { product, count }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

// Sepeti temizle
export const clearCart = () => ({
  type: SET_CART,
  payload: []
});

// Thunk action creator for fetching roles - only when needed
export const fetchRoles = () => async (dispatch, getState) => {
  // Check if roles are already in store
  const { roles } = getState().client;
  if (roles.length > 0) return;

  try {
    const response = await fetch('/api/roles');
    const data = await response.json();
    dispatch(setRoles(data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Load cart from localStorage
export const loadCart = () => (dispatch) => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    dispatch(setCart(JSON.parse(savedCart)));
  }
};

// Add fetchProductById action
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    
    if (response.data) {
      // Add the fetched product directly to cart state or handle it in your reducer
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}; 