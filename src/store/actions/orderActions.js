import axiosInstance from "../../utils/axios";
import {
  SET_ADDRESSES,
  SET_ADDRESSES_LOADING,
  SET_ADDRESSES_ERROR,
} from '../reducers/orderReducer';
import { toast } from 'react-toastify';

export const fetchAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: SET_ADDRESSES_LOADING });
    
    const response = await axiosInstance.get('/user/address');
    
    dispatch({
      type: SET_ADDRESSES,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    dispatch({
      type: SET_ADDRESSES_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch addresses'
    });
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/address/${addressId}`);
    toast.success('Address deleted successfully');
    dispatch(fetchAddresses()); // Refresh the address list
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete address');
  }
}; 