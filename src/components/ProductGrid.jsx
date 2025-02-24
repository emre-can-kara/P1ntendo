import React from 'react';

const fallbackImage = 'https://placehold.co/400x400';

function ProductGrid({ products, viewType, onProductClick }) {
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
          className="group cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <div className="relative mb-4">
            <img 
              src={product.images[0].url}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
              onError={(e) => {
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
  );
}

export default React.memo(ProductGrid); 