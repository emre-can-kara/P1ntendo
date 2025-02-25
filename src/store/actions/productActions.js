import axiosInstance from "../../utils/axios";
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_FETCH_STATE,
  FETCH_STATES,
  SET_SINGLE_PRODUCT,
  SET_SINGLE_PRODUCT_LOADING,
  SET_SINGLE_PRODUCT_ERROR
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
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const response = await axiosInstance.get('/categories');
    console.log('Categories API Response:', response.data);

    dispatch(setCategories(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchProducts = (queryString = '') => async (dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const url = queryString ? `/products?${queryString}` : '/products?limit=25';
    console.log('Fetching URL:', url);
    
    const response = await axiosInstance.get(url);
    console.log('API Response:', {
      url,
      data: response.data,
      total: response.data.total,
      productsCount: response.data.products?.length
    });
    
    if (response.data) {
      const { total, products } = response.data;
      dispatch(setProductList(products));
      dispatch(setTotal(total));
    }

    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching products:', {
      error,
      url: error.config?.url,
      message: error.message
    });
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: SET_SINGLE_PRODUCT_LOADING });
    
    const response = await axiosInstance.get(`/products/${productId}`);
    
    dispatch({
      type: SET_SINGLE_PRODUCT,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    dispatch({
      type: SET_SINGLE_PRODUCT_ERROR,
      payload: error.message
    });
  }
}; 