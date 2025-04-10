import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  Sun,
  ShoppingBag,
  Users,
  Tractor,
  Sprout,
  Award,
  Phone,
  Wheat,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartProducts } from "../redux/slices/Cart/GetCart";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getCartProducts());
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product/get-all-product`
        );
        // Pick the first 8 products from the response
        setProducts(response.data.data.products.slice(0, 8));
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);
  return (
    <div className="flex flex-col">
      <div
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Agrimitra</h1>
            <p className="text-xl mb-8">
              Your trusted partner in agricultural success. Get expert advice,
              quality products, and real-time weather updates for better
              farming.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/shop"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/weather"
                className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg flex items-center space-x-2"
              >
                <span>Check Weather</span>
                <Sun className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p>Products Available</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p>Expert Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Agricultural Products</h3>
              <p className="text-gray-600">
                Quality seeds, tools, and farming equipment for your needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Sun className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Weather Updates</h3>
              <p className="text-gray-600">
                Real-time weather information to plan your farming activities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Farmer Community</h3>
              <p className="text-gray-600">
                Connect with fellow farmers and share experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI-Powered Tools for Farmers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Assistant Section */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Sprout className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Assistant Chatbot</h3>
              <p className="text-gray-600">
                Get personalized advice and support from our AI-powered chatbot,
                designed to assist farmers with their queries and provide
                real-time solutions.
              </p>
              <Link
                to="/chat"
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat Now
              </Link>
            </div>

            {/* ML Models Section */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Wheat className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">7 ML Models</h3>
              <p className="text-gray-600">
                Explore our machine learning models for fertilizer prediction,
                crop yield estimation, disease detection, and more.
              </p>
              <Link
                to="/ml-models"
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Models
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Featured Products</h2>
          <p className="text-center text-gray-600 mb-8">
            For Exploring our wide range of products, click{" "}
            <Link to="/shop" className="text-green-600 font-bold">
              here
            </Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.images[0]} // Use the first image from the product
                  alt={product.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{product.category}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">
                      ₹{product.price} / {product.size} {product.unitOfSize}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Agrimitra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Tractor className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Modern Equipment</h3>
              <p className="text-gray-600">
                Access to the latest farming technology and equipment
              </p>
            </div>
            <div className="text-center">
              <Sprout className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600">
                Promoting eco-friendly and sustainable farming methods
              </p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products meet strict quality standards
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful farmers who trust Agrimitra
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
