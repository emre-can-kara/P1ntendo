import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { clearCart } from '../store/actions/shoppingCartActions';

function OrderConfirmationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const { selectedAddress, selectedCard } = useSelector(state => state.order);
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Sepet toplamını hesapla
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.product.price * item.count);
  }, 0);
  
  useEffect(() => {
    // Eğer adres veya kart seçilmemişse, sipariş sayfasına yönlendir
    if (!selectedAddress || !selectedCard) {
      toast.error('Lütfen önce teslimat adresi ve ödeme yöntemini seçin');
      history.push('/order');
    }
  }, [selectedAddress, selectedCard, history]);
  
  // Sipariş verilerini hazırla
  const prepareOrderData = () => {
    // Ürünleri hazırla
    const products = cart.filter(item => item.checked).map(item => ({
      product_id: item.product.id,
      count: item.count,
      detail: `${item.product.color || 'Standart'} - ${item.product.size || 'Standart'}`
    }));
    
    // Şu anki tarihi ISO formatında al
    const orderDate = new Date().toISOString();
    
    return {
      address_id: selectedAddress.id,
      order_date: orderDate,
      card_no: selectedCard.card_no,
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: selectedCard.ccv || 123, // Eğer ccv yoksa varsayılan değer
      price: cartTotal,
      products: products
    };
  };
  
  // Siparişi gönder
  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);
      const orderData = prepareOrderData();
      
      console.log('Sipariş verileri:', orderData);
      
      // API'ye sipariş verilerini gönder
      const response = await axiosInstance.post('https://workintech-fe-ecommerce.onrender.com/order', orderData);
      
      console.log('Sipariş yanıtı:', response.data);
      
      // Başarılı sipariş
      toast.success('Siparişiniz başarıyla oluşturuldu!');
      
      // Sepeti temizle
      dispatch(clearCart());
      
      // Başarı durumunu güncelle ve rastgele bir sipariş numarası oluştur
      setOrderSuccess(true);
      setOrderNumber(Math.floor(Math.random() * 1000000) + 100000);
    } catch (error) {
      console.error('Sipariş oluşturulurken hata:', error);
      toast.error(error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Başarılı sipariş ekranı
  if (orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tebrikler!</h1>
          <p className="text-xl text-gray-600 mb-2">Siparişiniz başarıyla oluşturuldu.</p>
          <p className="text-lg text-gray-500 mb-6">Sipariş Numaranız: <span className="font-semibold">{orderNumber}</span></p>
          
          <p className="text-gray-600 mb-8">
            Siparişinizle ilgili detayları e-posta adresinize gönderdik. Siparişinizin durumunu hesabınızdan takip edebilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => history.push('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ana Sayfaya Dön
            </button>
            <button
              onClick={() => history.push('/shop')}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!selectedAddress || !selectedCard) {
    return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Sipariş Onayı</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Teslimat Adresi</h2>
        <div className="border-b pb-4 mb-4">
          <p className="font-medium">{selectedAddress.title}</p>
          <p>{selectedAddress.name}</p>
          <p>{selectedAddress.phone}</p>
          <p>{selectedAddress.address}</p>
          <p>{selectedAddress.city}, {selectedAddress.district} {selectedAddress.zipCode}</p>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
        <div className="border-b pb-4 mb-4">
          <p className="font-medium">Kart Numarası: **** **** **** {selectedCard.card_no.slice(-4)}</p>
          <p>Kart Sahibi: {selectedCard.name_on_card}</p>
          <p>Son Kullanma Tarihi: {selectedCard.expire_month}/{selectedCard.expire_year}</p>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
        <div className="border-b pb-4 mb-6">
          {cart.filter(item => item.checked).map(item => (
            <div key={item.product.id} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.product.color || 'Standart'} - {item.product.size || 'Standart'} | Adet: {item.count}
                  </p>
                </div>
              </div>
              <p className="font-medium">{(item.product.price * item.count).toFixed(2)} TL</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Toplam:</span>
          <span>{cartTotal.toFixed(2)} TL</span>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => history.push('/order')}
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Geri Dön
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sipariş Veriliyor...' : 'Siparişi Tamamla'}
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationPage; 