import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Grid, List } from 'lucide-react'
import BrandLogos from '../components/BrandLogos'

const products = [
  {
    id: 1,
    image: "/src/assets/product-1.jpg",
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    colors: ["blue", "green", "orange", "black"]
  },
  // Daha fazla ürün eklenebilir
]

const categories = [
  {
    id: 1,
    title: "CLOTHS",
    items: "5 Items",
    image: "/src/assets/shop-category-1.jpg",
    bgColor: "bg-gray-800"
  },
  {
    id: 2,
    title: "CLOTHS",
    items: "5 Items",
    image: "/src/assets/shop-category-2.jpg",
    bgColor: "bg-cyan-600"
  },
  {
    id: 3,
    title: "CLOTHS",
    items: "5 Items",
    image: "/src/assets/shop-category-3.jpg",
    bgColor: "bg-gray-100"
  },
  {
    id: 4,
    title: "CLOTHS",
    items: "5 Items",
    image: "/src/assets/shop-category-4.jpg",
    bgColor: "bg-pink-200"
  },
  {
    id: 5,
    title: "CLOTHS",
    items: "5 Items",
    image: "/src/assets/shop-category-5.jpg",
    bgColor: "bg-purple-200"
  }
]

function ShopPage() {
  const [viewType, setViewType] = useState('grid')
  const [sortBy, setSortBy] = useState('popularity')

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-400">Shop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map(category => (
            <div 
              key={category.id} 
              className={`relative overflow-hidden rounded-lg ${category.bgColor} group cursor-pointer`}
            >
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover aspect-[3/4] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm">{category.items}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500">Showing all 12 results</p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Views:</span>
              <button 
                onClick={() => setViewType('grid')}
                className={`p-2 ${viewType === 'grid' ? 'text-blue-500' : 'text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={`p-2 ${viewType === 'list' ? 'text-blue-500' : 'text-gray-400'}`}
              >
                <List size={20} />
              </button>
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-4 py-2 text-gray-500 focus:outline-none"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="group">
              <div className="relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-2">
                {product.department}
              </p>

              <div className="flex justify-center items-center space-x-2 mb-3">
                <span className="text-gray-400 line-through">{product.oldPrice}</span>
                <span className="text-blue-500 font-bold">{product.newPrice}</span>
              </div>

              <div className="flex justify-center space-x-1">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full bg-${color}-500`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Logos with full-width background */}
      <div className="w-full bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandLogos />
        </div>
      </div>
    </div>
  )
}

export default ShopPage 