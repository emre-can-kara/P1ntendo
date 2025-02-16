import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ChevronRight, Grid, List } from 'lucide-react'
import BrandLogos from '../components/BrandLogos'

// Category images array
const categoryImages = [
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2', // Men's Fashion Category
  'https://images.unsplash.com/photo-1581044777550-4cfa60707c03', // Women's Fashion Category
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93', // Accessories Category
  'https://images.unsplash.com/photo-1445205170230-053b83016050', // Kids Fashion Category
  'https://images.unsplash.com/photo-1483985988355-763728e1935b', // Sportswear Category
]

const categories = [
  {
    id: 1,
    title: "CLOTHS",
    items: "5 Items",
    image: categoryImages[0],
    bgColor: "bg-gray-800"
  },
  {
    id: 2,
    title: "CLOTHS",
    items: "5 Items",
    image: categoryImages[1],
    bgColor: "bg-cyan-600"
  },
  {
    id: 3,
    title: "CLOTHS",
    items: "5 Items",
    image: categoryImages[2],
    bgColor: "bg-gray-100"
  },
  {
    id: 4,
    title: "CLOTHS",
    items: "5 Items",
    image: categoryImages[3],
    bgColor: "bg-pink-200"
  },
  {
    id: 5,
    title: "CLOTHS",
    items: "5 Items",
    image: categoryImages[4],
    bgColor: "bg-purple-200"
  }
]

// Product images array - updated with fashion model images
const productImages = [
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
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93', // Model in trendy outfit
  'https://images.unsplash.com/photo-1509631179647-0177331693ae', // Model in stylish wear
]

// Update products array to include images
const products = [
  {
    id: 1,
    image: productImages[0],
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "16.48",
    newPrice: "6.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#23856D"],
    rating: 4.5,
    reviews: 10,
    availability: "In Stock",
    description: "Met minim Mollie non desert Alamo est sit claque dolor do met sent. NELIT official consequent door ENIM NELIT Mollie. Excitation venial consequent sent nostrum met.",
    images: [productImages[0], productImages[1], productImages[2], productImages[3]]
  },
].concat(Array(11).fill(0).map((_, i) => ({
  id: i + 2,
  image: productImages[i + 1],
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "16.48",
  newPrice: "6.48",
  colors: ["#23A6F0", "#23856D", "#E77C40", "#23856D"],
  rating: 4.5,
  reviews: 10,
  availability: "In Stock",
  description: "Met minim Mollie non desert Alamo est sit claque dolor do met sent. NELIT official consequent door ENIM NELIT Mollie. Excitation venial consequent sent nostrum met.",
  images: [productImages[i + 1], productImages[(i + 2) % 12], productImages[(i + 3) % 12], productImages[(i + 4) % 12]]
})))

function ShopPage() {
  const [viewType, setViewType] = useState('grid')
  const [sortBy, setSortBy] = useState('popularity')
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)

  const handleProductClick = (product) => {
    history.push(`/product/${product.id}`, { productData: product })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    history.push(`/shop?page=${page}`)
  }

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
          <p className="text-gray-500">Showing all {products.length} results</p>
          
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
        <div className={`grid gap-8 ${
          viewType === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map(product => (
            <div 
              key={product.id} 
              className={`group cursor-pointer ${
                viewType === 'list' ? 'flex gap-8' : ''
              }`}
              onClick={() => handleProductClick(product)}
            >
              <div className={`relative ${viewType === 'list' ? 'w-1/3' : 'mb-4'}`}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg">
                  <div className="absolute bottom-4 left-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className={viewType === 'list' ? 'w-2/3 py-4' : ''}>
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

                <div className="flex justify-center space-x-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 mb-8">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              First
            </button>
            <button 
              onClick={() => handlePageChange(1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-blue-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              1
            </button>
            <button 
              onClick={() => handlePageChange(2)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 2 
                  ? 'bg-blue-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              2
            </button>
            <button 
              onClick={() => handlePageChange(3)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 3 
                  ? 'bg-blue-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              3
            </button>
            <button 
              onClick={() => handlePageChange(currentPage < 3 ? currentPage + 1 : 3)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="w-full bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandLogos />
        </div>
      </div>
    </div>
  )
}

export default ShopPage 