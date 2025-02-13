const products = [
  {
    id: 1,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    image: "/src/assets/product-1.jpg"
  },
  // ... diğer 9 ürün için aynı yapı
];

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
          {[...Array(10)].map((_, index) => (
            <div key={index} className="group">
              {/* Ürün Resmi */}
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-200"></div>
              </div>

              {/* Ürün Bilgileri */}
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-1">Graphic Design</h3>
                <p className="text-sm text-gray-500 mb-2">English Department</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-500 line-through text-sm">$16.48</span>
                  <span className="text-blue-500 font-bold text-sm">$6.48</span>
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