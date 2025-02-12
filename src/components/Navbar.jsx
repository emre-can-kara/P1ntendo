import { useState } from 'react'

function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold text-gray-800">BrandName</span>
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
            <div className="relative">
              <button 
                onClick={() => setIsShopOpen(!isShopOpen)}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                Shop
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isShopOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 2</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 3</a>
                  </div>
                </div>
              )}
            </div>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#blog" className="text-gray-600 hover:text-gray-900">Blog</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <a href="#pages" className="text-gray-600 hover:text-gray-900">Pages</a>
          </div>

          {/* Desktop Right Side Items */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/login" className="text-[#3B82F6] hover:text-blue-600">
              Login / Register
            </a>
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs px-2">1</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col">
              <a href="#home" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Home
              </a>
              <a href="#shop" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Shop
              </a>
              <a href="#about" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                About
              </a>
              <a href="#blog" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Blog
              </a>
              <a href="#contact" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Contact
              </a>
              <a href="#pages" className="text-gray-600 hover:bg-gray-50 py-3 text-center font-medium">
                Pages
              </a>
              <div className="border-t border-gray-200">
                <a href="/login" className="text-[#3B82F6] hover:bg-blue-50 py-3 text-center font-medium block">
                  Login / Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 