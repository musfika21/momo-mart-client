'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Search, Filter, Grid, List } from 'lucide-react'


export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      // Fallback data if backend is not available
      setProducts([
        {
          _id: 1,
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop"
        },
        {
          _id: 2,
          name: "Smart Fitness Watch",
          description: "Track your fitness goals with this advanced smartwatch",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop"
        },
        {
          _id: 3,
          name: "Wireless Charging Pad",
          description: "Fast wireless charging for all compatible devices",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1609592606823-b8176ad0c631?w=500&h=300&fit=crop"
        },
        {
          _id: 4,
          name: "Bluetooth Speaker",
          description: "Portable speaker with amazing sound quality",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=300&fit=crop"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover our complete collection of premium products
          </p>
        </div>

        {/* Filters and search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View mode toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } transition-colors`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } transition-colors`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Products grid/list */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or browse all products.
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product, index) => (
              <div key={index} className={viewMode === 'list' ? 'w-full' : ''}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Load more button (placeholder for pagination) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}