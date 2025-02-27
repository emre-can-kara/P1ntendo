import axiosInstance from "../../utils/axios";
import {
  SET_ADDRESSES,
  SET_ADDRESSES_LOADING,
  SET_ADDRESSES_ERROR,
  SET_CARDS,
  SET_CARDS_LOADING,
  SET_CARDS_ERROR,
  SET_SELECTED_CARD,
  SET_ACTIVE_STEP
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

export const fetchCards = () => async (dispatch) => {
  try {
    dispatch({ type: SET_CARDS_LOADING });
    
    console.log('Fetching cards from API...');
    const response = await axiosInstance.get('/user/card');
    console.log('Cards API response:', response.data);
    
    dispatch({
      type: SET_CARDS,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    dispatch({
      type: SET_CARDS_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch cards'
    });
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    await axiosInstance.post('/user/card', cardData);
    toast.success('Card added successfully');
    dispatch(fetchCards()); // Refresh cards list
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add card');
    throw error;
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/card/${cardId}`);
    toast.success('Card deleted successfully');
    dispatch(fetchCards()); // Refresh the cards list
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete card');
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    await axiosInstance.put('/user/card', {
      id: cardData.id,
      card_no: cardData.card_no,
      expire_month: cardData.expire_month,
      expire_year: cardData.expire_year,
      name_on_card: cardData.name_on_card
    });
    toast.success('Kart başarıyla güncellendi');
    dispatch(fetchCards()); // Kartları yenile
  } catch (error) {
    toast.error(error.response?.data?.message || 'Kart güncellenirken bir hata oluştu');
    throw error;
  }
};

export const setActiveStep = (step) => ({
  type: SET_ACTIVE_STEP,
  payload: step
});

export const setSelectedCard = (card) => ({
  type: SET_SELECTED_CARD,
  payload: card
}); 