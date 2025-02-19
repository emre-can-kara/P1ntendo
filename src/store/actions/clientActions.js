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
    console.log('Login response:', response);

    // Always store token
    localStorage.setItem('token', response.data.token);

    // Create user data with all necessary fields
    const userData = {
      id: response.data.id,
      name: response.data.name,
      email: credentials.email,
      token: response.data.token,
      // Add any other user data from response
      ...response.data
    };

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Set user in Redux store
    dispatch(setUser(userData));

    return {
      success: true,
      message: 'Login successful!'
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Login failed'
    };
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const storedUserData = localStorage.getItem('userData');
  
  if (token && storedUserData) {
    try {
      // First try to use stored user data
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));

      // Then try to refresh user data from server
      const response = await axiosInstance.get('/user/me');
      const updatedUserData = {
        ...response.data,
        email: response.data.email || userData.email,
        token: token
      };

      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      dispatch(setUser(updatedUserData));
    } catch (error) {
      console.error('Auth check failed:', error);
      // Don't remove token on network errors
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        dispatch(setUser(null));
      }
    }
  }
};

export const handleSignOut = () => (dispatch) => {
  // Clear everything on sign out
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  dispatch(setUser(null));
}; 