'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ShoppingBag, User, Moon, Sun, LogOut, Plus } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { data: session, status } = useSession()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-primary-700 dark:text-primary-200">
                ProductStore
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Products
            </Link>
            
            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard/add-product"
                  className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <img
                    src={session.user?.image || '/default-avatar.png'}
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {session.user?.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass backdrop-blur-md border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            
            {status === 'authenticated' ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard/add-product"
                  className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </Link>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={session.user?.image || '/default-avatar.png'}
                      alt="User"
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-1 text-gray-500 hover:text-primary-600"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}