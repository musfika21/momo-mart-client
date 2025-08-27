'use client'
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary-300 dark:bg-primary-700 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-400 dark:bg-primary-600 rounded-full opacity-15 animate-ping"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            New Products Available
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Amazing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              Products
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10">
            Find the perfect products for your needs. From tech gadgets to lifestyle essentials, 
            we have everything you need at unbeatable prices.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/products"
              className="group inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              Join Now
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 glass rounded-xl backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure Shopping
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Your data and payments are protected with industry-leading security
              </p>
            </div>

            <div className="flex flex-col items-center p-6 glass rounded-xl backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Get your products delivered quickly with our express shipping options
              </p>
            </div>

            <div className="flex flex-col items-center p-6 glass rounded-xl backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Every product is carefully curated to ensure the highest quality standards
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}