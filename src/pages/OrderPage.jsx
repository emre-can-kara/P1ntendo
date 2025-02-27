import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { 
  fetchAddresses, 
  fetchCards,
  setActiveStep,
  setSelectedCard,
  deleteAddress,
  deleteCard
} from '../store/actions/orderActions';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import { Trash2, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

function OrderPage() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isNewCard, setIsNewCard] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [deletingCard, setDeletingCard] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { 
    addresses, 
    cards,
    loading, 
    error,
    selectedAddress: storeSelectedAddress,
    selectedCard,
    activeStep 
  } = useSelector(state => state.order);
  const user = useSelector(state => state.client.user);

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }
    console.log('Fetching addresses and cards...');
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch, user, history]);

  useEffect(() => {
    console.log('Current cards:', cards);
  }, [cards]);

  const handleEditAddress = (address, e) => {
    e.stopPropagation(); // Prevent address selection when clicking edit
    setEditingAddress(address);
  };

  const handleDeleteClick = (address, e) => {
    e.stopPropagation(); // Prevent address selection
    setDeletingAddress(address);
  };

  const confirmDelete = async () => {
    if (deletingAddress) {
      await dispatch(deleteAddress(deletingAddress.id));
      if (selectedAddress?.id === deletingAddress.id) {
        setSelectedAddress(null);
      }
      setDeletingAddress(null);
    }
  };

  const handleStepClick = (step) => {
    if (step === 'payment' && !selectedAddress) {
      toast.error('Please select an address first');
      return;
    }
    dispatch(setActiveStep(step));
  };

  const handleEditCard = (card, e) => {
    e.stopPropagation(); // Prevent card selection
    setEditingCard(card);
  };

  const handleDeleteCard = (card, e) => {
    e.stopPropagation(); // Prevent card selection
    setDeletingCard(card);
  };

  const confirmDeleteCard = async () => {
    if (deletingCard) {
      await dispatch(deleteCard(deletingCard.id));
      if (selectedCard?.id === deletingCard.id) {
        dispatch(setSelectedCard(null));
      }
      setDeletingCard(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Steps */}
      <div className="flex mb-8">
        <button
          className={`flex-1 p-4 text-center border-b-2 ${
            activeStep === 'address' 
              ? 'border-blue-500 text-blue-500' 
              : 'border-gray-200'
          }`}
          onClick={() => handleStepClick('address')}
        >
          1. Delivery Address
        </button>
        <button
          className={`flex-1 p-4 text-center border-b-2 ${
            activeStep === 'payment' 
              ? 'border-blue-500 text-blue-500' 
              : 'border-gray-200'
          }`}
          onClick={() => handleStepClick('payment')}
        >
          2. Payment Method
        </button>
      </div>

      {/* Content */}
      {activeStep === 'address' ? (
        // Address Section
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Teslimat Adresi</h1>
            <button
              onClick={() => setIsNewAddress(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Yeni Adres Ekle
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map(address => (
                <div
                  key={address.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAddress?.id === address.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{address.title}</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <button
                        onClick={(e) => handleEditAddress(address, e)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(address, e)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{address.name}</p>
                  <p className="text-gray-600 text-sm mb-1">{address.phone}</p>
                  <p className="text-gray-600 text-sm">{address.address}</p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.district} {address.zipCode}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Payment Section
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Payment Method</h2>
            <button
              onClick={() => setIsNewCard(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Card
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCard?.id === card.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => dispatch(setSelectedCard(card))}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 mr-2 text-blue-500" />
                      <h3 className="font-medium">
                        **** **** **** {card.card_no.slice(-4)}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={selectedCard?.id === card.id}
                        onChange={() => dispatch(setSelectedCard(card))}
                        className="h-4 w-4 text-blue-600"
                      />
                      <button
                        onClick={(e) => handleEditCard(card, e)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDeleteCard(card, e)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{card.name_on_card}</p>
                  <p className="text-gray-600 text-sm">
                    Expires: {card.expire_month}/{card.expire_year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Forms and Modals */}
      {(isNewAddress || editingAddress) && (
        <AddressForm 
          onClose={() => {
            setIsNewAddress(false);
            setEditingAddress(null);
          }}
          editAddress={editingAddress}
        />
      )}

      {isNewCard && (
        <PaymentForm onClose={() => setIsNewCard(false)} />
      )}

      {deletingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Address</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this address?
              <br />
              <span className="font-medium">{deletingAddress.title}</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeletingAddress(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Card</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this card?
              <br />
              <span className="font-medium">**** **** **** {deletingCard.card_no.slice(-4)}</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeletingCard(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCard}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCard && (
        <PaymentForm 
          onClose={() => setEditingCard(null)} 
          editCard={editingCard}
        />
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        {activeStep === 'payment' && (
          <button
            onClick={() => dispatch(setActiveStep('address'))}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (activeStep === 'address') {
              if (selectedAddress) {
                dispatch(setActiveStep('payment'));
              } else {
                toast.error('Please select an address');
              }
            } else {
              if (selectedCard) {
                history.push('/order/confirmation');
              } else {
                toast.error('Please select a payment method');
              }
            }
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {activeStep === 'address' ? 'Continue to Payment' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default OrderPage; 