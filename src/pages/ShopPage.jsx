import { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ChevronRight, Grid, List } from 'lucide-react'
import BrandLogos from '../components/BrandLogos'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/actions/shoppingCartActions'
import { fetchCategories, fetchProducts } from '../store/actions/productActions'
import { FETCH_STATES } from '../store/reducers/productReducer'

// Update fallback image
const fallbackImage = 'https://placehold.co/400x400';

function ShopPage({ match }) {
  const [viewType, setViewType] = useState('grid')
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  const [debouncedFilter, setDebouncedFilter] = useState('')
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const productsPerPage = 8
  
  const { 
    categories = [], 
    fetchState, 
    error,
    productList = [],
    total = 0 
  } = useSelector(state => state.product);
  
  const { categoryId } = match.params;

  // Simple filter change handler
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Just store the value as-is
  };

  // Debounce filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter.length >= 3 || filter === '') {
        setDebouncedFilter(filter.trim()); // Just trim whitespace
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  // Fetch products with current filters
  const fetchFilteredProducts = useCallback(() => {
    const params = new URLSearchParams();
    
    if (categoryId) params.append('category', categoryId);
    if (debouncedFilter) {
      params.append('filter', debouncedFilter); // Send original text
    }
    if (sort) params.append('sort', sort);

    console.log('Fetching products with params:', params.toString());
    dispatch(fetchProducts(params.toString()));
  }, [categoryId, debouncedFilter, sort, dispatch]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Watch for debounced filter and sort changes
  useEffect(() => {
    if (debouncedFilter || sort) {
      fetchFilteredProducts();
    }
  }, [debouncedFilter, sort, fetchFilteredProducts]);

  // Initial load and category change
  useEffect(() => {
    dispatch(fetchCategories());
    
    // When category changes, keep filter and sort
    if (categoryId) {
      fetchFilteredProducts();
    } else {
      // If no category, but we have filter or sort
      if (filter || sort) {
        fetchFilteredProducts();
      } else {
        // No parameters at all
        dispatch(fetchProducts());
      }
    }
  }, [categoryId]);

  // Get top 5 categories by rating
  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  // Pagination with safety checks
  const safeProductList = productList || [];
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = safeProductList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(safeProductList.length / productsPerPage);

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    history.push(`/product/${product.id}`, { productData: product });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, 1))
  }

  const handleCategoryClick = (category) => {
    // Determine gender from category gender_id (assuming 1 for women, 2 for men)
    const gender = category.gender_id === 1 ? 'kadin' : 'erkek';
    
    // Convert category name to URL friendly format
    const categorySlug = category.name
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c');

    // Navigate to the category page
    history.push(`/shop/${gender}/${categorySlug}/${category.id}`);
  };

  // Helper function to get product image URL
  const getProductImageUrl = (product) => {
    if (!product) return fallbackImage;
    // API returns images array with url property
    if (product.images && product.images.length > 0) {
      return product.images[0].url; // Access the url property
    }
    return fallbackImage;
  };

  // Helper function to get category image URL
  const getCategoryImageUrl = (category) => {
    if (!category) return fallbackImage;
    // API returns img field directly
    return category.img || fallbackImage;
  };

  // Group categories by gender
  const categoriesByGender = categories.reduce((acc, category) => {
    const gender = category.gender === 'k' ? 'kadin' : 'erkek';
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, { kadin: [], erkek: [] });

  // Show loading spinner while fetching
  if (fetchState === FETCH_STATES.FETCHING) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state with retry button
  if (fetchState === FETCH_STATES.FAILED) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            Error loading categories: {error || 'Unknown error'}
          </div>
          <button
            onClick={() => dispatch(fetchCategories())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Dropdown */}
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

          {/* Categories Dropdown */}
          <div className="relative group mt-4">
            <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <span>Categories</span>
              <ChevronRight className="h-4 w-4 transform group-hover:rotate-90 transition-transform" />
            </button>
            
            <div className="absolute left-0 mt-2 w-[400px] bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="grid grid-cols-2 gap-16 p-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topCategories.map(category => (
            <Link 
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.code}/${category.id}`}
              className="relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={category.img}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                    e.target.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`${
                          i < Math.floor(category.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm">
                      ({category.rating?.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500">
            Showing {productList.length} of {total} products
            {categoryId && categories.find(c => c.id === parseInt(categoryId)) && 
              ` in ${categories.find(c => c.id === parseInt(categoryId)).title}`
            }
          </p>
          
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

            {/* Filter input with updated placeholder */}
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search products (case and Turkish character insensitive)..."
              className="border rounded-md px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
            />

            {/* Sort select - immediate sorting */}
            <select 
              value={sort}
              onChange={handleSortChange}
              className="border rounded-md px-4 py-2 text-gray-500 focus:outline-none"
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewType === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {productList.map(product => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative mb-4">
                <img 
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-lg"
                  onError={(e) => {
                    console.log('Image load error for product:', product.id);
                    e.target.src = fallbackImage;
                    e.target.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-blue-500 font-bold">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no products */}
        {!productList.length && (
          <div className="text-center py-12 text-gray-500">
            No products found in this category
          </div>
        )}

        {/* Pagination */}
        {safeProductList.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                First
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === i + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Last
              </button>
            </div>
          </div>
        )}
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