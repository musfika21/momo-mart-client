'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Plus, Link2, ArrowLeft, X, AlertCircle, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AddProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState([])
  const [imageInput, setImageInput] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    fullDescription: '',
    category: '',
    brand: '',
    stockQuantity: '',
    sku: '',
    tags: [],
    features: [],
  })

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Health & Beauty',
    'Automotive',
    'Food & Beverages',
    'Office Supplies',
  ]

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
      toast.error('Please log in to add a product')
    }
  }, [status, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addImageUrl = (e) => {
    if (e.key === 'Enter' && imageInput.trim()) {
      e.preventDefault()
      // const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))/i
      // if (!urlPattern.test(imageInput.trim())) {
      //   toast.error('Please enter a valid image URL (jpg, png, webp, or gif)')
      //   return
      // }
      if (imageUrls.length >= 5) {
        toast.error('Maximum 5 images allowed')
        return
      }
      if (!imageUrls.includes(imageInput.trim())) {
        setImageUrls((prev) => [...prev, imageInput.trim()])
        setImageInput('')
        toast.success('Image URL added')
      } else {
        toast.error('This image URL is already added')
      }
    }
  }

  const removeImageUrl = (url) => {
    setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url))
    toast.success('Image URL removed')
  }

  const addTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const tag = tagInput.trim().toLowerCase()
      if (tag && !formData.tags.includes(tag)) {
        if (formData.tags.length >= 10) {
          toast.error('Maximum 10 tags allowed')
          return
        }
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag],
        }))
        setTagInput('')
        toast.success('Tag added')
      } else if (!tag) {
        toast.error('Please enter a valid tag')
      } else {
        toast.error('This tag is already added')
      }
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
    toast.success('Tag removed')
  }

  const addFeature = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const feature = featureInput.trim()
      if (feature && !formData.features.includes(feature)) {
        if (formData.features.length >= 10) {
          toast.error('Maximum 10 features allowed')
          return
        }
        setFormData((prev) => ({
          ...prev,
          features: [...prev.features, feature],
        }))
        setFeatureInput('')
        toast.success('Feature added')
      } else if (!feature) {
        toast.error('Please enter a valid feature')
      } else {
        toast.error('This feature is already added')
      }
    }
  }

  const removeFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }))
    toast.success('Feature removed')
  }

  const generateSKU = () => {
    const randomSKU = `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setFormData((prev) => ({
      ...prev,
      sku: randomSKU,
    }))
    toast.success('SKU generated')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields (Name, Description, Price)')
      return
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price')
      return
    }

    if (formData.stockQuantity && (isNaN(parseInt(formData.stockQuantity)) || parseInt(formData.stockQuantity) < 0)) {
      toast.error('Please enter a valid stock quantity')
      return
    }

    if (imageUrls.length === 0) {
      toast.error('Please add at least one image URL')
      return
    }

    setLoading(true)

    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        fullDescription: formData.fullDescription || formData.description,
        category: formData.category,
        brand: formData.brand,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        sku: formData.sku || `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        tags: formData.tags,
        features: formData.features,
        images: imageUrls,
      }

      console.log('Submitting:', submitData) // Debugging

      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (!res.ok) {
        throw new Error('Failed to create product')
      }

      const newProduct = await res.json()
      toast.success('Product created successfully!')

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        fullDescription: '',
        category: '',
        brand: '',
        stockQuantity: '',
        sku: '',
        tags: [],
        features: [],
      })
      setImageUrls([])
      setTagInput('')
      setFeatureInput('')

      setTimeout(() => {
        router.push(`/products/${newProduct._id}`)
      }, 2000)
    } catch (error) {
      toast.error('Failed to create product. Please try again.')
      console.error('Submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      fullDescription: '',
      category: '',
      brand: '',
      stockQuantity: '',
      sku: '',
      tags: [],
      features: [],
    })
    setImageUrls([])
    setTagInput('')
    setFeatureInput('')
    toast.success('Form reset')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/products')}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Add New Product
          </h1>
          <p className="text-lg text-gray-300">
            Create a new product listing for your store
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg pl-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-300 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Available quantity"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-300 mb-2">
                    SKU (Stock Keeping Unit)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter SKU or generate one"
                    />
                    <button
                      type="button"
                      onClick={generateSKU}
                      className="px-4 py-3 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                Product Details
              </h2>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  maxLength={160}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Brief description for product card (max 160 characters)"
                />
                <p className="text-sm text-gray-400 mt-1">
                  {formData.description.length}/160 characters
                </p>
              </div>

              <div>
                <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Provide detailed information about the product, features, specifications, etc."
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                Features & Tags
              </h2>

              <div>
                <label htmlFor="featureInput" className="block text-sm font-medium text-gray-300 mb-2">
                  Product Features
                </label>
                <input
                  type="text"
                  id="featureInput"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={addFeature}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a feature and press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-900 text-green-200"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-2 text-green-400 hover:text-green-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="tagInput" className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add tags separated by commas or press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900 text-blue-200"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-400 hover:text-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                Product Images
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="imageInput" className="block text-sm font-medium text-gray-300 mb-2">
                    Add Image URL
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Link2 className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      id="imageInput"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyDown={addImageUrl}
                      className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Paste image URL and press Enter (e.g., https://example.com/image.jpg)"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Maximum 5 images. Supported formats: JPG, PNG, WebP, GIF
                  </p>
                </div>

                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={url} className="relative group">
                        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={() => {
                              toast.error(`Failed to load image: ${url}`)
                              removeImageUrl(url)
                            }}
                          />
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImageUrl(url)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Create Product</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Reset Form
              </button>

              <button
                type="button"
                onClick={() => router.push('/products')}
                disabled={loading}
                className="px-6 py-3 text-gray-400 hover:text-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-200">
                  <p className="font-medium mb-1">Required fields:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Product Name</li>
                    <li>Short Description</li>
                    <li>Price</li>
                    <li>At least one Image URL</li>
                  </ul>
                  <p className="mt-2">
                    All other fields are optional but recommended for better product visibility.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}