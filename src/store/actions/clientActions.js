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
    // First, make login request
    const response = await axiosInstance.post('/login', {
      email: credentials.email,
      password: credentials.password
    });

    console.log('Login response:', response.data);

    if (!response.data.token) {
      throw new Error('No token received from login');
    }

    const token = response.data.token;
    
    // Store token
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = token;

    // Now verify the token
    const verifyResponse = await axiosInstance.get('/verify');
    console.log('Verify response:', verifyResponse.data);

    // If verification successful, set user data
    dispatch(setUser({
      ...verifyResponse.data,
      token
    }));

    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error('Login/verify error:', error);
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    return { 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    };
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) return;

  try {
    // Set token in headers
    axiosInstance.defaults.headers.common['Authorization'] = token;

    // Verify token
    const verifyResponse = await axiosInstance.get('/verify');
    console.log('Verify response:', verifyResponse.data);

    if (verifyResponse.data.message === 'Not verified') {
      throw new Error('Token not verified');
    }

    // If verified, set user data
    dispatch(setUser({
      ...verifyResponse.data,
      token
    }));
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch(setUser(null));
  }
};

export const handleSignOut = () => (dispatch) => {
  // Clear everything on sign out
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  dispatch(setUser(null));
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    // Format the request data according to API expectations
    const requestData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role_id: parseInt(userData.role_id), // Make sure role_id is a number
      store: null // Initialize store as null
    };

    // If it's a store signup, add store data
    if (userData.store_name) {
      requestData.store = {
        name: userData.store_name,
        phone: userData.store_phone,
        tax_no: userData.tax_no,
        bank_account: userData.bank_account
      };
    }

    console.log('Signup request data:', requestData); // Debug log

    const response = await axiosInstance.post('/signup', requestData);
    console.log('Signup response:', response.data); // Debug log

    // Don't automatically log in after signup
    return {
      success: true,
      message: 'Signup successful! Please check your email to activate your account.'
    };

  } catch (error) {
    console.error('Signup error:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Signup failed'
    };
  }
}; 