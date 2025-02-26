import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, deleteAddress } from '../store/actions/orderActions';
import AddressForm from '../components/AddressForm';
import { Trash2 } from 'lucide-react';

function OrderPage() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { addresses, loading, error } = useSelector(state => state.order);
  const user = useSelector(state => state.client.user);

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }
    dispatch(fetchAddresses());
  }, [dispatch, user, history]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {(isNewAddress || editingAddress) && (
        <AddressForm 
          onClose={() => {
            setIsNewAddress(false);
            setEditingAddress(null);
          }}
          editAddress={editingAddress}
        />
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

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => history.push('/order/payment')}
          disabled={!selectedAddress}
          className={`px-6 py-3 rounded-md ${
            selectedAddress
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Kaydet ve Devam Et
        </button>
      </div>
    </div>
  );
}

export default OrderPage; 