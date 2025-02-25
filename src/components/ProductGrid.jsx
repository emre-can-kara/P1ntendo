import React from 'react';

const fallbackImage = 'https://placehold.co/400x400';

function ProductGrid({ products, viewType, onProductClick }) {
  console.log('Product in Grid:', products[0]);

  const getFirstImageUrl = (product) => {
    console.log('Product images:', product.images);
    
    if (!product.images || product.images.length === 0) {
      return fallbackImage;
    }
    if (typeof product.images[0] === 'string') {
      return product.images[0];
    }
    return product.images[0]?.url || fallbackImage;
  };

  if (!products.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className={`grid gap-8 ${
      viewType === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {products.map(product => (
        <div 
          key={product.id} 
          className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-white"
          onClick={() => onProductClick(product)}
        >
          <div className="relative mb-4 overflow-hidden rounded-t-lg">
            <img 
              src={getFirstImageUrl(product)}
              alt={product.name}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src = fallbackImage;
                e.target.onerror = null;
              }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            {/* Stock Badge */}
            <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-white shadow-md">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>
          
          <div className="text-center p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Rating Stars */}
            <div className="flex justify-center items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-500">({product.rating?.toFixed(1)})</span>
            </div>

            <p className="text-blue-500 font-bold text-lg">
              ${Number(product.price).toFixed(2)}
            </p>

            {/* Short Description */}
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(ProductGrid); 