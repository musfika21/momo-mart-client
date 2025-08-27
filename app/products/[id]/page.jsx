'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShoppingCart, Heart, Share2, ArrowLeft, Star, Shield, Truck, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'


export default function ProductDetailPage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = params?.id

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id])

  const fetchProduct = async (productId) => {
    try {
      const res = await fetch(`https://momos-care-server.vercel.app/api/products/${productId}`)
      if (!res.ok) {
        throw new Error('Product not found')
      }
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      // Fallback data if backend is not available
      const fallbackProducts = [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
          fullDescription: "Experience premium sound quality with our advanced wireless headphones featuring active noise cancellation, 30-hour battery life, and premium materials. Perfect for music lovers and professionals alike."
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          description: "Track your fitness goals with this advanced smartwatch",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
          fullDescription: "Stay connected and track your health with our advanced fitness watch. Features include heart rate monitoring, GPS tracking, water resistance, and 7-day battery life."
        },
        {
          id: 3,
          name: "Wireless Charging Pad",
          description: "Fast wireless charging for all compatible devices",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1609592606823-b8176ad0c631?w=800&h=600&fit=crop",
          fullDescription: "Charge your devices effortlessly with our fast wireless charging pad. Compatible with all Qi-enabled devices, featuring LED indicators and over-heat protection."
        },
        {
          id: 4,
          name: "Bluetooth Speaker",
          description: "Portable speaker with amazing sound quality",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop",
          fullDescription: "Take your music anywhere with our portable Bluetooth speaker. Features 360-degree sound, waterproof design, and 12-hour battery life."
        }
      ]

      const foundProduct = fallbackProducts.find(p => p.id === parseInt(productId))
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        router.push('/products')
        toast.error('Product not found')
        return
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product?.name} to cart!`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Product link copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-8">
          <button
            onClick={() => router.push('/products')}
            className="flex items-center hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Image thumbnails (placeholder) */}
            <div className="flex space-x-4 mt-4">
              {product.images.map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <img
                    src={i}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-300 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">(4.9)</span>
                <span className="text-gray-600 dark:text-gray-300">•</span>
                <span className="text-gray-600 dark:text-gray-300">127 reviews</span>
              </div>

              <div className="text-3xl font-bold text-primary-300 mb-6">
                ${product.price}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Quantity selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-4 px-6 rounded-xl hover:bg-primary-700 transition-colors font-medium text-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-2 rounded-xl transition-colors ${isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500'
                    }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-primary-600 hover:text-primary-600 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">2 Year Warranty</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Full coverage</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Free Shipping</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Orders over $50</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">30-Day Returns</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Hassle-free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}