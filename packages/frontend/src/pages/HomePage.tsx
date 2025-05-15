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
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="bg-slate-600 text-white p-6 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">SimpleWebSite</h1>
          <p className="text-xl">Your one-stop platform for donations and beverages</p>
        </div>
      </div>

      {/* Features Section */}
      <main className="flex-grow pb-14">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">Our Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Donations Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-400">Donations</h3>
              <p className="text-slate-950 mb-4">
                Browse and donate to various organizations. Search by name and explore with infinite
                scrolling.
              </p>
              <Link
                to="/donations"
                className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
              >
                {t('donationPage')}
              </Link>
            </div>

            {/* Beverages Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-400">Beverages</h3>
              <p className="text-slate-950 mb-4">
                Order your favorite drinks with customization options. Create group orders and
                manage your cart.
              </p>
              <Link
                to="/beverages"
                className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
              >
                Beverages
              </Link>
            </div>

            {/* Todo Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-teal-400">Todo List</h3>
              <p className="text-slate-950 mb-4">
                Manage your tasks with our simple todo list. Create, update, and track your todos.
              </p>
              <Link
                to="/todos"
                className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
              >
                View All Todos
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <div className="bg-slate-200 p-6">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-center">
            About SimpleWebSite
          </h2>
          <p className="text-slate-950 mb-4 max-w-3xl mx-auto">
            SimpleWebSite is a full-stack web application that serves as a donation platform and
            beverage ordering system. Built with React, TypeScript, Node.js, and PostgreSQL, it
            provides a seamless user experience with a responsive design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
