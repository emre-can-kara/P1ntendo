const products = [
  {
    id: 1,
    title: "Top Product Of the Week",
    image: "/src/assets/product-1.jpg",
    size: "557 x 261"
  },
  {
    id: 2,
    title: "Top Product Of the Week",
    image: "/src/assets/product-2.jpg",
    size: "557 x 261"
  },
  {
    id: 3,
    title: "Top Product Of the Week",
    image: "/src/assets/product-3.jpg",
    size: "557 x 261"
  }
]

function ProductCards() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Sol büyük kart */}
          <div className="relative group overflow-hidden">
            <img 
              src={products[0].image}
              alt={products[0].title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-[200px] h-[120px] bg-blue-500/70 flex flex-col justify-center items-start px-6">
              <h3 className="text-lg font-bold mb-3 text-white">{products[0].title}</h3>
              <button className="border border-white text-white px-4 py-1.5 text-sm rounded bg-transparent hover:bg-white/10 transition-colors">
                EXPLORE ITEMS
              </button>
            </div>
          </div>

          {/* Sağ dikey kartlar */}
          <div className="space-y-8">
            {products.slice(1).map(product => (
              <div key={product.id} className="relative group overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[261px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-[200px] h-[120px] bg-blue-500/70 flex flex-col justify-center items-start px-6">
                  <h3 className="text-lg font-bold mb-3 text-white">{product.title}</h3>
                  <button className="border border-white text-white px-4 py-1.5 text-sm rounded bg-transparent hover:bg-white/10 transition-colors">
                    EXPLORE ITEMS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCards 