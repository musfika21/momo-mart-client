# MomosMart - Live Demo

## https://momo-mart-client.vercel.app

Overview
MomosMart is a lightweight e-commerce platform built with Next.js, designed to provide a seamless user registration experience and showcase products like wireless headphones. The project features a responsive registration form with multi-step validation, Google sign-in integration, and a product card component for displaying item details with dynamic images and hover effects.
Features

User Registration: Multi-step form with fields for personal information (name, email, phone, address) and password setup, including real-time password strength validation.
Google Sign-In: Seamless authentication using NextAuth.js for quick user onboarding.
Product Display: Responsive product cards with image loading, hover effects, and details like price, name, and description.
Responsive Design: Tailwind CSS ensures a mobile-friendly and visually appealing interface.
Error Handling: Toast notifications for user feedback on form validation and API errors.

Tech Stack

Frontend: Next.js (React), Tailwind CSS, Lucide React (icons)
Authentication: NextAuth.js (Google provider)
State Management: React useState for form and component state
API: Fetch API for backend communication (assumes a backend at https://momo-mart-server.verce.app)

Project Structure
momosmart/
├── app/
│ ├── register/
│ │ └── page.jsx # Registration page with multi-step form
├── components/
│ └── ProductCard.jsx # Product card component for displaying items
├── public/
│ └── images/ # Static images (if any)
├── .env.local # Environment variables
├── next.config.js # Next.js configuration
├── package.json # Dependencies and scripts
└── README.md # Project documentation

Usage

Registration: Navigate to /register to create an account. Fill in personal details in Step 1, then set a password and agree to terms in Step 2. Use Google sign-in for faster registration.
Product Viewing: Product cards display item details (e.g., name, price, description) with a hover effect showing "View Details" and "Add to Cart" options.
Backend: Assumes a backend API at https://momo-mart-server.verce.app/api/auth/register for registration. Update the URL in page.jsx to match your backend.

Example Product

Name: Realme 9X Pro
Description: High-quality wireless headphones with noise cancellation
Price: $5
Full Description: Parbona, bolbona. google search kore dkehe naw...
Category: Home & Garden
Stock Quantity: 50
SKU: SKU-75SVQQZY0
Image: Unsplash Link
