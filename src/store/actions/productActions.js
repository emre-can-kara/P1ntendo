import axiosInstance from "../../utils/axios";
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_FETCH_STATE,
  FETCH_STATES
} from '../reducers/productReducer';

// Basic action creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState
});

export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  
  if (categories.length > 0) return;

  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const response = await axiosInstance.get('/categories');
    console.log('Categories response:', response.data);

    dispatch(setCategories(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch({
      type: 'SET_CATEGORY_FETCH_ERROR',
      payload: error.response?.data?.message || error.message
    });
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

export const fetchCategoryProducts = (categoryId) => async (dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    // Get category code from the state
    const response = await axiosInstance.get(`/products?category=${categoryId}`);
    console.log('Category products response:', response.data);

    if (response.data) {
      const { total, products } = response.data;
      dispatch(setProductList(products));
      dispatch(setTotal(total));
    }

    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching category products:', error);
    dispatch({
      type: 'SET_CATEGORY_FETCH_ERROR',
      payload: error.response?.data?.message || error.message
    });
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const response = await axiosInstance.get('/products');
    console.log('Products response:', response.data);

    if (response.data) {
      const { total, products } = response.data;
      
      // Log the first product to see its structure
      if (products.length > 0) {
        console.log('Sample product structure:', {
          id: products[0].id,
          name: products[0].name,
          images: products[0].images,
          price: products[0].price
        });
      }

      dispatch(setProductList(products));
      dispatch(setTotal(total));
    }

    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch({
      type: 'SET_FETCH_ERROR',
      payload: error.response?.data?.message || error.message
    });
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
}; 