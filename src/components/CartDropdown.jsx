import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';

function CartDropdown({ isOpen, onClose }) {
  const cart = useSelector(state => state.shoppingCart.cart);
  
  console.log('Cart items:', cart);

  const total = cart.reduce((sum, item) => 
    sum + (item.checked ? item.product.price * item.count : 0), 0
  );

  const getFirstImageUrl = (product) => {
    console.log('Product in cart:', product);
    
    if (!product.images || product.images.length === 0) {
      return 'https://placehold.co/400x400';
    }
    // If image is a string (direct URL)
    if (typeof product.images[0] === 'string') {
      return product.images[0];
    }
    // If image is an object with url property
    return product.images[0]?.url || 'https://placehold.co/400x400';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Shopping Cart ({cart.length})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          cart.map(item => (
            <div key={item.product.id} className="p-4 border-b flex items-center">
              <img 
                src={getFirstImageUrl(item.product)}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x400';
                  e.target.onerror = null;
                }}
              />
              <div className="ml-4 flex-1">
                <h4 className="font-medium text-sm">{item.product.name}</h4>
                <p className="text-gray-500 text-sm">Quantity: {item.count}</p>
                <p className="text-blue-600 font-semibold">
                  ${(item.product.price * item.count).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Link 
            to="/cart"
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
            onClick={onClose}
          >
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartDropdown; 