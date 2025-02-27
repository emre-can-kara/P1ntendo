const initialState = {
  addresses: [],
  cards: [],
  loading: false,
  error: null,
  selectedAddress: null,
  selectedCard: null,
  activeStep: 'address'
};

export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_ADDRESSES_LOADING = 'SET_ADDRESSES_LOADING';
export const SET_ADDRESSES_ERROR = 'SET_ADDRESSES_ERROR';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_CARDS = 'SET_CARDS';
export const SET_CARDS_LOADING = 'SET_CARDS_LOADING';
export const SET_CARDS_ERROR = 'SET_CARDS_ERROR';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';

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

    case SET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
        error: null
      };

    case SET_CARDS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SET_CARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload
      };

    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload
      };

    default:
      return state;
  }
};

export default orderReducer; 