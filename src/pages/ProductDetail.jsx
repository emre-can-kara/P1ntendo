import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Heart, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import BestsellerProducts from '../components/BestsellerProducts'
import BrandLogos from '../components/BrandLogos'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/shoppingCartActions'
import { toast } from 'react-toastify'

function ProductDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  // ShopPage'den gelen ürün verisini kullan
  const product = location.state?.productData || {
    id: 1,
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
      'https://images.unsplash.com/photo-1554568218-0f1715e72254',
      'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f'
    ]
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1))
    toast.success('Product added to cart!')
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Shop</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 relative">
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-lg cursor-pointer 
                    ${selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-75 hover:opacity-100'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">
              ${product.newPrice}
            </div>
            
            {/* Availability */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Availability :</span>
              <span className="text-blue-600">{product.availability}</span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Divider */}
            <hr className="my-6" />

            {/* Color Selection */}
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-transparent hover:ring-blue-500 focus:outline-none focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button className="p-3 border rounded-full hover:bg-gray-50">
                <Heart className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-3 border rounded-full hover:bg-gray-50">
                <Share2 className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b">
            <button className="px-8 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Description
            </button>
            <button className="px-8 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              Additional Information
            </button>
            <button className="px-8 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              Reviews (0)
            </button>
          </div>

          {/* Description Content */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Description Image - Sol taraf */}
              <div className="aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
                  alt="Interior design"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Description Text - Sağ taraf */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">the quick fox jumps over</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Met minim Mollie non desert Alamo est sit claque dolor do met sent. NELIT official consequent door ENIM NELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p className="text-gray-600">
                      Met minim Mollie non desert Alamo est sit claque dolor do met sent. NELIT official consequent door ENIM NELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p className="text-gray-600">
                      Met minim Mollie non desert Alamo est sit claque dolor do met sent. NELIT official consequent door ENIM NELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">the quick fox jumps over</h3>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">the quick fox jumps over</h3>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bestseller Products */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BestsellerProducts />
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

export default ProductDetail 