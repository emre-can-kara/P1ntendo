import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import orderReducer from './orderReducer';

// Başlangıçta boş bir reducer ile başlayalım
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  order: orderReducer
});

export default rootReducer; 