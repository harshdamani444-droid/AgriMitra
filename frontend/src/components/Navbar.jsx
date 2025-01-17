import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  ShoppingCart,
  Sun,
  Newspaper,
  UserCircle,
  Menu,
  X,
  House,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <span className="text-xl font-bold">Agrimitra</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:text-green-200 flex items-center space-x-1"
            >
              <House className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/shop"
              className="hover:text-green-200 flex items-center space-x-1"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Shop</span>
            </Link>
            <Link
              to="/weather"
              className="hover:text-green-200 flex items-center space-x-1"
            >
              <Sun className="h-5 w-5" />
              <span>Weather</span>
            </Link>
            <Link
              to="/news"
              className="hover:text-green-200 flex items-center space-x-1"
            >
              <Newspaper className="h-5 w-5" />
              <span>News</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-green-200">
              <UserCircle className="h-6 w-6" />
            </Link>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Shop</span>
                </div>
              </Link>
              <Link
                to="/weather"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <span>Weather</span>
                </div>
              </Link>
              <Link
                to="/news"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Newspaper className="h-5 w-5" />
                  <span>News</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
