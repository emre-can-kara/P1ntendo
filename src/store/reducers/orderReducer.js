const initialState = {
  addresses: [],
  loading: false,
  error: null,
  selectedAddress: null
};

export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_ADDRESSES_LOADING = 'SET_ADDRESSES_LOADING';
export const SET_ADDRESSES_ERROR = 'SET_ADDRESSES_ERROR';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
        loading: false,
        error: null
      };

    case SET_ADDRESSES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SET_ADDRESSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload
      };

    default:
      return state;
  }
};

export default orderReducer; 