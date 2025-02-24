import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { checkAuthStatus } from '../store/actions/clientActions';
import { loadCart } from '../store/actions/shoppingCartActions';

const protectedRoutes = [
  '/cart',
  '/checkout',
  '/profile',
  // Add other protected routes here
];

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(state => state.client.user);

  useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(loadCart()); // Load cart on app start
  }, [dispatch]);

  useEffect(() => {
    const isProtectedRoute = protectedRoutes.some(route => 
      location.pathname.startsWith(route)
    );

    if (isProtectedRoute && !user) {
      history.push('/login');
    }
  }, [location, user, history]);

  return children;
}

export default AuthProvider; 