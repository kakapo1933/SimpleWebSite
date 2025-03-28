import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * HomePage component serves as the main landing page for the SimpleWebSite application.
 * It provides an overview of the application's features and navigation to other sections.
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-w-md w-full h-full bg-gray-50 overflow-auto">
      {/* Hero Section */}
      <div className="bg-red-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">SimpleWebSite</h1>
        <p className="text-xl">Your one-stop platform for donations and beverages</p>
      </div>

      {/* Features Section */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Features</h2>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Donations Feature */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Donations</h3>
            <p className="text-gray-700 mb-4">
              Browse and donate to various organizations. Search by name and explore with infinite scrolling.
            </p>
            <Link 
              to="/donations" 
              className="block w-full bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700 transition-colors"
            >
              {t('donationPage')}
            </Link>
          </div>

          {/* Beverages Feature */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Beverages</h3>
            <p className="text-gray-700 mb-4">
              Order your favorite drinks with customization options. Create group orders and manage your cart.
            </p>
            <Link 
              to="/beverages" 
              className="block w-full bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700 transition-colors"
            >
              Beverages
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">About SimpleWebSite</h2>
        <p className="text-gray-700 mb-4">
          SimpleWebSite is a full-stack web application that serves as a donation platform and beverage ordering system.
          Built with React, TypeScript, Node.js, and PostgreSQL, it provides a seamless user experience with a mobile-first design.
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-200 p-4 text-center text-gray-600">
        <p>© 2025 SimpleWebSite. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;