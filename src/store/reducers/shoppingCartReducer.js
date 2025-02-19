// Initial state
const initialState = {
  cart: [], // [{count: 1, product: {id: "1235", ...}}, ...]
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

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case ADD_TO_CART: {
      const { product, count = 1 } = action.payload;
      const existingItem = state.cart.find(item => item.product.id === product.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, count: item.count + count }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product, count }]
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        )
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
    default:
      return state;
  }
};

export default shoppingCartReducer; 