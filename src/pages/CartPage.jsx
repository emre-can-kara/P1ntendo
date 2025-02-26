import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { removeFromCart, updateCartItem } from '../store/actions/shoppingCartActions';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'react-toastify';

function CartPage() {
  const cart = useSelector(state => state.shoppingCart.cart);
  const user = useSelector(state => state.client.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('Cart in CartPage:', cart); // Debug log

  const getFirstImageUrl = (product) => {
    if (!product.images || product.images.length === 0) {
      return 'https://placehold.co/400x400';
    }
    if (typeof product.images[0] === 'string') {
      return product.images[0];
    }
    return product.images[0]?.url || 'https://placehold.co/400x400';
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, currentCount, increment) => {
    const newCount = increment ? currentCount + 1 : currentCount - 1;
    if (newCount > 0) {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => 
      total + (item.checked ? item.product.price * item.count : 0), 0
    );
  };

  const calculateShipping = (subtotal) => {
    if (subtotal >= 100) return 0; // Free shipping over $100
    return 10; // Standard shipping fee
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal >= 200) return subtotal * 0.1; // 10% off over $200
    if (subtotal >= 150) return subtotal * 0.05; // 5% off over $150
    return 0;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal);
  const grandTotal = subtotal + shipping - discount;

  const handleCheckout = () => {
    if (!user) {
      // If user is not logged in, redirect to login
      history.push('/login');
      toast.info('Please login to proceed with checkout');
    } else {
      // If user is logged in, proceed to order page
      history.push('/order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link 
            to="/shop" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex items-center bg-white p-4 rounded-lg shadow">
              <img 
                src={getFirstImageUrl(item.product)}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x400';
                  e.target.onerror = null;
                }}
              />
              
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium">{item.product.name}</h3>
                <p className="text-gray-500">${Number(item.product.price).toFixed(2)}</p>
                
                <div className="flex items-center mt-2">
                  <button 
                    onClick={() => handleUpdateQuantity(item.product.id, item.count, false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-4">{item.count}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item.product.id, item.count, true)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="ml-6">
                <p className="text-lg font-bold">
                  ${(item.product.price * item.count).toFixed(2)}
                </p>
                <button 
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Updated Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart.reduce((total, item) => total + item.count, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center">
                Shipping
                {subtotal >= 100 && (
                  <span className="ml-2 text-xs text-green-600">
                    (Free shipping on orders over $100)
                  </span>
                )}
              </span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            {/* Savings Alert */}
            {discount > 0 && (
              <div className="bg-green-50 text-green-700 text-sm p-2 rounded">
                You saved ${discount.toFixed(2)} on this order!
              </div>
            )}

            {/* Next Tier Alert */}
            {subtotal < 100 && (
              <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded">
                Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
              </div>
            )}
            {subtotal >= 100 && subtotal < 150 && (
              <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded">
                Add ${(150 - subtotal).toFixed(2)} more to get 5% off!
              </div>
            )}
            {subtotal >= 150 && subtotal < 200 && (
              <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded">
                Add ${(200 - subtotal).toFixed(2)} more to get 10% off!
              </div>
            )}

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Grand Total */}
            <div className="flex justify-between font-bold text-lg">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {/* Savings Summary */}
            {(discount > 0 || shipping === 0) && (
              <div className="text-sm text-green-600 mt-2">
                Total Savings: ${(discount + (subtotal >= 100 ? 10 : 0)).toFixed(2)}
              </div>
            )}
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout (${grandTotal.toFixed(2)})
          </button>

          {/* Continue Shopping Link */}
          <Link 
            to="/shop"
            className="block text-center text-blue-600 hover:text-blue-700 mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 