import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE
} from '../reducers/clientReducer';
import axiosInstance from "../../utils/axios";

// Basic action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

// Thunk action creator for fetching roles - only when needed
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length > 0) return;

  try {
    const response = await axiosInstance.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/login', credentials);

    if (credentials.rememberMe) {
      localStorage.setItem('token', response.data.token);
    }

    dispatch(setUser(response.data.user));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}; 