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
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be', // Model in elegant dress
  'https://images.unsplash.com/photo-1483985988355-763728e1935b', // Model in shopping style
];

const products = bestsellerImages.map((image, index) => ({
  id: index + 1,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  newPrice: "$6.48",
  image: image
}));

function BestsellerProducts() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık Kısmı */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">Featured Products</p>
          <h2 className="text-2xl font-bold text-gray-900">BESTSELLER PRODUCTS</h2>
          <p className="text-sm text-gray-500 mt-2">Problems trying to resolve the conflict between</p>
        </div>

        {/* Ürün Grid'i */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Ürün Resmi */}
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Ürün Bilgileri */}
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-1">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.department}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                  <span className="text-blue-500 font-bold text-sm">{product.newPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Butonu */}
        <div className="text-center mt-12">
          <button className="border-2 border-blue-500 text-blue-500 px-8 py-2.5 rounded hover:bg-blue-50 transition-colors">
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </div>
  )
}

export default BestsellerProducts 