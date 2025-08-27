// components/Footer.tsx
import Link from 'next/link'
import { ShoppingBag, Twitter, Facebook, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-700 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-200" />
              <span className="font-bold text-2xl">MomosMart</span>
            </div>
            <p className="text-primary-100 mb-6 max-w-md">
              Your trusted destination for premium products. We curate the best items 
              to enhance your lifestyle with quality and innovation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/login" 
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-200" />
                <span className="text-primary-100">support@productstore.com</span>
              </li>
              <li className="text-primary-100">
                123 Commerce Street
              </li>
              <li className="text-primary-100">
                City, State 12345
              </li>
              <li className="text-primary-100">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-100 text-sm mb-4 md:mb-0">
            © 2024 ProductStore. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-primary-100 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-primary-100 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-primary-100 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}