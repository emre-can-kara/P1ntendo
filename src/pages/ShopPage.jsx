import { useState, useEffect, useCallback } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ChevronRight, Grid, List } from 'lucide-react'
import BrandLogos from '../components/BrandLogos'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/actions/shoppingCartActions'
import { fetchCategories, fetchProducts } from '../store/actions/productActions'
import { FETCH_STATES } from '../store/reducers/productReducer'
import ReactPaginate from 'react-paginate'
import ProductGrid from '../components/ProductGrid'

// Update fallback image
const fallbackImage = 'https://placehold.co/400x400';

function ShopPage({ match }) {
  // 1. All useState hooks
  const [viewType, setViewType] = useState('grid');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(25);

  // 2. All other hooks
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { categories = [], fetchState, error, productList = [], total = 0 } = useSelector(state => state.product);
  const { categoryId } = match.params;

  // 3. All useEffect hooks
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter.length >= 3 || filter === '') {
        setDebouncedFilter(filter.trim());
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageOffset = parseInt(searchParams.get('offset')) || 0;
    const currentPage = Math.floor(pageOffset / itemsPerPage);
    setCurrentPage(currentPage);
  }, [location.search, itemsPerPage]);

  // Add these useEffects for product fetching
  useEffect(() => {
    // Initial products fetch with first page
    const params = new URLSearchParams();
    params.append('limit', itemsPerPage);
    params.append('offset', 0);
    dispatch(fetchProducts(params.toString()));
  }, []); // Empty dependency array for initial load

  // Add this effect to handle category changes
  useEffect(() => {
    if (categoryId) {
      // Reset page and filters when category changes
      setCurrentPage(0);
      
      const params = new URLSearchParams();
      params.append('category', categoryId);
      params.append('limit', itemsPerPage);
      params.append('offset', 0);
      
      // Keep existing sort and filter if any
      if (sort) params.append('sort', sort);
      if (debouncedFilter) params.append('filter', debouncedFilter);

      dispatch(fetchProducts(params.toString()));
    }
  }, [categoryId]); // Only depend on categoryId changes

  // Update the existing filter/sort effect to include dispatch in dependencies
  useEffect(() => {
    if (debouncedFilter || sort) {
      const params = new URLSearchParams();
      if (categoryId) params.append('category', categoryId);
      if (debouncedFilter) params.append('filter', debouncedFilter);
      if (sort) params.append('sort', sort);
      params.append('limit', itemsPerPage);
      params.append('offset', currentPage * itemsPerPage);

      dispatch(fetchProducts(params.toString()));
    }
  }, [debouncedFilter, sort, categoryId, currentPage, itemsPerPage, dispatch]);

  // Handle page changes
  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected;
    const newOffset = newPage * itemsPerPage;
    setCurrentPage(newPage);
    
    // Create params for the new page
    const params = new URLSearchParams();
    if (categoryId) params.append('category', categoryId);
    if (debouncedFilter) params.append('filter', debouncedFilter);
    if (sort) params.append('sort', sort);
    
    // Add pagination parameters
    params.append('limit', itemsPerPage);
    params.append('offset', newOffset); // Use calculated offset

    // Update URL to reflect pagination
    const newUrl = `${location.pathname}?${params.toString()}`;
    history.push(newUrl);

    // Fetch products with new offset
    dispatch(fetchProducts(params.toString()));
    window.scrollTo(0, 0);
  };

  // Add pageCount calculation
  const pageCount = productList.length > 0 ? Math.ceil(total / itemsPerPage) : 0;

  // 4. All other functions and calculations
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    history.push(`/product/${product.id}`, { productData: product });
  };

  // Get top 5 categories
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // 5. Render
  return (
    <div>
      {/* Top Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topCategories.map(category => (
            <Link 
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.code}/${category.id}`}
              className="relative overflow-hidden rounded-lg bg-gray-100 group cursor-pointer"
            >
              <img 
                src={category.img}
                alt={category.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                <h3 className="text-lg font-bold">
                  {category.gender === 'k' ? 'Kadın' : 'Erkek'} {category.title}
                </h3>
                <p>Rating: {category.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {fetchState === FETCH_STATES.FETCHING && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {fetchState === FETCH_STATES.FAILED && (
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
      )}

      {/* Products Section */}
      {fetchState === FETCH_STATES.FETCHED && (
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

          <ProductGrid 
            products={productList}
            viewType={viewType}
            onProductClick={handleProductClick}
          />

          {/* Pagination */}
          {productList.length > 0 && pageCount > 1 && (
            <div className="flex justify-center mt-12">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName="flex items-center space-x-2"
                pageClassName="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                activeClassName="!bg-blue-500 !text-white !border-blue-500"
                previousClassName="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                nextClassName="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                forcePage={currentPage}
              />
            </div>
          )}
        </div>
      )}

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