import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItem } from '../store/actions/shoppingCartActions';
import { Trash2, Plus, Minus } from 'lucide-react';

function CartPage() {
  const cart = useSelector(state => state.shoppingCart.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, currentCount, increment) => {
    const newCount = increment ? currentCount + 1 : currentCount - 1;
    if (newCount > 0) {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.product.newPrice) * item.count), 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map(item => (
            <div key={item.product.id} className="flex items-center border-b py-4">
              <img 
                src={item.product.image} 
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.product.title}</h3>
                <p className="text-gray-500">{item.product.department}</p>
                <p className="text-blue-600 font-bold">${item.product.newPrice}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleUpdateQuantity(item.product.id, item.count, false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.count}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item.product.id, item.count, true)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => handleRemoveItem(item.product.id)}
                className="ml-4 p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 