// Get initial cart from localStorage or use empty array
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  payment: null,
  address: null
};

// Action Types
export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';

// Helper function to update localStorage
const updateLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  let newCart;

  switch (action.type) {
    case SET_CART:
      updateLocalStorage(action.payload);
      return {
        ...state,
        cart: action.payload
      };

    case ADD_TO_CART: {
      const { product, count = 1 } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);

      if (existingItemIndex >= 0) {
        // Update count if product exists
        newCart = state.cart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, count: item.count + count }
            : item
        );
      } else {
        // Add new item if product doesn't exist
        newCart = [...state.cart, { product, count, checked: true }];
      }
      
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart
      };
    }

    case REMOVE_FROM_CART:
      newCart = state.cart.filter(item => item.product.id !== action.payload);
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart
      };

    case UPDATE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, count: action.payload.count }
          : item
      );
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    case TOGGLE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      updateLocalStorage(newCart);
      return {
        ...state,
        cart: newCart
      };

    default:
      return state;
  }
};

export default shoppingCartReducer; 