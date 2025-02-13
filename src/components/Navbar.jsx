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

function Navbar({ location }) {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-semibold text-gray-800">BrandName</span>
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
            
            <div className="relative">
              <button 
                onClick={() => setIsShopOpen(!isShopOpen)}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Shop</span>
              </button>
              
              {isShopOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/category-1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 1</Link>
                    <Link to="/category-2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 2</Link>
                    <Link to="/category-3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 3</Link>
                  </div>
                </div>
              )}
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
            <Link to="/login" className="text-[#3B82F6] hover:text-blue-600">
              Login / Register
            </Link>
            <button className="text-[#3B82F6] hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-[#3B82F6] hover:text-blue-600 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
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
              <Link to="/shop" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
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
                <Link to="/login" className="text-[#3B82F6] hover:bg-blue-50 py-3 text-center font-medium block">
                  Login / Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default withRouter(Navbar) 