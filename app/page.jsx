// app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Sparkles } from 'lucide-react'

async function getFeaturedProducts() {
  try {
    const res = await fetch('https://momos-care-server.vercel.app/api/products', {
      cache: 'no-store'
    })
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    const products = await res.json()
    return products.slice(0, 3)
  } catch (error) {
    // Fallback data if backend is not available
    return [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for all compatible devices",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1609592606823-b8176ad0c631?w=500&h=300&fit=crop"
      }
    ]
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main>
      <Navbar />
      <Hero />

      {/* Product Highlights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Featured Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Our Best Products
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Handpicked products that deliver exceptional quality and value.
              These are some of our most popular items that customers love.
            </p>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts && featuredProducts?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>

          {/* CTA to view all products */}
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
            >
              View All Products
              <Sparkles className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get notified about new products, exclusive offers, and special discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}