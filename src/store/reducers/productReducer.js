// Initial state
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED',
  selectedCategory: null,
  categoryFetchError: null,
  error: null,
  singleProduct: null,
  singleProductLoading: false,
  singleProductError: null
};

// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_CATEGORY_FETCH_ERROR = 'SET_CATEGORY_FETCH_ERROR';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
export const SET_SINGLE_PRODUCT_LOADING = 'SET_SINGLE_PRODUCT_LOADING';
export const SET_SINGLE_PRODUCT_ERROR = 'SET_SINGLE_PRODUCT_ERROR';

// Fetch States
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categoryFetchError: null
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    case SET_CATEGORY_FETCH_ERROR:
      return {
        ...state,
        categoryFetchError: action.payload
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
        error: null
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload,
        error: action.payload === FETCH_STATES.FETCHING ? null : state.error
      };
    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
        singleProductLoading: false,
        singleProductError: null
      };
    case SET_SINGLE_PRODUCT_LOADING:
      return {
        ...state,
        singleProductLoading: true,
        singleProductError: null
      };
    case SET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductError: action.payload,
        singleProductLoading: false
      };
    default:
      return state;
  }
};

export default productReducer; 