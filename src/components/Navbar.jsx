import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { 
  Home, 
  ShoppingBag, 
  Search, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X 
} from 'lucide-react'
import { useSelector } from 'react-redux'
import Gravatar from 'react-gravatar'

function Navbar({ location }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const user = useSelector(state => state.client.user)
  const cart = useSelector(state => state.shoppingCart.cart)
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-black text-gray-800">P1NTENDO</span>
          </Link>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-[#3B82F6] hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
            <button className="text-[#3B82F6] hover:text-blue-600 relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <div className="relative group">
              <Link 
                to="/shop"
                className={`text-gray-600 hover:text-gray-900 flex items-center space-x-1 ${
                  isActive('/shop') && 'text-blue-600'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Shop</span>
              </Link>
              
              <div className="absolute left-0 mt-2 w-[400px] bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="grid grid-cols-2 gap-16 p-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Kadın</h3>
                    <div className="space-y-3">
                      <Link to="/kadin/bags" className="block text-gray-500 hover:text-gray-900">Bags</Link>
                      <Link to="/kadin/belts" className="block text-gray-500 hover:text-gray-900">Belts</Link>
                      <Link to="/kadin/cosmetics" className="block text-gray-500 hover:text-gray-900">Cosmetics</Link>
                      <Link to="/kadin/bags-2" className="block text-gray-500 hover:text-gray-900">Bags</Link>
                      <Link to="/kadin/hats" className="block text-gray-500 hover:text-gray-900">Hats</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Erkek</h3>
                    <div className="space-y-3">
                      <Link to="/erkek/bags" className="block text-gray-500 hover:text-gray-900">Bags</Link>
                      <Link to="/erkek/belts" className="block text-gray-500 hover:text-gray-900">Belts</Link>
                      <Link to="/erkek/cosmetics" className="block text-gray-500 hover:text-gray-900">Cosmetics</Link>
                      <Link to="/erkek/bags-2" className="block text-gray-500 hover:text-gray-900">Bags</Link>
                      <Link to="/erkek/hats" className="block text-gray-500 hover:text-gray-900">Hats</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/about" className={`text-gray-600 hover:text-gray-900 ${isActive('/about') && 'text-blue-600'}`}>
              About
            </Link>
            <Link to="/blog" className={`text-gray-600 hover:text-gray-900 ${isActive('/blog') && 'text-blue-600'}`}>
              Blog
            </Link>
            <Link to="/features" className={`text-gray-600 hover:text-gray-900 ${isActive('/features') && 'text-blue-600'}`}>
              Features
            </Link>
            <Link to="/contact" className={`text-gray-600 hover:text-gray-900 ${isActive('/contact') && 'text-blue-600'}`}>
              Contact
            </Link>
            <Link to="/pages" className={`text-gray-600 hover:text-gray-900 ${isActive('/pages') && 'text-blue-600'}`}>
              Pages
            </Link>
          </div>

          {/* Desktop Right Side Items */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-2">
                <Gravatar
                  email={user.email}
                  size={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
            <button className="text-[#3B82F6] hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="text-[#3B82F6] hover:text-blue-600 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">
                {cartItemCount}
              </span>
            </Link>
            <button className="text-[#3B82F6] hover:text-blue-600 relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col">
              <Link to="/" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`text-gray-600 hover:bg-gray-50 py-3 text-center font-medium ${
                  isActive('/shop') && 'text-blue-600 bg-blue-50'
                }`}
              >
                Shop
              </Link>
              <Link to="/about" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                About
              </Link>
              <Link to="/blog" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Blog
              </Link>
              <Link to="/features" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Features
              </Link>
              <Link to="/contact" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Contact
              </Link>
              <Link to="/pages" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Pages
              </Link>
              <div className="border-t border-gray-200">
                {user ? (
                  <div className="flex items-center justify-center space-x-2 py-3">
                    <Gravatar
                      email={user.email}
                      size={24}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.name || user.email}
                    </span>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-[#3B82F6] hover:bg-blue-50 py-3 text-center font-medium block"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default withRouter(Navbar) 