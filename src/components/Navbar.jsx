import { useState, useRef, useEffect } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  Home, 
  ShoppingBag, 
  Search, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react'
import { useSelector } from 'react-redux'
import Gravatar from 'react-gravatar'
import { handleSignOut } from '../store/actions/clientActions'
import { fetchCategories } from '../store/actions/productActions'
import { FETCH_STATES } from '../store/reducers/productReducer'
import CartDropdown from './CartDropdown'

function Navbar({ location }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.client.user)
  const cart = useSelector(state => state.shoppingCart.cart)
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0)
  const { categories = [], fetchState } = useSelector(state => state.product)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartDropdownRef = useRef(null)

  // Debug log
  console.log('Current user:', user);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debug logs
  console.log('Categories in Navbar:', categories);
  console.log('Fetch state:', fetchState);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOutClick = () => {
    dispatch(handleSignOut());
    history.push('/');
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path

  // Group categories by gender
  const categoriesByGender = categories.reduce((acc, category) => {
    const gender = category.gender === 'k' ? 'kadin' : 'erkek';
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, { kadin: [], erkek: [] });

  // Debug log grouped categories
  console.log('Grouped categories:', categoriesByGender);

  // Create safe URL for category
  const createCategoryUrl = (category) => {
    if (!category || !category.name) return '/shop';

    const gender = category.gender_id === 1 ? 'kadin' : 'erkek';
    const categorySlug = category.code?.split(':')[1] || category.name
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9-]/g, '');

    return `/shop/${gender}/${categorySlug}/${category.id}`;
  };

  return (
    <nav className="bg-white shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-black text-gray-800">P1NTENDO</span>
            </Link>
            
            {/* Show Gravatar if user is logged in */}
            {user && user.email && (
              <div className="ml-4 flex items-center space-x-2 relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <Gravatar
                    email={user.email}
                    size={32}
                    className="rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOutClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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
            
            {/* Shop Dropdown */}
            <div className="relative group">
              <Link 
                to="/shop"
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Shop</span>
              </Link>
              
              <div className="absolute left-0 mt-2 w-[400px] bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="grid grid-cols-2 gap-16 p-6">
                  {/* Loading State */}
                  {fetchState === FETCH_STATES.FETCHING && (
                    <div className="col-span-2 text-center py-4">
                      Loading categories...
                    </div>
                  )}

                  {/* Error State */}
                  {fetchState === FETCH_STATES.FAILED && (
                    <div className="col-span-2 text-center py-4 text-red-600">
                      Failed to load categories
                    </div>
                  )}

                  {/* Categories Content */}
                  {fetchState === FETCH_STATES.FETCHED && (
                    <>
                      {/* Women's Categories */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">Kadın</h3>
                        <div className="space-y-3">
                          {categoriesByGender.kadin.map(category => (
                            <Link
                              key={category.id}
                              to={`/shop/kadin/${category.code}/${category.id}`}
                              className="block text-gray-500 hover:text-gray-900"
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Men's Categories */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">Erkek</h3>
                        <div className="space-y-3">
                          {categoriesByGender.erkek.map(category => (
                            <Link
                              key={category.id}
                              to={`/shop/erkek/${category.code}/${category.id}`}
                              className="block text-gray-500 hover:text-gray-900"
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
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
            {user ? null : (
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
            <div className="relative" ref={cartDropdownRef}>
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-[#3B82F6] hover:text-blue-600 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <CartDropdown 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
            </div>
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