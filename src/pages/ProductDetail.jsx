import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Heart, Share2, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import BestsellerProducts from '../components/BestsellerProducts'
import BrandLogos from '../components/BrandLogos'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/actions/shoppingCartActions'
import { fetchProducts, fetchSingleProduct } from '../store/actions/productActions'
import { toast } from 'react-toastify'

function ProductDetail({ match, history }) {
  const { productId } = match.params;
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { 
    singleProduct: product, 
    singleProductLoading: loading,
    singleProductError: error 
  } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Error loading product</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show loading if no product yet
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    
    dispatch(addToCart(product, quantity));
    toast.success('Product added to cart!');
  };

  return (
    <div className="bg-white">
      {/* Back Button - Add this at the top */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => history.goBack()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Shop
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 relative">
              <img 
                src={product.images[selectedImage].url} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-lg cursor-pointer 
                    ${selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-75 hover:opacity-100'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600">({product.rating?.toFixed(1)})</span>
            </div>

            <div className="text-2xl font-bold text-gray-900">
              ${Number(product.price).toFixed(2)}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Stock:</span>
              <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Quantity Selection */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button 
                  onClick={() => quantity < product.stock && setQuantity(q => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-6 rounded ${
                  product.stock > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
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