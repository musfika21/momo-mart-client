'use client'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product, featured = false }) {
  const [isLoaded, setIsLoaded] = useState(false)
   console.log(product);
   
  // If product is undefined or null, render a fallback UI
  if (!product) {
    return (
      <div className={`group relative ${featured ? 'md:col-span-2' : ''} bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 text-center`}>
        <p className="text-gray-600 dark:text-gray-300">Product data not available</p>
      </div>
    )
  }

  return (
    <div className={`group relative ${featured ? 'md:col-span-2' : ''} bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
      {/* Image container */}
      <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-48'}`}>
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=compress&cs=tinysrgb&w=500&h=300'}
          alt={product.name || 'Product Image'}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <Link
              href={`/products/${product._id}`}
              className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <button className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${product.price || 'N/A'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          {product.name || 'Unnamed Product'}
        </h3>
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price || 'N/A'}
            </span>
          </div>

          <Link
            href={`/products/${product._id}`}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}