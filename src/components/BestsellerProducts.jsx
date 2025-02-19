import { useHistory } from '/node_modules/react-router-dom'

// Product images array for bestseller products
const bestsellerImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', // Model in white dress
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b', // Model in casual wear
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c', // Model in summer dress
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8', // Male model in casual
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e', // Model in winter wear
  'https://images.unsplash.com/photo-1517841905240-472988babdf9', // Model in street style
  'https://images.unsplash.com/photo-1495385794356-15371f348c31', // Model in denim
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b', // Model in fashion
];

// Mevcut bestseller ürünleri
export const bestsellerProducts = bestsellerImages.map((image, index) => ({
  id: `bestseller-${index + 1}`,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "16.48",
  newPrice: "6.48",
  colors: ["#23A6F0", "#23856D", "#E77C40", "#23856D"],
  rating: 4.5,
  reviews: 10,
  availability: "In Stock",
  description: "Met minim Mollie non desert Alamo est sit claque dolor do met sent...",
  images: [
    image,
    bestsellerImages[(index + 1) % bestsellerImages.length],
    bestsellerImages[(index + 2) % bestsellerImages.length],
    bestsellerImages[(index + 3) % bestsellerImages.length]
  ],
  image: image // Geriye dönük uyumluluk için
}));

function BestsellerProducts() {
  const history = useHistory()

  const handleProductClick = (product) => {
    // Önce sayfanın en üstüne git
    window.scrollTo(0, 0);
    // Sonra yönlendirme yap
    history.push(`/product/${product.id}`, { productData: product });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="mb-12 text-center">
          <p className="text-sm text-gray-500 mb-2">Featured Products</p>
          <h2 className="text-2xl font-bold text-gray-900">BESTSELLER PRODUCTS</h2>
          <p className="text-sm text-gray-500 mt-2">Problems trying to resolve the conflict between</p>
        </div>

        {/* Ürün Grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellerProducts.map(product => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative mb-4">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg">
                  <div className="absolute bottom-4 left-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-2">
                  {product.department}
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-gray-400 line-through">${product.oldPrice}</span>
                  <span className="text-blue-500 font-bold">${product.newPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More butonu */}
        <div className="text-center mt-12">
          <button 
            onClick={() => history.push('/shop')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </div>
  )
}

export default BestsellerProducts; 